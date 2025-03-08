import { editor } from "typora"
import type FrontMatterPlugin from "src/main"


export function useTimeStamp(plugin: FrontMatterPlugin) {
  const { settings } = plugin

  function tryToAddCreatedTime() {
    if (settings.get('useCreated')) {
      editor.docMenu.writeProperty(
        settings.get('propNameCreated'),
        nowDatetime(settings.get('dateFormat'))
      )
    }
  }

  function tryToAddUpdatedTime() {
    if (settings.get('useCreated')) {
      editor.docMenu.writeProperty(
        settings.get('propNameUpdated'),
        nowDatetime(settings.get('dateFormat'))
      )
    }
  }

  return { tryToAddCreatedTime, tryToAddUpdatedTime }
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
