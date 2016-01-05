/* global Log4js */

/**
 * Log4js CustomEvent
 * @constructor
 * @author Corey Johnson - original code in Lumberjack (http://gleepglop.com/javascripts/logger/)
 * @author Seth Chisamore - adapted for Log4js
 * @private
 */
Log4js.CustomEvent = function () {
    this.listeners = [];
};

Log4js.CustomEvent.prototype = {
    /**
     * @param method method to be added
     */
    addListener: function (method) {
        this.listeners.push(method);
    },
    /**
     * @param method method to be removed
     */
    removeListener: function (method) {
        var foundIndexes = this.findListenerIndexes(method);

        for (var i = 0; i < foundIndexes.length; i++) {
            this.listeners.splice(foundIndexes[i], 1);
        }
    },
    /**
     * @param handler
     */
    dispatch: function (handler) {
        for (var i = 0; i < this.listeners.length; i++) {
            try {
                this.listeners[i](handler);
            } catch (e) {
                log4jsLogger && log4jsLogger.warn("Could not run the listener " + this.listeners[i] + ". \n" + e);
            }
        }
    },
    /**
     * @private
     * @param method
     */
    findListenerIndexes: function (method) {
        var indexes = [];
        for (var i = 0; i < this.listeners.length; i++) {
            if (this.listeners[i] === method) {
                indexes.push(i);
            }
        }

        return indexes;
    }
};
