import Stats from 'stats.js/src/Stats'
import { Pane } from 'tweakpane'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'

export default class Debug {
  constructor (active) {
    this.active = active

    if (this.active) {
      this.#initUi()
      this.#initStats()
      this.#initImportExport()
    }
  }

  #initUi () {
    this.pane = new Pane()
    this.pane.registerPlugin(EssentialsPlugin)

    this.tab = this.pane.addTab({
      pages: [
        { title: 'Parameters' },
        { title: 'Import/Export' }
      ]
    })

    this.ui = this.tab.pages[0]
  }

  #initStats () {
    this.stats = new Stats()
    document.body.appendChild(this.stats.dom)
    this.fpsGraph = this.ui.addBlade({
      view: 'fpsgraph',
      label: 'fpsgraph',
      lineCount: 2
    })
  }

  #initImportExport () {
    this._paramsImportExport = {
      name: 'Params',
      json: ''
    }
    this.#initImport()
    this.tab.pages[1].addSeparator()
    this.#initExport()

    this.pane.on('change', () => { this.updatePreset() })
  }

  #initImport () {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/JSON'
    input.style.display = 'none'
    document.body.appendChild(input)
    input.addEventListener('change', this.#importDataFile.bind(this, input))
    const importBtn = this.tab.pages[1].addButton({ title: 'Import' })
    importBtn.on('click', () => { input.value = ''; input.click() })
  }

  #importDataFile (input) {
    if (input.files.length === 0) { return }
    const fileReader = new FileReader()
    const onload = () => {
      const parsedJSON = JSON.parse(fileReader.result || '')
      this.pane.importPreset(parsedJSON)
    }
    fileReader.onload = onload.bind(this)
    fileReader.readAsText(input.files[0])
  }

  #initExport () {
    this.tab.pages[1].addInput(this._paramsImportExport, 'name', { label: 'Name File' })
    this.tab.pages[1].addMonitor(this._paramsImportExport, 'json', {
      label: 'JSON',
      multiline: true,
      lineCount: 5
    })
    const exportBtn = this.tab.pages[1].addButton({ title: 'Export' })
    exportBtn.on('click', () => {
      const a = document.createElement('a')
      const file = new Blob([this._paramsImportExport.json], { type: 'text/plain' })
      a.href = URL.createObjectURL(file)
      a.download = `${this._paramsImportExport.name}.json`
      a.click()
    })
  }

  updatePreset () {
    this._paramsImportExport.json = JSON.stringify(this.pane.exportPreset(), null, 2)
  }

  begin () {
    if (!this.active) {
      return
    }
    this.stats.begin()
    this.fpsGraph.begin()
  }

  end () {
    if (!this.active) {
      return
    }
    this.stats.end()
    this.fpsGraph.end()
  }
}
