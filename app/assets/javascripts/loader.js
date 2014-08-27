(function () {
  var fs = require('fs');

  window.FileLoader = {
    load: function(filePath) {
      if (fs.existsSync(filePath)) {
        var data = fs.readFileSync(filePath);

        if (data) {
          $('.cowdown-code textarea').val(data.toString('utf-8'));

          CowdowApp.updatePreview();
          CowdowApp.code.focus();
        }
      }
    }
  };
})();

$(function () {
  FileLoader.load('./app/assets/help.md');
});
