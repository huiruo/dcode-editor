import React from 'react'
import { InputNumber } from 'antd'
import { FormItem } from '@/common/componentJson'
import { useField } from 'formik'
import { numberRep } from '@/common/utils'

export const NumberPure = (props: FormItem) => {
  const { controlItemParam } = props
  const name = controlItemParam?.id as string
  const [field, , helpers] = useField(name)

  const handleChange = (value: number | null) => {
    const targetValue = value === null ? 0 : value
    helpers.setValue(targetValue)
  }

  return (
    <div className="form-item">
      <div className="form-label">{controlItemParam?.label}</div>
      <div className="form-content">
        <InputNumber
          {...field}
          onChange={handleChange}
          max={controlItemParam?.max}
          min={controlItemParam?.min}
          style={{ width: 'auto' }}
          formatter={(value) => numberRep(value)}
          value={controlItemParam?.value as number | null | undefined}
          placeholder={controlItemParam?.placeholder}
        />
      </div>
    </div>
  )
}
