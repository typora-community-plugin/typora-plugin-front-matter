import { Plugin, PluginSettings } from '@typora-community-plugin/core'
import { editor, getMarkdown } from 'typora'
import { FrontMatterSettingTab } from './setting-tab'
import { DEFAULT_SETTINGS, FrontMatterSettings } from './settings'
import { useTimeStamp } from './features/time-stamp'


export default class FrontMatterPlugin extends Plugin<FrontMatterSettings> {

  async onload() {

    const { app } = this

    this.registerSettings(
      new PluginSettings(app, this.manifest, {
        version: 1,
      }))

    this.settings.setDefault(DEFAULT_SETTINGS)

    const { tryToAddCreatedTime, tryToAddUpdatedTime } = useTimeStamp(this)

    this.register(
      app.workspace.on('file:open', () => {
        const { docMenu } = editor
        const isEmptyDoc = getMarkdown().trim() === ''

        if (docMenu.getMetaNode()) {
          editor.stylize.insertMetaBlock()
        }
        if (isEmptyDoc) {
          this.settings.get('propNames').forEach(propName => {
            docMenu.writeProperty(propName, '')
          })
          tryToAddCreatedTime()
        }
      }))

    this.register(
      app.workspace.on('file:will-save', () => {
        const { docMenu } = editor

        if (docMenu.getMetaNode()) {
          editor.stylize.insertMetaBlock()
        }
        tryToAddUpdatedTime()
      }))

    this.registerSettingTab(new FrontMatterSettingTab(this))
  }
}
