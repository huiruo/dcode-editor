import React, { Fragment, useCallback } from 'react'
import { Card } from 'antd'
import { FormItem } from '@/common/componentJson'
import { useFormikContext } from 'formik'
import { AssemblyParam } from '@/types/pageAssemblyTypes'
import { DynamicFormProvider } from '@/designer/rightPanel/DynamicFormProvider'
import '@/styles/advertising.less'
import { isRenderField } from '@/common/generateFormSchema'
import { cloneDeep } from 'lodash'

interface ActivityNoticeProps extends FormItem {
  assemblyDataKey: string
}

export const ActivityNoticeView = (props: ActivityNoticeProps) => {
  const formik = useFormikContext<AssemblyParam>()
  const { formItems = [] } = props
  const { values } = formik
  // const data: DataAssemblyParam[] = values?.[assemblyDataKey] || []

  const renderItem = useCallback(
    (formItem: FormItem, values: AssemblyParam) => {
      // TODO:clone
      const newFormItem = cloneDeep(formItem) as FormItem
      let fieldId = formItem.controlItemParam?.id as string
      /** 普通组件/特殊组件 */
      if (fieldId) {
        newFormItem.controlItemParam.value = values[fieldId]
      } else {
        fieldId = formItem.id as string
      }

      if (!isRenderField(newFormItem, values, fieldId)) {
        return null
      }

      return DynamicFormProvider.of(newFormItem)
    },
    [],
  )

  return (
    <div className="activity-notice-container">
      <Card>
        {formItems.map((item, index) => {
          return <Fragment key={index}>{renderItem(item, values)}</Fragment>
        })}
      </Card>
    </div>
  )
}
