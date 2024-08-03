export interface FrontMatterSettings {
  propNames: string[]
  useCreated: boolean
  useUpdated: boolean
  propNameCreated: string
  propNameUpdated: string
  dateFormat: string
}

export const DEFAULT_SETTINGS: FrontMatterSettings = {
  propNames: [],
  useCreated: true,
  useUpdated: true,
  propNameCreated: 'created',
  propNameUpdated: 'updated',
  dateFormat: 'yyyy-MM-dd hh:mm:ss',
}
