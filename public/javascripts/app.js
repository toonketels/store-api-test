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


Store.ProductListView = Backbone.View.extend({
    tagName: 'ul'
  , className: 'products'
  , render: function() {
  		for (var i = 0; i < this.collection.length; i++) {
			this.renderItem(this.collection.models[i]);  			
  		}
  		$(this.container).find(this.className).remove();
  		this.$el.appendTo(this.options.container);
  		return this;
    }
  , renderItem: function( model ) {
  		var item = new Store.ProductListItemView({
  			"model": model
  		});
  		item.render().$el.appendTo(this.$el);
    }
});