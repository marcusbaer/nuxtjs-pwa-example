const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

let dataRoot = process.env.DATA_ROOT || path.join(__dirname, '../data');

var uploadRoutes = express.Router();

uploadRoutes.post('/:type', function (req, res, next) {

  // http://stackoverflow.com/questions/16534892/multipart-file-uploads-using-nodejs
  // FILE UPLOADS multipart/form-data; boundary=
  var uploadType = req.params.type;

  var form = new formidable.IncomingForm();

  form.parse(req, function(err, fields, files) {

      var old_path, new_path, download_url;
      // util.inspect({fields: fields, files: files})
      // res.writeHead(200, {'content-type': 'application/octet-stream'});

      if (uploadType === 'video') {
          var uploadDate = new Date().getTime();
          var locationKey = 'A';
          var place = req.query.marker || '';
          var uploadFilename = uploadDate + '_' + locationKey + '_' + place  + '.webm';
          var videoBlob = files["video-blob"]; // `video-blob` is the name of the <input> field of type `file`
          old_path = videoBlob.path;
          new_path = path.join(dataRoot, '/media/', uploadFilename);
          download_url = 'media/'+uploadFilename;
      } else {
          old_path = files.file.path;
          new_path = path.join(dataRoot, '/media/', files.file.name);
          download_url = 'media/'+files.file.name;
      }

      fs.readFile(old_path, function(err, data) {
          fs.writeFile(new_path, data, function(err) {
              fs.unlink(old_path, function(err) {
                  if (err) {
                      res.status(500);
                      res.json({'success': false});
                  } else {
                      res.status(200);
                      res.json({'success': true, 'url': download_url});
                  }
              });
          });
      });

  });

});

module.exports = function(server, passport){
    return uploadRoutes;
};
