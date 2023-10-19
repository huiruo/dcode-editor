import React from 'react'
import { DynamicFormItemType } from '@/types/formSchemaTypes'
import { FormItem } from '@/common/componentJson'
import { InputView } from '@/components/form/InputView'
import { NumberView } from '@/components/form/NumberView'
import { SwitchView } from '@/components/form/SwitchView'
import { ColorPickerView } from '@/components/form/ColorPickerView'
import { RadioView } from '@/components/form/RadioView'
import { DataListView } from '@/components/form/DataListView'
import { SelectView } from '@/components/form/SelectView'
import { CheckBoxView } from '@/components/form/CheckBoxView'
import { AddFormView } from '@/components/form/AddFormView'
import { ProliferationView } from '@/components/form/ProliferationView'
import { RemoteView } from '@/components/form/modal/RemoteView'
import { ActivityNoticeView } from '@/components/form/ActivityNotice'
import { TreeSelectView } from '@/components/form/TreeSelectView'
import { UploadOss } from '@/components/form/upload/UploadOss'
import { NestedComponent } from '@/components/form/NestedComponent'
import { GridView } from '@/components/form/GridView'
import { TabsView } from '@/components/form/TabsView'
import { PositionMove } from '@/components/form/PositionMove'
import { PureTabsView } from '@/components/form/PureTabsView'
import { ColumnsView } from '@/components/form/ColumnsView'
import { MemberModeView } from '@/components/form/MemberModeView'

export class DynamicFormProvider {
  static of(formItem: FormItem, validMsg = '') {
    switch (formItem.type) {
      case DynamicFormItemType.ColorPicker:
        return <ColorPickerView {...formItem} />

      case DynamicFormItemType.Number:
        return <NumberView {...formItem} validMsg={validMsg} />

      case DynamicFormItemType.String:
        return <InputView {...formItem} validMsg={validMsg} />

      case DynamicFormItemType.Proliferation:
        return <ProliferationView {...formItem} />

      case DynamicFormItemType.AddForm:
        return <AddFormView {...formItem} />

      case DynamicFormItemType.Radio:
        return <RadioView {...formItem} validMsg={validMsg} />

      case DynamicFormItemType.Remote:
        return <RemoteView {...formItem} />

      case DynamicFormItemType.Select:
        return <SelectView {...formItem} />

      case DynamicFormItemType.Switch:
        return <SwitchView {...formItem} />

      case DynamicFormItemType.TreeSelect:
        return <TreeSelectView {...formItem} />

      case DynamicFormItemType.Upload:
        return <UploadOss formItem={formItem} />

      case DynamicFormItemType.DataList:
        return <DataListView {...formItem} assemblyDataKey={formItem.dataId} />

      case DynamicFormItemType.TabList:
        return <DataListView {...formItem} assemblyDataKey="tabList" />

      case DynamicFormItemType.FormTabs:
        return <TabsView {...formItem} />

      case DynamicFormItemType.PureFormTabs:
        return <PureTabsView {...formItem} />

      case DynamicFormItemType.Columns:
        return <ColumnsView {...formItem} />

      case DynamicFormItemType.MemberMode:
        return <MemberModeView {...formItem} />

      case DynamicFormItemType.NestedComponent:
        return <NestedComponent {...formItem} />

      case DynamicFormItemType.ActivityNotice:
        return (
          <ActivityNoticeView {...formItem} assemblyDataKey="activityNotice" />
        )

      case DynamicFormItemType.Checkbox:
        return <CheckBoxView {...formItem} />

      case DynamicFormItemType.Grid:
        return <GridView {...formItem} />

      case DynamicFormItemType.PositionMove:
        return <PositionMove {...formItem} />

      default:
        console.log('DynamicFormProvider-->:未知组件', formItem.type)
        return <div>未知组件:{formItem.type}</div>
    }
  }
}
