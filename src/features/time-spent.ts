import { editor } from "typora"
import type FrontMatterPlugin from "src/main"
import { app, Component } from "@typora-community-plugin/core"


export class TimeSpent extends Component {

  startTime: number
  focusedTime = 0

  constructor(private plugin: FrontMatterPlugin) {
    super()

    plugin.register(
      plugin.settings.onChange('useFocused', (_, isEnabled) => {
        isEnabled
          ? this.load()
          : this.unload()
      }))
  }

  load() {
    if (!this.plugin.settings.get('useFocused')) return
    super.load()
  }

  onload() {
    this.register(
      app.workspace.on('file:open', () => {
        this.startTime = Date.now()
        const lastFocusedTime = editor.docMenu.getValueInMeta(this.plugin.settings.get('propNameFocused'))
        this.focusedTime = parseTimeToMilliseconds(lastFocusedTime || '00:00:00')
      }))

    this.register(
      app.workspace.on('file:will-save', () => {
        const { docMenu } = editor

        if (docMenu.getMetaNode()) {
          editor.stylize.insertMetaBlock()
        }
        if (this.plugin.settings.get('useFocused')) {
          this.updateTimeSpent()
          editor.docMenu.writeProperty(
            this.plugin.settings.get('propNameFocused'),
            formatMilliseconds(this.focusedTime)
          )
        }
      }))

    this.registerDomEvent(editor.writingArea, 'focus', event => {
      this.startTime = Date.now()
    })

    this.registerDomEvent(editor.writingArea, 'blur', event => {
      this.updateTimeSpent()
    })
  }

  updateTimeSpent() {
    this.focusedTime += (Date.now() - this.startTime)
    this.startTime = Date.now()
  }
}

/**
 * @example console.log(formatMilliseconds(123456789)); //=> 34:17:36
 */
function formatMilliseconds(ms: number) {
  const hours = Math.floor((ms % 86400000) / 3600000)
  const minutes = Math.floor((ms % 3600000) / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)

  // Pad with leading zeros
  const pad = (num: number, size: number): string => String(num).padStart(size, '0')

  return `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}`
}

/**
 * @example console.log(parseTimeToMilliseconds("34:17:36")); //=> 123456789
 */
function parseTimeToMilliseconds(timeStr: string) {
  // 将时间字符串按冒号分割成小时、分钟、秒
  const [hours, minutes, seconds] = timeStr.split(":").map(Number)

  // 验证输入是否合法
  if (
    isNaN(hours) || isNaN(minutes) || isNaN(seconds) || // 检查是否为数字
    hours < 0 || minutes < 0 || seconds < 0 ||          // 检查是否为非负数
    minutes >= 60 || seconds >= 60                      // 检查分钟和秒是否在合法范围内
  ) {
    throw new Error("Invalid time format. Expected format: 'HH:MM:SS'")
  }

  // 计算总毫秒数
  const totalMilliseconds =
    hours * 3600 * 1000 + // 小时转毫秒
    minutes * 60 * 1000 + // 分钟转毫秒
    seconds * 1000        // 秒转毫秒

  return totalMilliseconds
}
