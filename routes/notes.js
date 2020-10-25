// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// const dbJSON = require("../db/db.json"); 
const fs =require("fs");
var path = require("path");



module.exports = function(app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    app.get("/api/notes", function(req, res) {
      fs.readFile("./db/db.json", "utf8", function (err, data) {
        if (err) throw err;
        console.log(data);
        const newData = JSON.parse(data);
        res.json(newData);
    });    
  });

// User needs to be able to type a note and save it
  app.post("/api/notes", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users input a note and save it.
    // req.body is available since we're using the body parsing middleware
    // pushes the user response into the sidebar area displaying the title
    fs.readFile("./db/db.json", "utf8", function (err, data) {
      if (err) throw err;
      const noteList=JSON.parse(data);
      console.log(noteList);
      let nextId=noteList.length;
      let note={"id": nextId,"title": req.body.title, "text": req.body.text};
      console.log(note);
      noteList.push(note);
      console.log(noteList);

      fs.writeFile("./db/db.json", JSON.stringify(noteList), function(err){
        if(err) throw err;
        console.log("added");
        res.redirect("/notes");

      });
    });
  });

  app.delete("/api/notes/:id", function (req, res) {
  //splice or slice
    console.log("hi");
    console.log(req.params.id);
    fs.readFile("./db/db.json", "utf8", function (err, data) {
      if (err) throw err;
      const noteList=JSON.parse(data);
      for (i=0; i<noteList.length; i++) {
        if (noteList[i].id==req.params.id){
          noteList.splice(i,1);
          break;
        }
      }
      fs.writeFile("./db/db.json", JSON.stringify(noteList), function(err){
        if(err) throw err;
        console.log("delete");
        res.end();

      });
    });
  });
    

    // console.log(req.body);
    // dbJSON.push(req.title);
    // dbJSON.push(req.text);
    // res.json;
    
  
}; 
//   We need a clear/delete function to give the user the option to delete their note