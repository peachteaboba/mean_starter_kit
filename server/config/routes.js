/**
 * Created by peachteaboba on 02/08/19.
 */

// Require the controllers
var users = require('./../controllers/users.js');

// Define the routes
module.exports = function(app) {

  // User routes
  app.post('/reg', function(req, res) {
    users.reg(req, res);
  });

  app.post('/login', function(req, res) {
    users.login(req, res);
  });

};
