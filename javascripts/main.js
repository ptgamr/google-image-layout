var imgLoad = imagesLoaded( document.querySelector('body') );

imgLoad.on( 'progress', function( instance, image ) {
  image.img.setAttribute('data-width', image.img.offsetWidth);
  image.img.setAttribute('data-height', image.img.offsetHeight);
});


imgLoad.on( 'done', function( instance ) {
  GoogleImageLayout.init();
});

