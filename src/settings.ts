export interface FrontMatterSettings {
  propNames: string[]
  useCreated: boolean
  applyCreatedToExisting: boolean
  useUpdated: boolean
  propNameCreated: string
  propNameUpdated: string
  dateFormat: string
  useFocused: boolean
  propNameFocused: string
}

export const DEFAULT_SETTINGS: FrontMatterSettings = {
  propNames: [],
  useCreated: true,
  applyCreatedToExisting: false,
  useUpdated: true,
  propNameCreated: 'created',
  propNameUpdated: 'updated',
  dateFormat: 'yyyy-MM-dd hh:mm:ss',
  useFocused: false,
  propNameFocused: 'focused'
}
