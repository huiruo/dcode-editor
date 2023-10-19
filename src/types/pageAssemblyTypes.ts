import { DragItemViewType } from './dragItemViewType'
import {
  CouponsItem,
  DragZoomType,
  ProductItem,
  customModuleType,
} from './editorType'

export interface BaseComponentType {
  id: DragItemViewType | string
  iconType: string
  title: string
}

export interface PageInfo extends PageInfoPure {
  pageText: string
}

export interface PageInfoPure {
  appCode: null
  bizData: null
  createPerson: string
  createTime: string
  descr: string
  engineRespDto: null
  extFields: Record<string, unknown>
  extension: null
  id: string
  shopId: string
  pageId: string
  img: string
  instanceId: string
  name: string
  pageEngineId: string
  pageParamDtos: null
  projectId: null
  status: number
  tenantId: number
  title: string
  updatePerson: string
  updateTime: string
}

export interface AssemblyInfo {
  id: string
  iconType: string
  title: string
  // TODO: onlyCode 原有数据只有number
  onlyCode: number | string
}

/** 嵌套组件的对象值 */
export interface DataAssemblyParam {
  imgUrl: string[]
  areaShow?: boolean
  levelShow?: boolean
  linkType?: string
  page?: string
  id: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export interface TabListType {
  title?: string
  way?: 'category' | 'custom'
  categoryName?: string
  /**商品列表数据 */
  list?: ProductItem[]
  apiList?: ProductItem[]
  categoryId?: string
  number?: number
  custormModule?: customModuleType[]
  miniPage?: customModuleType[]
}

export type ChildrenDefaultVal = {
  [key: string]: string | number | boolean
}

export interface AssemblyParam {
  height?: number
  autoplay?: boolean
  data?: DataAssemblyParam[]
  childrenDefaultVal?: ChildrenDefaultVal
  tabList?: TabListType[]
  noTab?: TabListType
  padding?: number
  /**是否圆角 */
  isRound?: boolean
  mode?: string
  onlyCode: string | number
  /**背景颜色 */
  bgColor?: string
  /**文本颜色 */
  textColor?: string
  /**是否置顶 */
  isTop?: boolean
  /**框体颜色 */
  boxColor?: string
  /**搜索提示 */
  placeholder?: string
  /**复选框属性 */
  showKeys?: string[]
  /**排列方式
   * vertical-竖排
   * verticalSlide-竖排横滑
   * horizontal-横排
   */
  rowType?: string
  /**购物车或立即购买 */
  buyType?: string
  /**颜色填充 */
  colorBg?: string
  /**文字未选中 */
  unActiveColor?: string
  /**文字选中 */
  activeColor?: string
  /**页签背景 1 颜色填充 2 背景填充 */
  bgType?: number
  /**背景图片 */
  imgBg?: string[]
  /**券集合 */
  coupons?: CouponsItem[]
  /** 背景是否覆盖顶部*/
  containTop?: boolean
  /**背景图片 */
  bgImg?: string[]
  Radios?: string
  way?: 'custom' | 'category'
  /**是否开启悬浮窗 */
  isOpenTheTool?: boolean
  /**上传图标 */
  toolIcon?: string[]
  /**上传图标 */
  scrollTopIcon?: string[]
  /**回到顶部 */
  isOpenScrollTop?: boolean
  /**链接类型 */
  linkType?: string
  color?: string
  /**logo */
  imgUrl?: string
  /**公告栏滚动方向*/
  direction?: string
  /**字体大小 */
  fontSize?: string
  /**是否滚动 */
  marquee?: boolean
  /**公告内容 */
  text?: string
  /**悬浮 固定 */
  isFixed?: boolean
  /**按钮大小 */
  btnSize?: number
  /**热区 */
  dragZoomData?: DragZoomType[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export interface Assembly {
  assemblyInfo: AssemblyInfo
  assemblyParam: AssemblyParam
}
