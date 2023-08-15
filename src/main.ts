import { Plugin } from '@typora-community-plugin/core'
import { editor, getMarkdown } from 'typora'
import { FrontMatterSettingTab } from './setting-tab'
import { DEFAULT_SETTINGS, FrontMatterSettings } from './settings'


export default class extends Plugin {

  settings: FrontMatterSettings

  async onload() {

    const { app } = this

    await this.loadSettings()

    this.register(
      app.vault.on('mounted', () => this.loadSettings()))

    this.register(
      app.workspace.on('file:open', () => {
        const { docMenu } = editor
        const isEmptyDoc = getMarkdown().trim() === ''

        if (docMenu.getMetaNode()) {
          editor.stylize.insertMetaBlock()
        }
        if (isEmptyDoc) {
          docMenu.writeProperty(this.settings.propNameCreated, nowDatetime(this.settings.dateFormat))
        }
      }))

    this.register(
      app.workspace.on('file:will-save', () => {
        const { docMenu } = editor

        if (docMenu.getMetaNode()) {
          editor.stylize.insertMetaBlock()
        }
        docMenu.writeProperty(this.settings.propNameUpdated, nowDatetime(this.settings.dateFormat))
      }))

    this.registerSettingTab(new FrontMatterSettingTab(this))
  }

  onunload() {
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())
  }

  async saveSettings() {
    await this.saveData(this.settings)
  }
}

function nowDatetime(format: string) {
  const now = new Date()
  const formatter: Record<string, string | number> = {
    yyyy: now.getFullYear(),
    yy: now.getFullYear().toString().slice(2),
    MM: now.getMonth() + 1,
    dd: now.getDate(),
    hh: now.getHours(),
    mm: now.getMinutes(),
    ss: now.getSeconds(),
  }

  return Object.keys(formatter).reduce(
    (format, k) => format.replace(k, formatter[k].toString().padStart(k.length, '0')),
    format
  )
}
