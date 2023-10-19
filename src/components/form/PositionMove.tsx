import React, { useMemo } from 'react'
import { FormItem } from '@/common/componentJson'
import { Button, message } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { throttle } from 'lodash'
import { useFormikContext } from 'formik'
import { AssemblyParam, DataAssemblyParam } from '@/types/pageAssemblyTypes'

export const PositionMove = (props: FormItem) => {
  const { controlItemParam } = props
  const name = controlItemParam?.id as string
  const formValuesName = controlItemParam?.field || 'data'
  const formik = useFormikContext<AssemblyParam>()

  const onMoveUp = throttle(
    () => {
      moveUtil(2)
    },
    500,
    { trailing: false },
  )

  const onMoveDown = throttle(
    () => {
      moveUtil(1)
    },
    500,
    { trailing: false },
  )

  const targetValues = useMemo<DataAssemblyParam[]>(() => {
    return (formik?.values[formValuesName] as DataAssemblyParam[]) || []
  }, [formValuesName, formik?.values])

  const moveUtil = (type: 1 | 2) => {
    if (props.dataAssemblyParam) {
      const index = controlItemParam?.index
      const realField = name
      if (type === 2 && index === 0) {
        message.warning('该图片已经在顶部', 1)
        return
      }

      if (type === 1 && index === targetValues.length - 1) {
        message.warning('该图片已经在底部', 1)
        return
      }

      if (index !== undefined && realField !== '') {
        const newTargetValues = [...targetValues]
        if (type === 2) {
          [newTargetValues[index - 1], newTargetValues[index]] = [
            newTargetValues[index],
            newTargetValues[index - 1],
          ]
        } else if (type === 1) {
          [newTargetValues[index], newTargetValues[index + 1]] = [
            newTargetValues[index + 1],
            newTargetValues[index],
          ]
        }

        formik.setFieldValue(formValuesName, newTargetValues)
      } else {
        message.warning('修改组件失败')
      }
    } else {
      message.warning('修改组件失败')
    }
  }

  return (
    <div className="position-move">
      {targetValues.length > 1 && (
        <div className="operate-btn">
          <Button
            className="common-right-mg4"
            shape="circle"
            icon={<UpOutlined />}
            onClick={onMoveUp}
          />
          <Button shape="circle" icon={<DownOutlined />} onClick={onMoveDown} />
        </div>
      )}
    </div>
  )
}
