import React, { useEffect, useMemo, useState } from 'react'
import { Radio, message } from 'antd'
import { useField, useFormikContext } from 'formik'
import { FormItem } from '@/common/componentJson'
import { AssemblyParam } from '@/types/pageAssemblyTypes'
import { matchingRealField } from '@/common/utils'
import { generateTargetFormValues } from '@/common/generateFormSchema'

interface MemberLevel {
  label: string
  value: string
}

export const MemberModeView = (props: FormItem) => {
  const formik = useFormikContext<AssemblyParam>()
  const { controlItemParam } = props
  const [dataSource, setDataSource] = useState<MemberLevel[]>([])
  const name = controlItemParam?.id as string
  // HACK:万一没有dataOnlyCode?
  // const dataOnlyCode = props?.dataAssemblyParam?.dataOnlyCode || name
  const [, , helpers] = useField(name)

  const getMemberLevelByPage = async () => {
    setDataSource([{
      label: '潜客',
      value: 'QIANKE_T0',
    }])
  }

  const realField = useMemo(() => {
    return matchingRealField(name)
  }, [name])

  const onSetMemberMode = (val: string) => {
    if (props.dataAssemblyParam) {
      const formValuesName = controlItemParam?.field || 'data'
      const index = controlItemParam?.index
      if (index !== undefined && realField !== '') {
        const newData = generateTargetFormValues(
          formik?.values,
          formValuesName,
          index,
          realField,
          val,
        )
        formik.setFieldValue(formValuesName, newData)
      } else {
        message.warning('修改组件失败')
      }
    } else {
      // 普通组件
      helpers.setValue(val)
    }
  }

  useEffect(() => {
    getMemberLevelByPage()
  }, [])

  // console.log('MemberModeView-render:', { dataSource, props },props.controlItemParam.value)

  return (
    <div className="form-item">
      <div className="tp-flex">
        <Radio.Group
          value={props.controlItemParam.value}
          onChange={(e) => onSetMemberMode(e.target.value)}
        >
          {dataSource.map((item) => {
            return (
              <Radio.Button value={item.value} key={item.value}>
                {item.label}
              </Radio.Button>
            )
          })}
        </Radio.Group>
      </div>
    </div>
  )
}
