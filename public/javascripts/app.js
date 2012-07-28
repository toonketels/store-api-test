// Global object to capture our code so
// we don't pollute global scope.
Store = window.Store || {};


Store.Product = Backbone.Model.extend({
	defaults: {
		title: null
	  , description: null
	}
});


Store.App = Backbone.Router.extend({
	// Define our routes...
    routes: {
    	'/': 'listProducts'
      , 'list': 'listProducts'
    }
    // Routes callback functions...
  , listProducts: function() {
  	  var productsList = new Store.ProductListView({
  	  	  'container': $('#container')
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
  			model: model
  		});
  		item.render().$el.appendTo(this.$el);
    }
});


Store.ProductListItemView = Backbone.View.extend({
	tagName: 'li'
  , className: 'product'
  , initialize: function ( options ) {
  		this.template = $('#product-template').html();
  	}
  , render: function() {
  		var markup = Mustache.to_html(this.template, this.model.toJSON());
  		this.$el.html(markup).attr('id', this.model.get('_id'));
  		return this;
    }
});


Store.ProductList = Backbone.Collection.extend({
	model: Store.Product
  , url: '/api/products'
  , initialize: function() {
  		this.fetch({
  			success: this.fetchSuccess
  		  , error: this.fetchError
  		});
  		this.deferred = new $.Deferred();
    }
  , deferred: Function.constructor.prototype
  , fetchSuccess: function (collection, response) {
  		collection.deferred.resolve();
    }
  , fetchError: function (collection, response) {
  		throw new Error("Products fetch did get collection from API");
    }
});

Store.products = new Store.ProductList();

// Bootstrap
Store.app = new Store.App();
Backbone.history.start();

