import { PageInfoType, PaginationType } from './types'

/* eslint-disable @typescript-eslint/no-explicit-any */
interface SkuType {
  addPriceMax: null | number
  addPriceMin: null | number
  addPriceMode: null | string
  addPriceStatus: null | string
  advanceSale: null | string
  attr: string
  balance: string
  barCode: null | string
  bundleItemList: any[]
  bundles: null | any
  cargoCode: null | string
  cashAmount: null | number
  cashIntegral: null | number
  cashLimit: null | number
  cashType: null | string
  code: string
  costPrice: null | number
  createPerson: null | string
  createTime: null | string
  cspuid: null | string
  discontinuationDate: null | string
  distribution: null | string
  distributionFee: null | string
  effectiveEndTime: null | string
  effectiveStartTime: null | string
  extFields: Record<string, any>
  extension: null | any
  freightTemplateId: null | string
  freightTemplateName: null | string
  grossWeight: null | number
  grossWeightUnit: null | string
  id: string
  ifAvailableOffline: null | string
  instanceId: null | string
  inventoryQuantity: null | number
  itemId: string
  itemMediasList: any[]
  itemPriceList: any[]
  medias: any[]
  name: string
  netWeight: null | number
  netWeightUnit: null | string
  organizationId: null | string
  organizationName: null | string
  outterCode: null | string
  pointsDeductionRespDto: null
  price: number
  safetyStock: null | number
  salePrice: null | number
  sellingQuantity: null | number
  shelfAmount: null | number
  status: null | string
  tenantId: null | string
  unit: string
  updatePerson: null | string
  updateTime: null | string
  volume: null | number
  volumeUnit: null | string
}

export interface Product {
  area: string
  area_code: string
  brand: string
  brandId: null | string
  busType: number
  city: null | string
  city_code: null | string
  createTime: null | string
  dirId: null | string
  dirName: null | string
  district: null | string
  district_code: null | string
  frontDirIdList: string[]
  frontDirNameList: string[]
  id: string
  imgPath: string
  isAfterSale: null | string
  itemCode: string
  itemFrontDirRespDtos: null
  itemId: string
  itemName: string
  itemStatus: number
  itemTotalStorage: string
  maxSellPrice: number
  minSellPrice: number
  province: null | string
  province_code: null | string
  region: null | string
  region_code: null | string
  sellerName: null | string
  shelfType: number
  shipmentWay: number
  shopId: string
  shopName: string
  skus: SkuType[]
  status: number
  type: number
  updateTime: null | string
  version: null | string
  virtualSales: null | string
  year: null | string
}

export interface ProductResult {
  auditFailNum: null | number
  draftNum: null | number
  offShelfNum: number
  onShelfNum: number
  pageInfo: PageInfoType<Product>
  sellOutNum: null | number
  totalNum: number
  updateTime: null | string
  waitAuditNum: null | number
  waitShelfNum: null | number
}

export interface TableList<T> {
  total: number
  pageNum: number
  pageSize: number
  list: T[]
}

export interface GetProductListParams extends PaginationType {
  shopId: string
  status: number
  busType: number
  groupBy: number
}

export interface GetProductLibListParams extends PaginationType {
  bundle: number
}

export interface SelectRowDataFormType {
  id: string
  name: string
  itemId: string
  shopId: string
  jumpUrl: string
  src: string
  children: string
}
