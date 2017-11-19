const electron = require('electron')
const ffmepg = require('fluent-ffmpeg')
const _ = require('lodash')
const { app, BrowserWindow, ipcMain } = electron

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    hegiht: 600,
    width: 800,
    webPreferences: {backgroundThrottling: false}
  })

  mainWindow.loadURL(`file://${__dirname}/src/index.html`)
})

ipcMain.on('videos:added', ( event, videos ) => {
  // const promise = new Promise ( (resolve, reject) => {
  //   ffmepg.ffprobe( videos[0].path, (err, metadata) => {
  //     resolve(metadata)
  //   })
  // })

  // promise.then((metadata) => { console.log(metadata) })

  const promises = _.map(videos, video => {
    return new Promise((resolve, reject) => {
      ffmepg.ffprobe(video.path, (err, metadata)=> {
        resolve({
          ...video,
          duration: metadata.format.duration,
          format: 'avi'
        })
      })
    })
  })

  Promise.all(promises)
    .then((results) => console.log(results))
})  