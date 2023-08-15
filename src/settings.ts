export interface FrontMatterSettings {
  propNameCreated: string
  propNameUpdated: string
  dateFormat: string
}

export const DEFAULT_SETTINGS: FrontMatterSettings = {
  propNameCreated: 'created',
  propNameUpdated: 'updated',
  dateFormat: 'yyyy-MM-dd hh:mm:ss',
}
