import React, { useEffect, useMemo, useState } from 'react'
import { Select, message } from 'antd'
import { useField, useFormikContext } from 'formik'
import { FormItem } from '@/common/componentJson'
import { AssemblyParam } from '@/types/pageAssemblyTypes'
import { matchingRealField } from '@/common/utils'
import {
  generateTargetFormValues,
  isRenderChildField,
  isRenderField,
} from '@/common/generateFormSchema'
import store from '@/store/store'
import { designerActions } from '@/store/designerSlice'
import { isEmpty } from 'lodash'
import { services } from '@/services/api'
import { success } from '@/common/constants'
import { MemberLevel, Result } from '@/services/types'

export const SelectView = (props: FormItem) => {
  const formik = useFormikContext<AssemblyParam>()
  const { controlItemParam } = props
  const [validMsg, setValidMsg] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dataSource, setDataSource] = useState<any[]>([])
  const name = controlItemParam?.id as string
  // HACK:万一没有dataOnlyCode?
  const dataOnlyCode = props?.dataAssemblyParam?.dataOnlyCode || name
  const [field, , helpers] = useField(name)
  const mode = controlItemParam?.inputParam?.mode as
    | 'multiple'
    | 'tags'
    | undefined

  const required = controlItemParam?.rules?.required

  const handleSelect = (val: string) => {
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

  const getAnyOptionsData = async (realField: string) => {
    const { requestParam } = controlItemParam
    const res = (await services.doAnyRequest(
      requestParam?.url as string,
      requestParam?.options,
    )) as unknown as Result<MemberLevel[]>
    if (res.resultCode === success) {
      // 等级
      if (realField === 'level') {
        setDataSource(
          res.data.map((item) => ({
            ...item,
            label: item.name,
            value: item.name,
          })) || [],
        )
      }

      // 人群包
      /*
      if (realField === 'crowdPack') {
        setDataSource(res.data.map((item) => ({
            ...item,
            label: item.name,
            value: item.name,
          })) || [],
        )
      }
      */
    }
  }

  const options = useMemo(() => {
    return controlItemParam?.requestParam
      ? dataSource
      : controlItemParam?.data || []
  }, [controlItemParam, dataSource])

  const realField = useMemo(() => {
    return matchingRealField(name)
  }, [name])

  useEffect(() => {
    if (controlItemParam?.requestParam) {
      getAnyOptionsData(realField)
    }

    if (!props.mutex) {
      return
    }

    if (controlItemParam?.rules?.required) {
      let needValid = false
      if (props.dataAssemblyParam) {
        needValid = isRenderChildField(
          props,
          formik.values,
          name,
          props?.controlItemParam?.index as number,
        )
      } else {
        needValid = isRenderField(props, formik.values, name)
      }

      if (needValid) {
        const { value, label } = controlItemParam || {}
        const isEmptyValue = isEmpty(value)

        setValidMsg(isEmptyValue ? `${label}不能为空` : '')
        store.dispatch(
          designerActions.setFormikValidation({
            [dataOnlyCode + realField]: !isEmptyValue,
          }),
        )
      }
    }
  }, [formik.values])

  useEffect(() => {
    return () => {
      if (controlItemParam?.rules?.required) {
        store.dispatch(
          designerActions.removeOneValidation(dataOnlyCode + realField),
        )
      }
    }
  }, [])

  // if (controlItemParam?.label === '会员等级') {
  //   console.log('SelectView-render:', controlItemParam?.label, '---', {
  //     props,
  //     values: formik.values,
  //     value: controlItemParam?.value,
  //     options,
  //     validMsg
  //   })
  // }

  return (
    <div className="form-item">
      <label className={required ? 'form-label fieldRequired' : 'form-label'}>
        {controlItemParam?.label}
      </label>

      <div className="form-content">
        <Select
          {...field}
          style={{ width: 224 }}
          onChange={handleSelect}
          options={options}
          value={controlItemParam?.value as string}
          mode={mode}
        />

        {validMsg && <div className="field-error">{validMsg}</div>}
      </div>
    </div>
  )
}
