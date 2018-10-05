/* global Log4js */

/**
 * Console Appender writes the logs to a console.  If "inline" is
 * set to "false" the console launches in another window otherwise
 * the window is inline on the page and toggled on and off with "Alt-D".
 * Note: At FireFox &gb; 2.0 the keystroke is little different now: "SHIFT+ALT+D".
 *
 * @constructor
 * @extends Log4js.Appender
 * @param {boolean} isInline boolean value that indicates whether the console be placed inline, default is to launch in new window
 *
 * @author Corey Johnson - original console code in Lumberjack (http://gleepglop.com/javascripts/logger/)
 * @author Seth Chisamore - adapted for use as a log4js appender
 */
Log4js.ConsoleAppender = function (isInline) {

    /**
     * @type Log4js.Layout
     * @private
     */
    this.layout = new Log4js.PatternLayout(Log4js.PatternLayout.TTCC_CONVERSION_PATTERN);
    /**
     * @type boolean
     * @private
     */
    this.inline = isInline;

    /**
     * @type String
     * @private
     */
    this.accesskey = "d";

    /**
     * @private
     */
    this.tagPattern = null;

    this.commandHistory = [];
    this.commandIndex = 0;

    /**
     * true if popup is blocked.
     */
    this.popupBlocker = false;

    /**
     * current output div-element.
     */
    this.outputElement = null;

    this.docReference = null;
    this.winReference = null;

    if (this.inline) {
        Log4js.attachEvent(window, 'load', Log4js.bind(this.initialize, this));
    }
};

Log4js.ConsoleAppender.prototype = Log4js.extend(new Log4js.Appender(), /** @lends Log4js.ConsoleAppender# */ {
    /**
     * Set the access key to show/hide the inline console (default &quote;d&quote;)
     * @param key access key to show/hide the inline console
     */
    setAccessKey: function (key) {
        this.accesskey = key;
    },
    /**
     * @private
     */
    initialize: function () {

        if (!this.inline) {

            var winName = this.makeWinName(this.logger.category);

            window.top.consoleWindow = window.open("", winName,
                    "left=0,top=0,width=700,height=700,scrollbars=no,status=no,resizable=yes;toolbar=no");
            window.top.consoleWindow.opener = self;
            var win = window.top.consoleWindow;

            if (!win) {
                this.popupBlocker = true;
                alert("Popup window manager blocking the Log4js popup window to bedisplayed.\n\n"
                        + "Please disabled this to properly see logged events.");
            } else {
                var doc = win.document;
                doc.open();
                doc.write("<!DOCTYPE html PUBLIC -//W3C//DTD XHTML 1.0 Transitional//EN ");
                doc.write("  http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd>\n\n");
                doc.write("<html><head><title>Log4js - " + this.logger.category + "</title>\n");
                doc.write("</head><body style=\"background-color:darkgray\"></body>\n");
                win.blur();
                win.focus();

                this.docReference = doc;
                this.winReference = win;
            }

        } else {
            this.docReference = document;
            this.winReference = window;
        }

        this.outputCount = 0;
        this.tagPattern = ".*";

        // I hate writing javascript in HTML... but what's a better alternative
        this.logElement = this.docReference.createElement('div');
        this.docReference.body.appendChild(this.logElement);
        this.logElement.style.display = 'none';

        this.logElement.style.position = "absolute";
        this.logElement.style.left = '0px';
        this.logElement.style.width = '100%';

        this.logElement.style.textAlign = "left";
        this.logElement.style.fontFamily = "lucida console";
        this.logElement.style.fontSize = "100%";
        this.logElement.style.backgroundColor = 'darkgray';
        this.logElement.style.opacity = 0.9;
        this.logElement.style.zIndex = 2000;

        // Add toolbarElement
        this.toolbarElement = this.docReference.createElement('div');
        this.logElement.appendChild(this.toolbarElement);
        this.toolbarElement.style.padding = "0 0 0 2px";

        // Add buttons        
        this.buttonsContainerElement = this.docReference.createElement('span');
        this.toolbarElement.appendChild(this.buttonsContainerElement);

        if (this.inline) {
            var closeButton = this.docReference.createElement('button');
            closeButton.style.cssFloat = "right";
            closeButton.style.styleFloat = "right"; // IE dom bug...doesn't understand cssFloat
            closeButton.style.color = "black";
            closeButton.innerHTML = "close";
            closeButton.onclick = Log4js.bind(this.toggle, this);
            this.buttonsContainerElement.appendChild(closeButton);
        }

        var clearButton = this.docReference.createElement('button');
        clearButton.style.cssFloat = "right";
        clearButton.style.styleFloat = "right"; // IE dom bug...doesn't understand cssFloat
        clearButton.style.color = "black";
        clearButton.innerHTML = "clear";
        clearButton.onclick = Log4js.bind(this.logger.clear, this.logger);
        this.buttonsContainerElement.appendChild(clearButton);


        //Add CategoryName and  Level Filter
        this.tagFilterContainerElement = this.docReference.createElement('span');
        this.toolbarElement.appendChild(this.tagFilterContainerElement);
        this.tagFilterContainerElement.style.cssFloat = 'left';

        this.tagFilterContainerElement.appendChild(this.docReference.createTextNode("Log4js - " + this.logger.category));
        this.tagFilterContainerElement.appendChild(this.docReference.createTextNode(" | Level Filter: "));

        this.tagFilterElement = this.docReference.createElement('input');
        this.tagFilterContainerElement.appendChild(this.tagFilterElement);
        this.tagFilterElement.style.width = '200px';
        this.tagFilterElement.value = this.tagPattern;
        this.tagFilterElement.setAttribute('autocomplete', 'off'); // So Firefox doesn't flip out

        Log4js.attachEvent(this.tagFilterElement, 'keyup', Log4js.bind(this.updateTags, this));
        Log4js.attachEvent(this.tagFilterElement, 'click', Log4js.bind(function () {
            this.tagFilterElement.select();
        }, this));

        // Add outputElement
        this.outputElement = this.docReference.createElement('div');
        this.logElement.appendChild(this.outputElement);
        this.outputElement.style.overflow = "auto";
        this.outputElement.style.clear = "both";
        this.outputElement.style.height = (this.inline) ? ("200px") : ("650px");
        this.outputElement.style.width = "100%";
        this.outputElement.style.backgroundColor = 'black';

        this.inputContainerElement = this.docReference.createElement('div');
        this.inputContainerElement.style.width = "100%";
        this.logElement.appendChild(this.inputContainerElement);

        this.inputElement = this.docReference.createElement('input');
        this.inputContainerElement.appendChild(this.inputElement);
        this.inputElement.style.width = '100%';
        this.inputElement.style.borderWidth = '0px'; // Inputs with 100% width always seem to be too large (I HATE THEM) they only work if the border, margin and padding are 0
        this.inputElement.style.margin = '0px';
        this.inputElement.style.padding = '0px';
        this.inputElement.value = 'Type command here';
        this.inputElement.setAttribute('autocomplete', 'off'); // So Firefox doesn't flip out

        Log4js.attachEvent(this.inputElement, 'keyup', Log4js.bind(this.handleInput, this));
        Log4js.attachEvent(this.inputElement, 'click', Log4js.bind(function () {
            this.inputElement.select();
        }, this));

        if (this.inline) {
            window.setInterval(Log4js.bind(this.repositionWindow, this), 500);
            this.repositionWindow();
            // Allow acess key link          
            var accessElement = this.docReference.createElement('button');
            accessElement.style.position = "absolute";
            accessElement.style.top = "-100px";
            accessElement.accessKey = this.accesskey;
            accessElement.onclick = Log4js.bind(this.toggle, this);
            this.docReference.body.appendChild(accessElement);
        } else {
            this.show();
        }
    },
    /**
     * shows/hide an element
     * @private
     * @return true if shown
     */
    toggle: function () {
        if (this.logElement.style.display === 'none') {
            this.show();
            return true;
        } else {
            this.hide();
            return false;
        }
    },
    /**
     * @private
     */
    show: function () {
        this.logElement.style.display = '';
        this.outputElement.scrollTop = this.outputElement.scrollHeight; // Scroll to bottom when toggled
        this.inputElement.select();
    },
    /**
     * @private
     */
    hide: function () {
        this.logElement.style.display = 'none';
    },
    /**
     * @private
     * @param message
     * @style
     */
    output: function (message, style) {

        // If we are at the bottom of the window, then keep scrolling with the output			
        var shouldScroll = (this.outputElement.scrollTop + (2 * this.outputElement.clientHeight)) >= this.outputElement.scrollHeight;

        this.outputCount++;
        style = (style ? style += ';' : '');
        style += 'padding:1px;margin:0 0 5px 0';

        if (this.outputCount % 2 === 0) {
            style += ";background-color:#101010";
        }

        message = message || "undefined";
        message = message.toString();

        this.outputElement.innerHTML += "<pre style='" + style + "'>" + message + "</pre>";

        if (shouldScroll) {
            this.outputElement.scrollTop = this.outputElement.scrollHeight;
        }
    },
    /**
     * @private
     */
    updateTags: function () {

        var pattern = this.tagFilterElement.value;

        if (this.tagPattern === pattern) {
            return;
        }

        try {
            new RegExp(pattern);
        } catch (e) {
            return;
        }

        this.tagPattern = pattern;

        this.outputElement.innerHTML = "";

        // Go through each log entry again
        this.outputCount = 0;
        for (var i = 0; i < this.logger.loggingEvents.length; i++) {
            this.doAppend(this.logger.loggingEvents[i]);
        }
    },
    /**
     * @private
     */
    repositionWindow: function () {
        var offset = window.pageYOffset || this.docReference.documentElement.scrollTop || this.docReference.body.scrollTop;
        var pageHeight = self.innerHeight || this.docReference.documentElement.clientHeight || this.docReference.body.clientHeight;
        this.logElement.style.top = (offset + pageHeight - this.logElement.offsetHeight) + "px";
    },
    /**
     * @param loggingEvent event to be logged
     * @see Log4js.Appender#doAppend
     */
    doAppend: function (loggingEvent) {

        if (this.popupBlocker) {
            //popup blocked, we return in this case
            return;
        }

        if ((!this.inline) && (!this.winReference || this.winReference.closed)) {
            this.initialize();
        }

        if (this.tagPattern !== null &&
                loggingEvent.level.toString().search(new RegExp(this.tagPattern, 'igm')) === -1) {
            return;
        }

        var style = '';

        if (loggingEvent.level.toString().search(/ERROR/) !== -1) {
            style += 'color:red';
        } else if (loggingEvent.level.toString().search(/FATAL/) !== -1) {
            style += 'color:red';
        } else if (loggingEvent.level.toString().search(/WARN/) !== -1) {
            style += 'color:orange';
        } else if (loggingEvent.level.toString().search(/DEBUG/) !== -1) {
            style += 'color:green';
        } else if (loggingEvent.level.toString().search(/INFO/) !== -1) {
            style += 'color:white';
        } else {
            style += 'color:yellow';
        }

        this.output(this.layout.format(loggingEvent), style);
    },
    /**
     * @see Log4js.Appender#doClear
     */
    doClear: function () {
        this.outputElement.innerHTML = "";
    },
    /**
     * @private
     * @param e
     */
    handleInput: function (e) {
        if (e.keyCode === 13) {
            var command = this.inputElement.value;

            switch (command) {
                case "clear":
                    this.logger.clear();
                    break;

                default:
                    var consoleOutput = "";

                    try {
                        consoleOutput = eval(this.inputElement.value);
                    } catch (e) {
                        this.logger.error("Problem parsing input <" + command + ">" + e.message);
                        break;
                    }

                    this.logger.trace(consoleOutput);
                    break;
            }

            if (this.inputElement.value !== "" && this.inputElement.value !== this.commandHistory[0]) {
                this.commandHistory.unshift(this.inputElement.value);
            }

            this.commandIndex = 0;
            this.inputElement.value = "";
        } else if (e.keyCode === 38 && this.commandHistory.length > 0) {
            this.inputElement.value = this.commandHistory[this.commandIndex];

            if (this.commandIndex < this.commandHistory.length - 1) {
                this.commandIndex += 1;
            }
        } else if (e.keyCode === 40 && this.commandHistory.length > 0) {
            if (this.commandIndex > 0) {
                this.commandIndex -= 1;
            }

            this.inputElement.value = this.commandHistory[this.commandIndex];
        } else {
            this.commandIndex = 0;
        }
    },
    /**
     * @private
     */
    makeWinName: function (category) {
        return category.replace(/[^\d\w]/g, "_");
    },
    /** 
     * toString
     */
    toString: function () {
        return "Log4js.ConsoleAppender[inline=" + this.inline + "]";
    }
});
