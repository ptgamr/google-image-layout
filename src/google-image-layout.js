/**
 *
 * Google Image Layout v0.0.1
 * Description, by Anh Trinh.
 * http://trinhtrunganh.com
 *
 * Free to use under the MIT License.
 *
 */

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(function() {
			return factory(root);
		});
	} else if (typeof exports === 'object') {
		module.exports = factory;
	} else {
		root.GoogleImageLayout = factory(root);
	}
})(this, function (root) {

	'use strict';

	var GoogleImageLayout = {};

	var HEIGHTS = [], margin = 5;

	var turnObjToArray = function(obj) {
		return [].map.call(obj, function(element) {
			return element;
		})
	};

	var _debounceOrThrottle = function () {
		if(!useDebounce && !!poll) {
			return;
		}
		clearTimeout(poll);
		poll = setTimeout(function(){
			echo.render();
			poll = null;
		}, delay);
	};

	/**
	 * Get the height that make all images fit the container
	 *
	 * width = w1 + w2 + w3 + ... = r1*h + r2*h + r3*h + ...
	 * 
	 * @param  {[type]} images the images to be calculated
	 * @param  {[type]} width  the container witdth
	 * @param  {[type]} margin the margin between each image 
	 * 
	 * @return {[type]}        the height
	 */
	var _getHeigth = function(images, width, margin) {

		width -= images.length * margin;

		var r = 0, img;

		for (var i = 0 ; i < images.length; i++) {
			img = images[i];
			r += parseInt(img.getAttribute('data-width')) / parseInt(img.getAttribute('data-height'));
		}

		return width / r; //have to round down because Firefox will automatically roundup value with number of decimals > 3

	};

	var _setHeight = function(images, height) {

		console.log("set height");

		HEIGHTS.push(height);

		var img;

		for (var i = 0 ; i < images.length; i++) {
			img = images[i];
			img.style.width = height * parseInt(img.getAttribute('data-width')) / parseInt(img.getAttribute('data-height')) + 'px';
			img.style.height = height + 'px';
			img.style.marginRight = margin - 4 + 'px'; // -4 is the negative margin of the inline element
			img.style.marginBottom = margin + 'px';
			img.classList.add('layout-completed');
		}

	};

	GoogleImageLayout.init = function (opts) {
		opts = opts || {};
		var nodes = document.querySelectorAll('div[data-google-image-layout]');
		var length = nodes.length;
		var elem;

		for (var i = 0 ; i < length; i++) {
			elem = nodes[i];
			GoogleImageLayout.align(elem);
		}
	};

	GoogleImageLayout.align = function(elem) {

		//get the data attribute
		
		var containerWidth = elem.clientWidth,
			maxHeight = parseInt(elem.getAttribute('data-max-height') || 120);

		var imgNodes = turnObjToArray(elem.querySelectorAll('img'));

		w : while (imgNodes.length > 0) {

			for (var i = 1 ; i <= imgNodes.length; i++) {
				var slice = imgNodes.slice(0, i);
				var h = _getHeigth(slice, containerWidth, margin);

				if (h < maxHeight) {
					_setHeight(slice, h);
					imgNodes = imgNodes.slice(i);
					continue w;
				}
			}

			_setHeight(slice, Math.min(maxHeight, h));
			break;
		}

	};

	return GoogleImageLayout;
});