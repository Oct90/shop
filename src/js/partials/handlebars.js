;(function () {
    
    var offers = { items: [
       {
          name: 'adidas \'90s Grey Crew Sweatshirt',
          price: '£65',
          img: './img/5216291621719_004_b.png'
       },
       {
          name: 'adidas Fitted Crew Sweatshirt in Grey',
          price: '£70',
          img: './img/5216291620152_010_b.png'
       },
       {
          name: 'adidas STR Graphic Crew Sweatshirt',
          price: '£45',
          img: './img/5216291620025_004_d-(1).png'
       },
       {
          name: 'adidas Graphic Crew Sweatshirt',
          price: '£55',
          img: './img/5216291620026_001_b.png'
       },
       {
          name: 'adidas Originals Tonal Raglan Grey...',
          price: '£55',
          img: './img/5216291627791_004_b.png'
       },
       {
          name: 'adidas Originals Trefoil Grey Hoodie',
          price: '£55',
          img: './img/5216291621702_004_b.png'
       },
       {
          name: 'adidas Originals Street Logo Crewneck...',
          price: '£60',
          img: './img/5216291620157_001_b.png'
       },
       {
          name: 'DRMTM Sidezip Pullover Hoodie',
          price: '£70',
          img: './img/5216091460054_001_b.png'
       },
       {
          name: 'DRMTM Black Mesh Crew Neck...',
          price: '£70',
          img: './img/5216091460102_001_b.png'
       },
       {
          name: 'DRMTM Midnight Black Hoodie',
          price: '£70',
          img: './img/5216091460053_001_b.png'
       },
       {
          name: 'DRMTM Sidezip Pullover Hoodie',
          price: '£70',
          img: './img/5216091460054_001_b.png'
       },
       {
          name: 'DRMTM Midnight Olive Crew Sweatshirt',
          price: '£70',
          img: './img/5216091460052_030_b.png'
       }
    ]};
    
    if (window.location.pathname == '/section.html'){
        var template = Handlebars.compile( $('#item-template').html() );
        $('.offers-section .row').append( template(offers) );
    }
    
    $('.more-items').on('click', function (e) {
        var $grid = $('.grid .row').imagesLoaded( function() {
                $grid.masonry({
                    itemSelector: '.cols',
                    percentPosition: true,
                    columnWidth: '.cols.width'
                });
            });
        
        $('.offers .row').append( template(offers) ).masonry( 'appended');
        
        $grid.masonry('reloadItems');
        
        e.preventDefault();
    });
    
})();