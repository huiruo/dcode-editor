import React, { useEffect, useMemo, useState } from 'react'
import { useField, useFormikContext } from 'formik'
import { FormItem } from '@/common/componentJson'
import { TreeSelect, message } from 'antd'
import { matchingRealField } from '@/common/utils'
import { AssemblyParam } from '@/types/pageAssemblyTypes'
import area from '@/assets/componentJson/area.json'
import { services } from '@/services/api'
import { useAppSelector } from '@/store/hook'
import { success } from '@/common/constants'
import {
  TreeNodeItem,
  TreeResponse,
  TreeType,
} from '@/services/categoryTree.type'
import {
  generateTargetFormValues,
  isRenderChildField,
  isRenderField,
} from '@/common/generateFormSchema'
import { Result } from '@/services/types'
import { isEmpty } from 'lodash'
import store from '@/store/store'
import { designerActions, shopIdState } from '@/store/designerSlice'

const { TreeNode } = TreeSelect

export const TreeSelectView = (props: FormItem) => {
  const { controlItemParam } = props
  const { requestParam } = controlItemParam
  const shopId = useAppSelector(shopIdState)
  const name = controlItemParam?.id as string
  // HACK:万一没有dataOnlyCode?
  const dataOnlyCode = props?.dataAssemblyParam?.dataOnlyCode || name
  const [, , helpers] = useField(name)
  const formik = useFormikContext<AssemblyParam>()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dataSource, setDataSource] = useState<any[]>([])
  const [treeType, setTreeType] = useState<TreeType>('area')
  const [validMsg, setValidMsg] = useState('')
  const required = controlItemParam?.rules?.required

  const treeValue = useMemo(() => {
    return [controlItemParam?.value].filter((element) => element !== '')
  }, [controlItemParam])

  useEffect(() => {
    if (requestParam) {
      let realField = name
      if (props.dataAssemblyParam) {
        realField = matchingRealField(name)
      }

      if (realField === requestParam?.rules?.dataId) {
        setTreeType('area')
        setDataSource(area.data)
      } else {
        setTreeType('category')
        getTreeData()
      }
    }

    return () => {
      if (controlItemParam?.rules?.required) {
        store.dispatch(
          designerActions.removeOneValidation(dataOnlyCode + realField),
        )
      }
    }
  }, [])

  const getTreeData = async () => {
    const res = (await services.doAnyRequest(requestParam?.url as string, {
      ...requestParam?.options,
      shopId: requestParam?.options?.shopId ? shopId : '',
    })) as unknown as Result<TreeResponse>
    if (res.resultCode === success) {
      setDataSource(res.data?.tree || [])
    }
  }

  const onChange = (newValue: string) => {
    if (props.dataAssemblyParam) {
      // 嵌套组件
      const formValuesName = controlItemParam?.field || 'data'
      const index = controlItemParam?.index
      if (index !== undefined && realField !== '') {
        const newData = generateTargetFormValues(
          formik?.values,
          formValuesName,
          index,
          realField,
          newValue,
        )
        formik.setFieldValue(formValuesName, newData)
      } else {
        message.warning('修改组件失败')
      }
    } else {
      // 普通组件
      helpers.setValue(newValue)
    }
  }

  const renderTreeNodes = (data: TreeNodeItem[]) => {
    return data.map((node) => {
      if (node.children) {
        return (
          <TreeNode
            key={node.node.id}
            title={node.node.name}
            value={node.node.id}
          >
            {renderTreeNodes(node.children)}
          </TreeNode>
        )
      }
      return (
        <TreeNode
          key={node.node.id}
          title={node.node.name}
          value={node.node.id}
        />
      )
    })
  }

  const realField = useMemo(() => {
    return matchingRealField(name)
  }, [name])

  useEffect(() => {
    const mutex = props.mutex
    if (!mutex) {
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
        const value = treeType === 'area' ? controlItemParam?.value : treeValue
        const isEmptyValue = isEmpty(value)
        const errorMessage = `${controlItemParam?.label}不能为空`

        setValidMsg(isEmptyValue ? errorMessage : '')
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

  // console.log('TreeSelectView-render:', {
  //   props,
  //   dataSource,
  //   value: controlItemParam?.value,
  //   treeType,
  //   label: controlItemParam?.label
  // })

  return (
    <div className="form-item">
      <label className={required ? 'form-label fieldRequired' : 'form-label'}>
        {controlItemParam?.label}
      </label>
      <div className="form-content">
        {treeType === 'category' && (
          <TreeSelect
            showSearch
            style={{ width: '100%' }}
            placeholder="请选择"
            multiple={false}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            allowClear
            treeDefaultExpandAll
            treeDefaultExpandedKeys={dataSource.map((node) => node.value)}
            value={treeValue as unknown as string}
            onChange={onChange}
          >
            {renderTreeNodes(dataSource)}
          </TreeSelect>
        )}

        {treeType === 'area' && (
          <TreeSelect
            showSearch
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Please select"
            allowClear
            multiple
            treeDefaultExpandAll
            onChange={onChange}
            value={controlItemParam?.value as string}
            treeData={dataSource}
          />
        )}

        {validMsg && <div className="field-error">{validMsg}</div>}
      </div>
    </div>
  )
}
