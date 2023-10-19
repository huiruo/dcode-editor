import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { FormItem } from '@/common/componentJson'
import { useField, useFormikContext } from 'formik'
import { AssemblyParam } from '@/types/pageAssemblyTypes'
import { Tabs } from 'antd'
import { cloneDeep } from 'lodash'
import { DynamicFormProvider } from '@/designer/rightPanel/DynamicFormProvider'
import { isRenderField } from '@/common/generateFormSchema'

export const PureTabsView = (props: FormItem) => {
  const formik = useFormikContext<AssemblyParam>()
  const { values } = formik
  const formItems = props?.formItems || []
  const [tabsSource, setTabsSource] = useState<FormItem[]>([])
  const [tabsFormMap, setTabsFormMap] = useState<Map<string, FormItem[]>>()
  const { controlItemParam } = props
  const name = controlItemParam?.id as string
  const [, , helpers] = useField(name)

  useEffect(() => {
    const tabs: FormItem[] = []
    const tabsFormMap: Map<string, FormItem[]> = new Map()

    formItems.forEach((item) => {
      if (item.type === 'tab') {
        tabs.push(...(item?.formItems || []))
      } else {
        tabsFormMap.set(item.templateId as string, item.formItems as [])
      }
    })

    setTabsSource(tabs)
    setTabsFormMap(tabsFormMap)
  }, [formItems])

  const onChangeTabs = (activeKey: string) => {
    helpers.setValue(activeKey)
  }

  const renderItem = useCallback(
    (formItem: FormItem, values: AssemblyParam, dataId: string) => {
      const newFormItem = cloneDeep(formItem) as FormItem
      let fieldId = formItem.controlItemParam?.id as string
      if (formItem.controlItemParam?.id) {
        newFormItem.controlItemParam.value = values[fieldId]
        newFormItem.dataId = dataId
      } else {
        fieldId = formItem.id as string
        newFormItem.dataId = dataId
      }

      if (!isRenderField(newFormItem, values, fieldId)) {
        return null
      }

      return DynamicFormProvider.of(newFormItem)
    },
    [],
  )

  // console.log('TabsView:', { props,tabsSource,values, tabsFormMap,formItems })

  return (
    <div className="panel-content">
      <Tabs
        defaultActiveKey="user"
        onChange={onChangeTabs}
        items={tabsSource.map((item) => {
          const childForms = tabsFormMap?.get(item.id)

          return {
            label: item.text,
            key: item.id,
            children: (
              <>
                {childForms?.map((cell) => {
                  return (
                    <Fragment key={cell.dataId}>
                      {renderItem(cell, values, cell.dataId)}
                    </Fragment>
                  )
                })}
              </>
            ),
          }
        })}
      />
    </div>
  )
}
