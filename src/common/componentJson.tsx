import DcodeAdvertising from '@/assets/componentJson/DcodeAdvertising.json'
import DcodeBanner from '@/assets/componentJson/DcodeBanner.json'
import DcodeLocation from '@/assets/componentJson/DcodeLocation.json'
import DcodeCoupons from '@/assets/componentJson/DcodeCoupons.json'
import DcodeDesignCustorm from '@/assets/componentJson/DcodeDesignCustorm.json'
import DcodeDiscountTime from '@/assets/componentJson/DcodeDiscountTime.json'
import DcodeExchange from '@/assets/componentJson/DcodeExchange.json'
import DcodeGrid from '@/assets/componentJson/DcodeGrid.json'
import DcodeMember from '@/assets/componentJson/DcodeMember.json'
import DcodeHotZone from '@/assets/componentJson/DcodeHotZone.json'
import DcodeLevitationTool from '@/assets/componentJson/DcodeLevitationTool.json'
import DcodeLiveStreaming from '@/assets/componentJson/DcodeLiveStreaming.json'
import DcodeNoticeBar from '@/assets/componentJson/DcodeNoticeBar.json'
import DcodeOrderActive from '@/assets/componentJson/DcodeOrderActive.json'
import DcodePaddingLine from '@/assets/componentJson/DcodePaddingLine.json'
import DcodePointsMerchandise from '@/assets/componentJson/DcodePointsMerchandise.json'
import DcodeProdRecomPro from '@/assets/componentJson/DcodeProdRecomPro.json'
import DcodeSearchBar from '@/assets/componentJson/DcodeSearchBar.json'
import DcodeSecondsKill from '@/assets/componentJson/DcodeSecondsKill.json'
import DcodeShareBtn from '@/assets/componentJson/DcodeShareBtn.json'
import DcodeSpellGroup from '@/assets/componentJson/DcodeSpellGroup.json'
import DcodeWeCom from '@/assets/componentJson/DcodeWeCom.json'
import DcodePages from '@/assets/componentJson/DcodePages.json'
import { ListPage } from '@/components/form/modal/types'
import { DataAssemblyParam } from '@/types/pageAssemblyTypes'

export interface Child {
  type: string
  templateId: string
  isChildren?: boolean
  parentLabel: string
  label: string
  activeType: string
  id: string
  popup: boolean
  maxCount: number
  popupParam: {
    popupType: string
  }
  controlItemParam: ControlItemParam
  mapValue: {
    [key: string]: string
  }
}

export interface FormItem {
  type: string
  isChildren?: boolean
  templateId?: string
  id: string
  itemKey: string
  dataId: string
  activeType?: 'link' | 'data'
  schemaItemIndex: number
  mutex?: { ids: string[]; rules?: boolean }
  // TODO:加`?`是为了兼容 children 里面的属性
  controlItemParam: ControlItemParam
  dataAssemblyParam?: DataAssemblyParam
  data?: DataItem[]
  dataSource?: DataItem[]
  formItems?: FormItem[]
  text?: string
  label?: string
  mapValue?: {
    [key: string]: string
  }
  textParam?: {
    controlType: 'String' | 'Img'
  }
  maxCount?: number
  listPage?: ListPage
}

/** 和FormItem同级，参考DcodeAdvertising.json children */
export interface ChildrenFormItem {
  templateId: string
  parentLabel?: string
  label?: string
  activeType?: 'link' | 'data'
  id?: string
  popup?: boolean
  maxCount?: number
  popupParam?: {
    popupType: string
  }
  isChildren?: boolean
}

export interface Resource {
  templateId: string
  noSymbol: boolean
  formItems: FormItem[]
  children: Child[]
  // 兼容children的type
  type?: string
}

interface DataItem {
  label: string
  value: boolean | string
  src: string
  srcSelected: string
}

interface Rules {
  max?: number
  required?: boolean
}

export interface ControlItemParam {
  label: string
  id: string
  dataOnlyCode?: string
  mapValue?: {
    [key: string]: string
  }
  defaultValue?: number | string
  placeholder?: string
  value?: number | string | string[]
  data?: DataItem[]
  type?: string
  submitType?: 'array' | 'string'
  AccessToken?: string
  url?: string
  styleParam?: StyleParam
  extra?: string
  limit?: number
  max?: number
  min?: number
  inputParam?: {
    mode: string
  }
  rules?: Rules
  // index,field用于子组件修改data数据用,例如：src/components/form/SelectView.tsx
  field?: string
  index?: number
  requestParam?: RequestParam
}

export interface RequestParam {
  url: string
  url2?: string
  rules: {
    dataId: string
    willReqValue: string | boolean
  }
  // TODO:any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any
}

interface StyleParam {
  size: string
}

export type JsonRes = {
  params: {
    templateId: string
    label: string
    mode: string
    id: string
  }[]
  resources: Resource[]
}

type ResponseData = {
  resultCode: number
  resultMsg: string
  data: JsonRes
}

// TODO: json请求没定义类型，太多了
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComponentJson = Record<string, ResponseData | any>

export const componentJson: ComponentJson = {
  DcodeAdvertising,
  DcodeBanner,
  DcodeCoupons,
  DcodeDesignCustorm,
  DcodeDiscountTime,
  DcodeExchange,
  DcodeGrid,
  DcodeMember,
  DcodeHotZone,
  DcodeLevitationTool,
  DcodeLiveStreaming,
  DcodeLocation,
  DcodeNoticeBar,
  DcodeOrderActive,
  DcodePaddingLine,
  DcodePointsMerchandise,
  DcodeProdRecomPro,
  DcodeSearchBar,
  DcodeSecondsKill,
  DcodeShareBtn,
  DcodeSpellGroup,
  DcodeWeCom,
  DcodePages,
}
