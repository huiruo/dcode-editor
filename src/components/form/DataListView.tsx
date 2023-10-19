import React from 'react'
import { Space } from 'antd'
import { FormItem } from '@/common/componentJson'
import { useFormikContext } from 'formik'
import { AssemblyParam, DataAssemblyParam } from '@/types/pageAssemblyTypes'
import { ChildrenForm } from '@/designer/rightPanel/ChildrenForm'
import '@/styles/advertising.less'

interface DataListViewProps extends FormItem {
  assemblyDataKey?: string
}

export const DataListView = (props: DataListViewProps) => {
  const formik = useFormikContext<AssemblyParam>()
  const { assemblyDataKey = 'data' } = props
  const { values } = formik
  const data: DataAssemblyParam[] = values?.[assemblyDataKey] || []

  const formActionCallback = (index: number) => {
    const newData = data.filter((_, i) => i !== index)
    formik.setFieldValue(assemblyDataKey, newData)
  }

  // console.log('DynamicFormItemType.DataList-0:',assemblyDataKey,{data, props, values})

  return (
    <div className="panel-content">
      <Space direction="vertical" className="panel-card" size={16}>
        {data.length > 0 &&
          data.map((item, index) => {
            return (
              <div key={item.dataOnlyCode || item?.imgUrl}>
                <ChildrenForm
                  index={index}
                  assemblyDataKey={assemblyDataKey}
                  childrenFormItem={props}
                  // HACK: 这种方式赋值，但是没改dataAssemblyParam的值，这样会有问题,所以对于旧数据处理不应该这样处理
                  // dataAssemblyParam={{...values?.childrenDefaultVal,...item}}
                  dataAssemblyParam={item}
                  values={values}
                  formActionCallback={formActionCallback}
                />
              </div>
            )
          })}
      </Space>
    </div>
  )
}
