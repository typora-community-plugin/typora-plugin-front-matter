export interface FrontMatterSettings {
  useCreated: boolean
  useUpdated: boolean
  propNameCreated: string
  propNameUpdated: string
  dateFormat: string
}

export const DEFAULT_SETTINGS: FrontMatterSettings = {
  useCreated: true,
  useUpdated: true,
  propNameCreated: 'created',
  propNameUpdated: 'updated',
  dateFormat: 'yyyy-MM-dd hh:mm:ss',
}
