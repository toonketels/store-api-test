
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

var Schema = mongoose.Schema;

var Product = new Schema({
    title: { type: String, required: true }
  , description: { type: String, required: true }
  , style: { type: String, unique: true }
  , modified: { type: Date, default: Date.now }
});

var ProductModel = mongoose.model('Product', Product);

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

app.get('/api', function (req, res) {
  res.send('Store API is running');
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

// Launch server
app.listen(3000); 