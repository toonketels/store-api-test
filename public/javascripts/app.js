// Global object to capture our code so
// we don't pollute global scope.
Store = window.Store || {};


Store.Product = Backbone.Model.extend({
    idAttribute: "_id"
	, defaults: {
		    title: null
	    , description: null
	  }
});


Store.App = Backbone.Router.extend({
	// Define our routes...
    routes: {
        '': 'listProducts'
    	, '/': 'listProducts'
      , 'list': 'listProducts'
      , 'products/:id': 'showProduct'
    }
    // Routes callback functions...
  , listProducts: function() {
    	  var productsList = new Store.ProductListView({
    	  	  'container': $('#main')
    	  	, 'collection': Store.products
    	  });
    	  // Render will be called when data is fetched
    	  Store.products.deferred.done(function(){
    	  	  productsList.render();
    	  });
    }
  , showProduct: function (id) {
        var product = Store.products.get(id);
        var productDetail = new Store.ProductDetailView({
            container: $('#main')
          , model: product
        });
        productDetail.render();

  }
});


Store.ProductListView = Backbone.View.extend({
    tagName: 'ul'
  , className: 'products'
  , render: function() {
    		for (var i = 0; i < this.collection.length; i++) {
  			    this.renderItem(this.collection.models[i]);  			
    		}
        $('#title').text('Product listing');
        $(this.options.container).html(this.$el);
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


Store.ProductDetailView = Backbone.View.extend({
    tagName: 'div'
  , className: 'product'
  , initialize: function ( options ) {
        this.template = $('#product-detail-template').html();
        console.log('The options passed to view: ' + options);
    }
  , render: function() {
        // Set the title
        $('#title').text(this.model.get('title'));

        // Insert model into template...
        var markup = Mustache.to_html(this.template, this.model.toJSON());
        this.$el.html(markup).attr('id', this.model.get('_id'));
        
        // Render it
        $(this.options.container).html(markup);
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
Backbone.history.start({pushState: true});


// For using Backbone pushstate on links.
// See: https://github.com/documentcloud/backbone/issues/456
// Note: links should correspond with serverside paths for when
// user refreshes or bookmarks page.
window.document.addEventListener('click', function(e) {
    e = e || window.event
    var target = e.target || e.srcElement
    if ( target.nodeName.toLowerCase() === 'a' ) {
        e.preventDefault()
        var uri = target.getAttribute('href')
        Store.app.navigate(uri.substr(1), true)
    }
});

window.addEventListener('popstate', function(e) {
    Store.app.router.navigate(location.pathname.substr(1), true);
});


// Store.products.where({'_id': '5013caf67a71c93706000006'});