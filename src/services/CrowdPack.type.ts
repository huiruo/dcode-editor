import { PaginationType } from './types'

export interface GetCrowdPackListParams extends PaginationType {
  type: string
}

export interface CrowdPackType {
  coveredNum: number
  createTime: string
  extFields: Record<string, unknown>
  groupType: number
  id: string
  lastUpdateTime: string
  lastUpdateTimeNum: number
  name: string
  pkgType: number
  remoteGroupId: string
  splitFlag: number
  status: number
  syncStatus: number
  updatePerson: string
  updateTime: string
}

export interface FilterCrowdPacksParams {
  code: string
  ids: string[]
}
