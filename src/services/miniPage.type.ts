import { PaginationType } from './types'

export interface GetMiniPageListParams extends PaginationType {
  shopId: string
  type: string
}

export interface MiniPage {
  areaCode: string
  areaName: string
  content: string
  createTime: string
  descr: string
  id: string
  name: string
  regionCode: string
  regionName: string
  shopId: string
  shopName: string
  status: number
  title: string
  type: string
  updatePerson: string
  updateTime: string
}
