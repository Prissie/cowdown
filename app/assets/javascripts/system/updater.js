(function () {
  var gui               = require('nw.gui');
  var connection        = require('./assets/javascripts/system/check_connection');
  var Updater           = require('node-webkit-mac-updater');

  var $dialogUpdate     = $('.dialog-update');
  var $CowDownContainer = $('.cowdown-app');

  var AppUpdate = function () {
    var self = this;

    self.checkNewVersion();
  };

  AppUpdate.prototype.checkNewVersion = function () {
    var self = this;
    $dialogUpdate.show();

    connection.isConnected(function (connected) {
      if (!connected) {
        alert('No Internet connection. Try again later.');
        return $dialogUpdate.hide();
      }

      self.startUpdate();
    });
  };

  AppUpdate.prototype.showUI = function() {
    $dialogUpdate.find('.progress-text').html('Downloading...');
    $dialogUpdate.css({ height: '160px' });
    $CowDownContainer.addClass('disabled');
    $dialogUpdate.find('.progress-bar').show();
  }

  AppUpdate.prototype.startUpdate = function() {
    var self = this;

    self.showUI();

    var up = new Updater({
      dmg_name: 'CowDown',
      app_name: 'CowDown',
      source: {
          host: '127.0.0.1',
          port: 8000,
          path: '/CowDown.dmg'
      },

      progress: function (percentage) {
        self.onProgress(percentage);
      }
    });

    up.update(function(err) {
      var alertMsg = (err) ? 'Update failed, please reopen the application.' : 'Updated successfully! Please, reopen CowDown!';

      alert(alertMsg);
      process.exit();
    });
  }


  AppUpdate.prototype.onProgress = function(percentage) {
    var value = percentage + '%';

    $dialogUpdate.find('.progress-bar-value')
      .html(value)
      .css({width: value});

    if ((percentage > 1) && (percentage <= 99)) {
    } else if (percentage == 100) {
      $dialogUpdate.find('.progress-text').html('Installing now...');
    }
  };

  window.AppUpdate = AppUpdate;
})();
