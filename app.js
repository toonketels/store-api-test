
/**
 * Module dependencies.
 */
 var application_root = __dirname,
    express = require("express")
  , path = require("path")
  , mongoose = require("mongoose");

var app = express.createServer();

// Database
mongoose.connect('mongodb://localhost/store');

// Config
app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(application_root, "public")));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});


/**
 * Mongo db schema.
 */
var Schema = mongoose.Schema;

var Product = new Schema({
    title: { type: String, required: true }
  , description: { type: String, required: true }
  , style: { type: String, unique: true }
  , images: [Images]
  //, categories: [Categories]
  //, catalogs: [Catalogs]
  //, variants: [Variants]
  , modified: { type: Date, default: Date.now }
});

var Sizes = new Schema({
    size: { type: String, required: true }
  , available: { type: Number, required: true, min: 0, max: 1000 }
  , sku: {
      type: String
    , required: true
    , validate: [/[a-zA-Z0-9]/, 'Product sku should only have letters and numbers']
  }
  , price: { type: Number, required: true, min: 0 }
});

var Images = new Schema({
    /*
    kind: {
        type: String
      , enum: ['thumbnail', 'catalog', 'detail', 'zoom']
      , required: true
    }*/
    kind: String
  , url: { type: String, required: true }
});

var Variants = new Schema({
    color: String
  , images: [Images]
  , sizes: [Sizes]
});

var Categories = new Schema({
  name: String
});

var Catalogs = new Schema({
  name: String
});

var ProductModel = mongoose.model('Product', Product);


// View a single product
// Ex id: 5013cd10d7086e7306000001
app.get('/api/products/:id', function(req, res){
  return ProductModel.findById(req.params.id, function(err, product){
    if (!err) {
      return res.send(product);
    } else {
      return console.log(err);
    }
  });
});


// Update a single product
app.put('/api/products/:id', function(req, res){
  return ProductModel.findById(req.params.id, function(err, product){
    product.title = req.body.title;
    product.description = req.body.description;
    product.style = req.body.style;
    product.images = req.body.images;
    return product.save(function(err){
      if (!err) {
        console.log('Updated!');
      } else {
        console.log(err);
      }
      return res.send(product);
    });
  });
});


// Delete a single product
app.delete('/api/products/:id', function(req, res){
  return ProductModel.findById(req.params.id, function(err, product){
    return product.remove(function(err){
      if (!err) {
        console.log('Removed!');
      } else {
        console.log(err);
      }
    });
  });
});


// View all products
app.get('/api/products', function(req, res) {
  return ProductModel.find(function(err, products) {
    if(!err) {
      return res.send(products);
    } else {
      console.log(err);
    }
  });
});


// Create a product
app.post('/api/products', function(req, res) {
  var product;
  console.log('POST: ');
  console.log(req.body);
  product = new ProductModel({
      title: req.body.title
    , description: req.body.description
    , style: req.body.style
    , images: req.body.images
  });
  product.save(function(err) {
    if (!err) {
      return console.log('Created!');
    } else {
      return console.log(err);
    }
  });
  return res.send(product);
});


// Send message it runs...
app.get('/api', function (req, res) {
  res.send('Store API is running');
});

// Launch server
app.listen(3000); 