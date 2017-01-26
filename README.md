'google-image-layout
===================

A library help you to build Google like Image Gallery. Vanilla Javascript

DEMO [http://ptgamr.github.io/google-image-layout/](http://ptgamr.github.io/google-image-layout/)

TUTORIAL [http://trinhtrunganh.com/2014/09/12/google-image-layout.html](http://trinhtrunganh.com/2014/09/12/google-image-layout.html)

Documentation
=============

### Init via Data Attribute
very simple, add your markdown as bellow

```html
<div class="google-image-layout" data-google-image-layout data-max-height="150">
	<img src="http://media-cache-ec0.pinimg.com/736x/d6/1f/6f/d61f6ff7dc676504170e6233fc6373e6.jpg"/>
	<img src="http://media-cache-ec0.pinimg.com/736x/3d/e7/9b/3de79b852892d20cc55c51a3d5bdea95.jpg"/>
	<img src="http://media-cache-ak0.pinimg.com/236x/ef/c9/1f/efc91fba944f62dfff1f7ba8c68c354a.jpg"/>
	<img src="http://media-cache-ak0.pinimg.com/236x/b0/c7/74/b0c7741ecb01dac741423164619160ef.jpg"/>
	...
</div>
```

####data-max-height (default 120)
The maximum height of images in the gallery

### API
####.align(element)
`element` the gallery container which contains images

***Important Notice
===================

Thís plugin requires the image's `width` and `height` have to be known in prior to initialization. If you already have that information, put `data-width` & `data-height` to your image tags.

Otherwise, please consider using [imagesLoaded](https://github.com/desandro/imagesloaded) to load the images first

```javascript
var imgLoad = imagesLoaded( document.querySelector('body') );

imgLoad.on( 'progress', function( instance, image ) {
  image.img.setAttribute('data-width', image.img.offsetWidth);
  image.img.setAttribute('data-height', image.img.offsetHeight);
});

imgLoad.on( 'done', function( instance ) {
  GoogleImageLayout.init();
});
```

Todo List
=========
- Responsive support
- Append images (for infinite scrolling, loadmore button)
- More configuration options



## License
MIT license

