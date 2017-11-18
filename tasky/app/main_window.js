const electron = require('electron');
const path = require('path')
const { app, BrowserWindow, Tray } = electron;


class MainWindow extends BrowserWindow {
  constructor(url){
    super({
      height: 500,
      width: 300,
      frame: false,
      resizable: false,
      show: false,  
      webPreferences: { backgroundThrottling: false }
    }) 

    this.on('blue', this.onBlur.bind(this))
    this.loadURL(url);
  }

  onBlur(){
    this.hide();
  }
}

module.exports = MainWindow;    