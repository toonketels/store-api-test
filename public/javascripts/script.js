(function( $ ) {

  /**
   * Helper function to post products.
   * Only for during development...
   */
  $.fn.postProducts = function(product) {

    // Provide default product...
    if (!product) {
      var product = {
          "title": "Superdupe T-shirt"
        ,  "description": "All about the details. Of course it's black."
        ,  "images": [
        {
              kind: 'detail'
            , url: 'images/animated-glowing-wifi-signal-strength-detecting-t-shirt.jpg'
          }
          , {
          	kind: 'detail'
            , url: 'images/t_shirt_t_post_abonnement.jpg'
          }
        ]
        , categories: [{name: 'shirt'}]
        , catalogs: [{name: 'summer'}, {name: 'winter'}]
       , variants: [{
            color: 'blue'
          , images: [{
              kind: 'detail'
            , url: 'images/t_shirt_t_post_abonnement.jpg'
          }]
          , sizes: [{
        	  size: 'L'
        	, available: 440 
        	, sku: 'FHD74467GF'
        	, price: 35 
          }
          , {
          	  size: 'S'
        	, available: 100 
        	, sku: 'FHD74467SMGF'
        	, price: 30 
          }]
        }
        , {
            color: 'red'
          , images: [{
              kind: 'detail'
            , url: 'images/t_shirt_t_post_abonnement.jpg'
          }]
          , sizes: [{
        	  size: 'M'
        	, available: 210 
        	, sku: 'FHD744DE67GF'
        	, price: 39 
          }
          , {
          	  size: 'XXS'
        	, available: 40 
        	, sku: 'FHD744DED7SMGF'
        	, price: 33 
          }]
        }]
        ,  "style": "7576534D2"
      };
    }
    
    // Perform post request...
    $.post("/api/products",
       product
     , function (data, textStatus, jqXHR) {
      console.log("Post resposne:"); 
      console.dir(data); 
      console.log(textStatus); 
      console.dir(jqXHR);
    });

  };


  /**
   * Helper function to update existing product,
   * written (as a bad) jquery plugin.
   */
  $.fn.putProductsWithId = function( id, product ) {

    if ( !id ) {
      var id = '5013dd3627d31e1308000003';
    }

    if (!product ) {
      var product = {
          "title": "My Awesome T-shirt in Black"
        , "description": "All about the details. Of course it's black, and long sleeve"
        ,  "images": [{
            kind: 'detail'
          , url: 'images/animated-glowing-wifi-signal-strength-detecting-t-shirt.jpg'
        }
        , {
        	kind: 'detail'
          , url: 'images/t_shirt_t_post_abonnement.jpg'
        }]
        , categories: [{name: 'shirt'}]
        , catalogs: [{name: 'summer'}, {name: 'winter'}]
        , variants: [{
            color: 'blue'
          , images: [{
              kind: 'detail'
            , url: 'images/t_shirt_t_post_abonnement.jpg'
          }]
          , sizes: [{
        	  size: 'L'
        	, available: 440 
        	, sku: 'FHD74467GF'
        	, price: 35 
          }
          , {
          	  size: 'S'
        	, available: 100 
        	, sku: 'FHD74467SMGF'
        	, price: 30 
          }]
        }
        , {
            color: 'red'
          , images: [{
              kind: 'detail'
            , url: 'images/t_shirt_t_post_abonnement.jpg'
          }]
          , sizes: [{
        	  size: 'M'
        	, available: 210 
        	, sku: 'FHD744DE67GF'
        	, price: 39 
          }
          , {
          	  size: 'XXS'
        	, available: 40 
        	, sku: 'FHD744DED7SMGF'
        	, price: 33 
          }]
        }]
        , "style": "75764"
      };
    }

    $.ajax({
        url: "/api/products/" + id
      , type: "PUT"
      , data: product
      , success: function (data, textStatus, jqXHR) {
        console.log("Post resposne:");
        console.dir(data);
        console.log(textStatus);
        console.dir(jqXHR);
      }
    }); 
  };


  /**
   * Get all products.
   */
  $.fn.getProducts = function() {

  	$.get("/api/products/", function (data, textStatus, jqXHR) {
      console.log("Get responses:");
      console.dir(data);
      console.log(textStatus);
      console.dir(jqXHR);
    }); 
  };

  /**
   * Get a specific product.
   */
  $.fn.getProductsWithId = function( id ) {

    if ( !id ) {
      var id = '5013dd3627d31e1308000003';
    }

    $.get("/api/products/" + id, function(data, textStatus, jqXHR) {  
      console.log("Get resposne:");
      console.dir(data);
      console.log(textStatus);
      console.dir(jqXHR);
    });
  };


  /**
   * Delete a given product.
   */
  $.fn.deleteProductsWithId = function( id ) {

    if ( !id ) {
      var id = '5013dd3627d31e1308000003';
    }

    jQuery.ajax({
        url: "/api/products/" + id
      , type: "DELETE"
      , success: function (data, textStatus, jqXHR) { 
          console.log("Post resposne:"); 
          console.dir(data); 
          console.log(textStatus); 
          console.dir(jqXHR); 
      }
    });
  }


})( jQuery );