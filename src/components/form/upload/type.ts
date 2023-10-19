import { FormItem } from '@/common/componentJson'
import { Policy } from '@/services/types'
import { UploadFile } from 'antd'
import { RcFile } from 'antd/es/upload'

export interface UploadViewProps extends FormItem {
  policy: Policy
}

export type ListStyleEnum = 'text' | 'thumb' | 'img' | 'video'

export interface UploadData {
  form: {
    name: string
    success_action_status: string
    key: string
    policy: string
    signature: string
    OSSAccessKeyId: string
  }
  uid: string
  url: string
}

export interface CustomFile extends RcFile {
  key?: string
}
export interface CustomUploadFile extends UploadFile {
  key?: string
}
