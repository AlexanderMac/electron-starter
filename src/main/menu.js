const { Menu } = require('electron')

const menu = [{
  label: 'Electron',
  submenu: [{
    role: 'help',
    accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
    click: () => {
      console.log('Electron rocks!')
    }
  }]
}]
module.exports = Menu.buildFromTemplate(menu)
