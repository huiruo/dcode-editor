import React from 'react'
import { InputNumber, message } from 'antd'
import { useField, useFormikContext } from 'formik'
import { FormItem } from '@/common/componentJson'
import { AssemblyParam } from '@/types/pageAssemblyTypes'
import { matchingRealField, numberRep } from '@/common/utils'
import { generateTargetFormValues } from '@/common/generateFormSchema'

interface Props extends FormItem {
  validMsg: string
}

export const NumberView = (props: Props) => {
  const formik = useFormikContext<AssemblyParam>()
  const { controlItemParam, validMsg } = props
  const name = controlItemParam?.id as string
  const [field, , helpers] = useField(name)

  const required = controlItemParam?.rules?.required

  const handleChange = (value: number | null) => {
    if (value === undefined || value === null) {
      return ''
    }

    const roundedValue = Math.round(value * 100) / 100
    if (props.dataAssemblyParam) {
      const formValuesName = controlItemParam?.field || 'data'
      const index = controlItemParam?.index
      const realField = matchingRealField(name)
      if (index !== undefined && realField !== '') {
        const newData = generateTargetFormValues(
          formik?.values,
          formValuesName,
          index,
          realField,
          roundedValue,
        )

        formik.setFieldValue(formValuesName, newData)
      } else {
        message.warning('修改组件失败')
      }
    } else {
      helpers.setValue(roundedValue)
    }
  }

  return (
    <div className="form-item">
      <label className={required ? 'form-label fieldRequired' : 'form-label'}>
        {controlItemParam?.label}
      </label>

      <div className="form-content">
        <InputNumber
          {...field}
          onChange={handleChange}
          onBlur={() => helpers.setTouched(true)}
          max={controlItemParam?.max}
          min={controlItemParam?.min}
          style={{ width: 'auto' }}
          formatter={(value) => numberRep(value)}
          value={controlItemParam?.value as number}
          placeholder={controlItemParam?.placeholder}
          className={`normal-w1 ${validMsg ? 'status-error' : ''}`}
        />

        {validMsg && <div className="field-error">{validMsg}</div>}
      </div>
    </div>
  )
}
