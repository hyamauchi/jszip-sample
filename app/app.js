(function(){
  document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById('dozip').addEventListener('click', function() {

      var addtoZip = function(zip, url, filename) {
        return new Promise(function(resolve, reject) {
          JSZipUtils.getBinaryContent(url, function(err, data) {
            if (err) {
              reject(err);
            }
            zip.file(filename, data, {binary: true});
            resolve(data);
          });
        });
      };

      var zip = new JSZip();
      zip.file("Hello.txt", "Hello World\n");
      var folder = zip.folder("app");

      addtoZip(folder, "404.html", "404.html")
        .then(function () {
          return addtoZip(folder, "app.js", "app.js");
        }).then(function () {
          return addtoZip(folder, "index.html", "index.html");
        }).then(function () {
          return zip.generateAsync({type: "blob"});
        }).then(function (content) {
          return saveAs(content, "example.zip");
        }).catch(function (error) {
          alert(error);
        });

    }, false);
  });

})();
