/* global Log4js */

/**
 * FIFO buffer
 * @constructor
 * @private
 */
Log4js.FifoBuffer = function()
{
  this.array = [];
};

Log4js.FifoBuffer.prototype = {

	/**
	 * @param {Object} obj any object added to buffer
	 */
	push : function(obj) {
        this.array[this.array.length] = obj;
        return this.array.length;
	},
	
	/**
	 * @return first putted in Object
	 */
	pull : function() {
		if (this.array.length > 0) {
			var firstItem = this.array[0];
			for (var i = 0; i < this.array.length - 1; i++) {
				this.array[i] = this.array[i + 1];
			}
			this.array.length = this.array.length - 1;
			return firstItem;
		}
		return null;
	},
	
	length : function() {
		return this.array.length;
	}
};
