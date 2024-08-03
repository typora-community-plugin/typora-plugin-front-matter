import { I18n, SettingTab } from "@typora-community-plugin/core"
import type FrontMatterPlugin from "./main"
import { DEFAULT_SETTINGS } from "./settings"


export class FrontMatterSettingTab extends SettingTab {

  get name() {
    return 'Front Matter'
  }

  i18n = new I18n({
    resources: {
      'en': {
        propNames: 'Default front matter',
        propNamesDesc: 'Add front matter property\'s key to new note automatically.\n Format: `prop1, prop2, ...`',
        propCreated: 'Prop `created`',
        propCreatedDesc: 'After openning empty note, auto add `created` datetime.',
        propUpdated: 'Prop `updated`',
        propUpdatedDesc: 'Before save note, auto update `updated` datetime.',
        dateFormat: 'Datetime format',
        dateFormatDesc: 'Supported placeholders: `yyyy`, `yy`, `MM`, `dd`, `hh`, `mm`, `ss`',
      },
      'zh-cn': {
        propNames: '默认 front matter',
        propNamesDesc: '新建笔记时自动添加的 front matter 属性。\n格式：`prop1, prop2, ...`',
        propCreated: '属性 `created`',
        propCreatedDesc: '打开空白笔记后，自动添加 `created` 日期时间。',
        propUpdated: '属性 `updated`',
        propUpdatedDesc: '保存笔记前，自动更新 `updated` 日期时间。',
        dateFormat: '时间格式化模板',
        dateFormatDesc: '支持的占位符：`yyyy`, `yy`, `MM`, `dd`, `hh`, `mm`, `ss`',
      },
    }
  })

  constructor(private plugin: FrontMatterPlugin) {
    super()
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

    super.show()
  }
}
