import { GoodsInfo } from '@/types/editorType'
import { PageInfo } from '@/types/pageAssemblyTypes'
import {
  GetProductLibListParams,
  GetProductListParams,
  ProductResult,
} from './product.type'
import { GetMiniPageListParams, MiniPage } from './miniPage.type'
import { Coupon, GetCouponParams, GetCouponTemplateParams } from './coupon.type'
import { GetCategoryTreeParams, TreeResponse } from './categoryTree.type'
import {
  ActivityInfo,
  Activity,
  ActivityListOptions,
  GetActivityOptions,
} from './activity.type'
import {
  CrowdPackType,
  FilterCrowdPacksParams,
  GetCrowdPackListParams,
} from './CrowdPack.type'
import { UserFormValues } from '@/pages/login'

export interface SubmitTemplateParamsType {
  name: string
  img: string
  descr: string
  status: number
  pageText: string
}

export interface GetTemplateParamsType {
  pageNum?: number
  pageSize?: number
  pageEngineId?: string | number
  status: number
}

// export interface SubmitParamsType extends SubmitTemplateParamsType {
export interface SubmitParamsType extends SubmitTemplateParamsType {
  id: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export interface ApiConfig {
  register: string
  login: string
  savePage: string
  getPage: string
}
export interface Options {
  [key: string]: string | boolean | object
}

export interface ResultNew<T> {
  code: number
  msg: string
  data: T
}

export interface Result<T> {
  resultCode: string
  resultMsg: string
  data: T
}

export interface PaginationType {
  pageNum?: number
  pageSize?: number
}

export interface PageInfoType<T> {
  endRow: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  isFirstPage: boolean
  isLastPage: boolean
  list: T[]
  navigateFirstPage: number
  navigateLastPage: number
  navigatePages: number
  navigatepageNums: null | number[]
  nextPage: number
  pageNum: number
  pageSize: number
  pages: number
  prePage: number
  size: number
  startRow: number
  total: number
}

export interface FetchPageType {
  pageId: string
  shopId: string
  isTemp?: boolean
}

export interface GetPageOptions {
  pageId: string
  isTemp?: boolean
}
export interface ReqParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: GetGoodsOptions & GetPageOptions & any
}

export interface GetGoodsOptions extends PaginationType {
  shopId?: string
  isFilterLocal?: number
  dirIds?: number | string
  status?: number
  itemIds?: string
  activityId?: string
}

export interface MemberLevel {
  bufferBeforeDays: null
  bufferDays: null
  bufferEnable: number
  bufferMoney: null
  code: string
  createPerson: string
  createTime: string
  extFields: null | object
  extension: string
  id: string
  imageUrl: string
  instanceId: string
  levelType: number
  memberModelId: number
  minGrowthValue: number
  minGrowthValueBigDecimal: number
  name: string
  remark: string
  status: number
  tenantId: number
  updatePerson: string
  updateTime: string
}

export interface Policy {
  accessid: string
  policy: string
  signature: string
  dir: string
  host: string
  expire: string
  cdnHost: string | null
  extProperty: string
}

export interface TemplateType {
  descr: string
  id: string
  img: string
  name: string
  host: string
  organizationId?: string | undefined
  organizationName: string | null
  pageEngineId: number
  pageText: string
  shopId: string | null
  status: number
  isShowQrCode?: boolean
}

export type AppKey = {
  digitalMall: string
  memberPlatform: string
}

export interface Api {
  registerApi: (options: UserFormValues) => Promise<ResultNew<null>>
  loginApi: (options: UserFormValues) => Promise<ResultNew<null>>
  savePage: (options: SubmitParamsType) => Promise<ResultNew<null>>
  getPage: (options: GetPageOptions) => Promise<ResultNew<PageInfo>>
  doAnyRequest: (
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promise<Result<any>>
}
