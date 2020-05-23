var express = require("express"),
  app = express(),
  http = require("http").Server(app);
upload = require("express-fileupload");
app.use(upload());

app.post("/", function (req, res) {
  if (req.files) {
    //console.log(req.files);
    var file = req.files.filename,
      filename = file.name;
    file.mv("E:/node/upload_file/files/" + filename, function (err) {
      if (err) {
        console.log(err);
        res.send("error");
      } else {
        res.send("done");
        console.log("file uploaded.");
      }
    });
  }
});
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
  console.log("server get started at 1000");
})
  .listen(1000);
