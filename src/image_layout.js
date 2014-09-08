(function($, win) {

	var ImageLayout = function() {

		var HEIGHTS = [];

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
		var _getHeight = function(images, width, margin) {

			width -= images.length * (margin || 3); //margin

			var h = 0, $img;

			for (var i = 0 ; i < images.length; i++) {
				$img = $(images[i]);
				h += $img.data('width') / $img.data('height');
			}

			return Math.floor(width / h); //have to round down because Firefox will automatically roundup value with number of decimals > 3
		};

		var _setHeight = function(images, height) {

			HEIGHTS.push(height);

			var $img;
			for (var i = 0 ; i < images.length ; i++) {
				$img = $(images[i]);

				$img.css({
					width: height * ($img.data('width') / $img.data('height')),
					height: height
				}).closest('li').removeClass('hide');
			}
		}

		var _alignImages = function($imagePanel, maxHeight, margin, maxRow, hideRemainingImages) {

			var _w = $imagePanel.width(),
				maxHeight = maxHeight || 120,
				maxRow = maxRow || 1,
				hideRemainingImages = typeof hideRemainingImages === 'undefined' ? true : hideRemainingImages,
				n = 0; //number of rows

			var images = $imagePanel.find('img');

			w : while (images.length > 0 && n < maxRow) {

				for (var i = 1 ; i < images.length + 1; i++) {
					var slice = images.slice(0 , i);
					var h = _getHeight(slice, _w, margin);

					if (h < maxHeight) {
						_setHeight(slice, h);
						n++;
						images = images.slice(i);
						continue w;
					}
				}

				_setHeight(slice, Math.min(maxHeight, h));
				n++;
				break;
			}

			if (hideRemainingImages) {
				for (var i = 0 ; i < images.length; i++) {
					$(images[i]).closest('li').addClass('hide');
				}
			}
		};

		return {
			align: _alignImages
		};
	};

	$.ImageLayout = new ImageLayout;

})(jQuery, window);