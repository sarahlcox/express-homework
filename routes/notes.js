// require dependencies 
const fs =require("fs");

module.exports = function(app) {
    // API GET Requests
    // Below code handles when users "visit" a page, gets the list data from db file.
    app.get("/api/notes", function(req, res) {
      fs.readFile("./db/db.json", "utf8", function (err, data) {
        if (err) throw err;
        const newData = JSON.parse(data);
        res.json(newData);
    });    
  });

// User needs to be able to type a note and save it
  app.post("/api/notes", function(req, res) {
    // Our "server" will respond to requests and let users input a note and save it.
    // req.body is available since we're using the body parsing middleware
    // pushes the user response into the sidebar area displaying the title
    fs.readFile("./db/db.json", "utf8", function (err, data) {
      if (err) throw err;
      const noteList=JSON.parse(data);
      // get the list data, then create the format for the note using keys
      let nextId=noteList.length;
      let note={"id": nextId,"title": req.body.title, "text": req.body.text};
      // gets the input from the user and pushes the title to the sidebar
      noteList.push(note);

      fs.writeFile("./db/db.json", JSON.stringify(noteList), function(err){
        if(err) throw err;
        res.redirect("/notes");

      });
    });
  });

  app.delete("/api/notes/:id", function (req, res) {
  //splice data and get id from db json file, run loop through db file, and delete the corresponding note based on id so that the appropriate id/item is deleted
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
        // tried using redirect here, however it wasn't properly redirecting the page, so res end stops processing the data to stay on the current page with deleted data
        res.end();

      });
    });
  });
}; 
