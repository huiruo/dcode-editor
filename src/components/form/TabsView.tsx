import React, { useCallback, useEffect, useState } from 'react'
import { FormItem } from '@/common/componentJson'
import { useFormikContext } from 'formik'
import { AssemblyParam } from '@/types/pageAssemblyTypes'
import { Tabs } from 'antd'
import { cloneDeep } from 'lodash'
import { DynamicFormProvider } from '@/designer/rightPanel/DynamicFormProvider'

export const TabsView = (props: FormItem) => {
  const formik = useFormikContext<AssemblyParam>()
  const { values } = formik
  const formItems = props?.formItems || []
  const [tabsSource, setTabsSource] = useState<FormItem[]>([])
  const [tabsFormMap, setTabsFormMap] = useState<Map<string, FormItem>>()

  useEffect(() => {
    const template = formItems.filter((item) => {
      return item.type !== 'Proliferation'
    })

    // const template = formItems

    const tabs: FormItem[] = []
    const tabsFormMap: Map<string, FormItem> = new Map()

    formItems.forEach((item) => {
      if (item.type !== 'dataList') {
        tabs.push(item)
        if (template.length) {
          tabsFormMap.set(item.id, {
            ...template[0],
            dataId: item.id,
          })
        }
      }
    })
    setTabsSource(tabs)
    setTabsFormMap(tabsFormMap)
  }, [formItems])

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

      return DynamicFormProvider.of(newFormItem)
    },
    [],
  )

  // console.log('TabsView:', { props,tabsSource,values, tabsFormMap,formItems })

  return (
    <div className="panel-content">
      <Tabs
        defaultActiveKey="data1"
        items={tabsSource.map((item) => {
          const childForm = tabsFormMap?.get(item.id)

          return {
            label: item.text,
            key: item.id,
            children: (
              <>
                {renderItem(item, values, item.id)}
                {childForm && renderItem(childForm, values, item.id)}
              </>
            ),
          }
        })}
      ></Tabs>
    </div>
  )
}
