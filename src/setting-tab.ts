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
        propCreated: 'Prop `created`',
        propCreatedDesc: 'After openning empty note, auto add `created` datetime.',
        propUpdated: 'Prop `updated`',
        propUpdatedDesc: 'Before save note, auto update `updated` datetime.',
        dateFormat: 'Datetime format',
        dateFormatDesc: 'Supported placeholders: `yyyy`, `yy`, `MM`, `dd`, `hh`, `mm`, `ss`',
      },
      'zh-cn': {
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
      setting.addName(t.propCreated)
      setting.addDescription(t.propCreatedDesc)
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
