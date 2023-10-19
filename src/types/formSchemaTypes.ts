import { Child, FormItem } from '@/common/componentJson'
import { AssemblyParam, ChildrenDefaultVal } from '@/types/pageAssemblyTypes'

/* eslint-disable no-unused-vars */
export enum DynamicFormItemType {
  ColorPicker = 'ColorPicker',
  DataList = 'dataList',
  Number = 'Number',
  Proliferation = 'Proliferation',
  Radio = 'Radio',
  Remote = 'Remote',
  Select = 'Select',
  String = 'String',
  Switch = 'Switch',
  TreeSelect = 'TreeSelect',
  Upload = 'Upload',
  Checkbox = 'Checkbox',
  Grid = 'grid',
  TabList = 'tabList',
  AddForm = 'form',
  FormTabs = 'formTabs',
  PureFormTabs = 'pureFormTabs',
  Columns = 'Columns',
  MemberMode = 'MemberMode',
  ActivityNotice = 'ActivityNotice',
  NestedComponent = 'NestedComponent',
  TextArea = 'textArea',
  PositionMove = 'PositionMove',
}

export interface FormSchema extends FormItem {
  /* 用extends FormItem替代;如果整合数据结构就需要重新设计
  type: string;
  controlItemParam?: ControlItemParam;
  templateId: string;
  data?: DataItem[];
  isChildren?: boolean;
  */

  /** 以下兼容children 里面的属性 */
  parentLabel?: string
  label?: string
  popup?: boolean
  maxCount?: number
  popupParam?: {
    popupType?: string
    // 更多属性可以在此添加
  }
  buttonStyle?: string
  inline?: boolean
  defaultValue?: boolean | string

  /** 以下兼容DynamicFormItem 里面的属性 */
  children?: Child[]
  formItems?: FormItem[]
  noSymbol?: boolean
}

export interface FormValues {
  [key: string]: string | number | boolean | ChildrenDefaultVal
}

export interface FormJson {
  formSchema: FormSchema[]
  defaultValues: AssemblyParam
}
