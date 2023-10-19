/* eslint-disable no-unused-vars */
import { FormItem } from '@/common/componentJson'

export type ModalType =
  | 'product'
  | 'list'
  | 'miniPage'
  | 'coupon'
  | 'coupons'
  | 'custormModule'
  | 'activity'
  | 'activity2'
  | 'fullPresentActivity'
  | 'fullReductionActivity'
  | 'fullReductionActivity2'
  | 'fullPresentActivity2'
  | 'crowdPack'

export type ProductType = 'productLib' | 'product'

export enum ModalTypes {
  Product = 'product',
  ProductList = 'list',
  MiniPage = 'miniPage',
  Coupon = 'coupon',
  Coupons = 'coupons',
  CustormModule = 'custormModule',
  Activity = 'activity',
  Activity2 = 'activity2',
  FullPresentActivity = 'fullPresentActivity',
  FullReductionActivity = 'fullReductionActivity',
  FullReductionActivity2 = 'fullReductionActivity2',
  FullPresentActivity2 = 'fullPresentActivity2',
  CrowdPack = 'crowdPack',
}

export interface JsonUrLRequestParam {
  url: string
  options: RequestOptions
}

export interface RequestOptions {
  [key: string]: string | number
}

interface RowSelection {
  type: 'radio' | 'checkbox'
}

export interface ColumnType {
  dataIndex: string
  title: string
  render?: RenderFunction | EnumRender | StartEndTimeRender
}

interface StartEndTimeRender {
  type: 'startEndTime'
  renderKeys: [string, string]
}

export interface EnumRender {
  type: 'enum' | 'startEndTime'
  enumValues: Record<string, string>
  renderKeys: string[]
}

export type RenderFunction = (
  text: string,
  record: Record<string, string>,
) => JSX.Element

export interface TableParam {
  rowKey: string
  rowSelection?: RowSelection
  columns: ColumnType[]
}

export interface ListPage {
  requestParam: JsonUrLRequestParam
  panelParam: PanelParam
  tableParam: TableParam
}

export interface PanelParam {
  items: FormItem[]
}

export interface RemoteData {
  name: string
  field: string
  id: string
  children?: string
}

export interface MiniPageForm {
  id: string
  value: string
  code: string
  newUrl: string
  children: string
  text: string
  name?: string
  itemId?: string
  shopId?: string
  jumpUrl?: string
  src?: string
}

export interface CouponForm {
  id: string
  couponName: string
  couponValue: number
  couponCategory: number
  tag: string
  activityId: string
  text: string
}

export interface SelectValue {
  id: string
  value: string
}
