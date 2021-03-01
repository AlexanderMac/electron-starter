const { app, Menu, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
const menu = require('./menu')

const ROOT = path.resolve(__dirname, '../../')
const args = process.argv.slice(1)
const SERVE = args.some(val => val === '--serve')

let _mainWindow;

(async () => {
  try {
    await app.whenReady()
    Menu.setApplicationMenu(menu)
    await _createMainWindow()

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })

    app.on('activate', () => {
      if (_mainWindow === null) {
        _mainWindow = _createMainWindow()
      }
    })
  } catch (err) {
    // Catch Error
    // throw err
  }
})()

function _createMainWindow() {
  let win = new BrowserWindow({
    width: 1500,
    height: 750,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: false,
      contextIsolation: false
    }
  })

  let indexPage = path.join(ROOT, 'build/index.html')

  win.webContents.openDevTools()
  win.loadURL(
    url.format({
      pathname: indexPage,
      protocol: 'file:',
      slashes: true
    })
  )

  if (SERVE) {
    require('electron-reloader')(module, {
      ignore: [
        'config',
        'resources',
        'src/renderer'
      ]
    })
  }

  win.on('closed', () => {
    win = null
  })

  return win
}
