import React from 'react'
import { useField } from 'formik'
import { FormItem } from '@/common/componentJson'
import { Checkbox, Col, Row } from 'antd'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'

export const CheckBoxView = (props: FormItem) => {
  const { controlItemParam } = props
  const name = controlItemParam?.id as string
  const [field, meta, form] = useField(name)

  const handleChange = (checkedValues: CheckboxValueType[]) => {
    form.setValue(checkedValues)
  }

  return (
    <div className="form-item">
      <div className="form-label">{controlItemParam?.label}</div>
      <div className="form-content radio-icon">
        <Checkbox.Group
          style={{ width: '100%' }}
          {...field}
          onChange={handleChange}
        >
          <Row className="gutter-row">
            {controlItemParam?.data?.map((item, index) => {
              return (
                <Col span={8} key={index} className="checkbox-col">
                  <Checkbox value={item.value}>{item.label}</Checkbox>
                </Col>
              )
            })}
          </Row>
        </Checkbox.Group>
      </div>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  )
}
