import React from 'react'
import { DynamicFormItemType } from '@/types/formSchemaTypes'
import { FormItem } from '@/common/componentJson'
import { InputPure } from '@/components/form/pure/InputPure'
import { NumberPure } from '@/components/form/pure/NumberPure'
import { RadioPure } from '@/components/form/pure/RadioPure'
import { RemotePure } from '@/components/form/pure/RemotePure'
import { TreeSelectPure } from '@/components/form/pure/TreeSelectPure'
import { TextAreaPure } from '@/components/form/pure/TextAreaPure'
import { UploadOss } from '@/components/form/upload/UploadOss'

export class DynamicFormProviderPure {
  static of(formItem: FormItem, validMsg: string) {
    switch (formItem.type) {
      case DynamicFormItemType.ColorPicker:
        return <div>{formItem.type}</div>

      case DynamicFormItemType.Number:
        return <NumberPure {...formItem} />

      case DynamicFormItemType.Proliferation:
        return <div>{formItem.type}</div>

      case DynamicFormItemType.AddForm:
        return <div>{formItem.type}</div>

      case DynamicFormItemType.Radio:
        return <RadioPure {...formItem} />

      case DynamicFormItemType.Remote:
        return <RemotePure {...formItem} />

      case DynamicFormItemType.Select:
        return <div>{DynamicFormItemType.Select}</div>

      case DynamicFormItemType.String:
        return <InputPure {...formItem} validMsg={validMsg} />

      case DynamicFormItemType.TextArea:
        return <TextAreaPure {...formItem} />

      case DynamicFormItemType.Switch:
        return <div>{formItem.type}</div>

      case DynamicFormItemType.TreeSelect:
        return <TreeSelectPure {...formItem} />

      case DynamicFormItemType.Upload:
        return <UploadOss formItem={formItem} />

      case DynamicFormItemType.DataList:
        return <div>{formItem.type}</div>

      case DynamicFormItemType.TabList:
        return <div>{formItem.type}</div>

      case DynamicFormItemType.NestedComponent:
        return <div>{formItem.type}</div>

      case DynamicFormItemType.ActivityNotice:
        return <div>{formItem.type}</div>

      case DynamicFormItemType.Checkbox:
        return <div>{formItem.type}</div>

      default:
        console.log('DynamicFormProvider-->:未知组件', formItem.type)
        return <div>未知组件:{formItem.type}</div>
    }
  }
}
