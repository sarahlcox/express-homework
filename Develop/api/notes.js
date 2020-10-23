// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
const dbJSON = require("../db/db.json"); 
// const noteData = require("../db/noteData");



module.exports = function(app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    app.get("/api/notes", function(req, res) {
      res.json(dbJSON);
    });

// User needs to be able to type a note and save it
  app.post("/api/notes", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users input a note and save it.
    // req.body is available since we're using the body parsing middleware
    // pushes the user response into the sidebar area displaying the title
    dbJSON.push(req.title);
    dbJSON.push(req.text);
    res.json;

    
  });
}; 
//   We need a clear/delete function to give the user the option to delete their note
