// Global object to capture our code so
// we don't pollute global scope.
Store = window.Store || {};

Store.App = Backbone.Router.extend({
	// Define our routes...
    routes: {
    	'/': 'listProducts'
      , 'list': 'listProducts'
    }
    // Routes callback functions...
  , listProducts: function() {
  	  var productsList = new Store.ProductListView({
  	  	  'container': $.('#container')
  	  	, 'collection': Store.products
  	  });
  	  // Render will be called when data is fetched
  	  Store.products.deferred.done(function(){
  	  	  productsList.render();
  	  });
  }
});