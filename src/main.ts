import { Plugin, PluginSettings } from '@typora-community-plugin/core'
import { editor, getMarkdown } from 'typora'
import { FrontMatterSettingTab } from './setting-tab'
import { DEFAULT_SETTINGS, FrontMatterSettings } from './settings'


export default class extends Plugin<FrontMatterSettings> {

  async onload() {

    const { app } = this

    this.registerSettings(
      new PluginSettings(app, this.manifest, {
        version: 1,
      }))

    this.settings.setDefault(DEFAULT_SETTINGS)

    this.register(
      app.workspace.on('file:open', () => {
        const { docMenu } = editor
        const isEmptyDoc = getMarkdown().trim() === ''

        if (docMenu.getMetaNode()) {
          editor.stylize.insertMetaBlock()
        }
        if (isEmptyDoc) {
          docMenu.writeProperty(this.settings.get('propNameCreated'), nowDatetime(this.settings.get('dateFormat')))
        }
      }))

    this.register(
      app.workspace.on('file:will-save', () => {
        const { docMenu } = editor

        if (docMenu.getMetaNode()) {
          editor.stylize.insertMetaBlock()
        }
        docMenu.writeProperty(this.settings.get('propNameUpdated'), nowDatetime(this.settings.get('dateFormat')))
      }))

    this.registerSettingTab(new FrontMatterSettingTab(this))
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
