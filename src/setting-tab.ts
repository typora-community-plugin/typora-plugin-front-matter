import { I18n, SettingTab, path } from "@typora-community-plugin/core"
import type FrontMatterPlugin from "./main"
import { DEFAULT_SETTINGS } from "./settings"
import * as Locale from './locales/lang.en.json'


export class FrontMatterSettingTab extends SettingTab {

  get name() {
    return 'Front Matter'
  }

  i18n!: I18n<typeof Locale>

  constructor(private plugin: FrontMatterPlugin) {
    super()
    this.i18n = new I18n<typeof Locale>({
      localePath: path.join(plugin.manifest.dir!, 'locales')
    })
  }

  show() {
    const { plugin } = this
    const { t } = this.i18n

    this.containerEl.innerHTML = ''

    this.addSetting(setting => {
      setting.addName(t.propNames)
      setting.addDescription(t.propNamesDesc)
      setting.addText(input => {
        input.value = plugin.settings.get('propNames').join(', ')
        input.placeholder = 'prop1, prop2'
        input.oninput = () => {
          plugin.settings.set(
            'propNames',
            input.value.split(/, */).filter(Boolean)
          )
        }
      })
    })

    this.addSettingTitle(t.timeStamp)

    this.addSetting(setting => {
      setting.addName(t.propCreated)
      setting.addDescription(t.propCreatedDesc)
      setting.addCheckbox(checkbox => {
        checkbox.checked = plugin.settings.get('useCreated')
        checkbox.onchange = () => {
          plugin.settings.set('useCreated', checkbox.checked)
        }
      })
      setting.addText(input => {
        input.value = plugin.settings.get('propNameCreated')
        input.placeholder = DEFAULT_SETTINGS.propNameCreated
        input.oninput = () => {
          plugin.settings.set('propNameCreated', input.value ?? DEFAULT_SETTINGS.propNameCreated)
        }
      })
    })

    this.addSetting(setting => {
      setting.addName(t.applyCreatedToExisting)
      setting.addDescription(t.applyCreatedToExistingDesc)
      setting.addCheckbox(checkbox => {
        checkbox.checked = plugin.settings.get('applyCreatedToExisting')
        checkbox.onchange = () => {
          plugin.settings.set('applyCreatedToExisting', checkbox.checked)
        }
      })
    })

    this.addSetting(setting => {
      setting.addName(t.propUpdated)
      setting.addDescription(t.propUpdatedDesc)
      setting.addCheckbox(checkbox => {
        checkbox.checked = plugin.settings.get('useUpdated')
        checkbox.onchange = () => {
          plugin.settings.set('useUpdated', checkbox.checked)
        }
      })
      setting.addText(input => {
        input.value = plugin.settings.get('propNameUpdated')
        input.placeholder = DEFAULT_SETTINGS.propNameUpdated
        input.oninput = () => {
          plugin.settings.set('propNameUpdated', input.value ?? DEFAULT_SETTINGS.propNameUpdated)
        }
      })
    })

    this.addSetting(setting => {
      setting.addName(t.dateFormat)
      setting.addDescription(t.dateFormatDesc)
      setting.addText(input => {
        input.value = plugin.settings.get('dateFormat')
        input.placeholder = DEFAULT_SETTINGS.dateFormat
        input.oninput = () => {
          plugin.settings.set('dateFormat', input.value ?? DEFAULT_SETTINGS.dateFormat)
        }
      })
    })

    this.addSettingTitle(t.timeSpent)

    this.addSetting(setting => {
      setting.addName(t.propFocused)
      setting.addDescription(t.propFocusedDesc)
      setting.addCheckbox(checkbox => {
        checkbox.checked = plugin.settings.get('useFocused')
        checkbox.onchange = () => {
          plugin.settings.set('useFocused', checkbox.checked)
        }
      })
      setting.addText(input => {
        input.value = plugin.settings.get('propNameFocused')
        input.placeholder = DEFAULT_SETTINGS.propNameFocused
        input.oninput = () => {
          plugin.settings.set('propNameFocused', input.value ?? DEFAULT_SETTINGS.propNameFocused)
        }
      })
    })

    super.show()
  }
}
