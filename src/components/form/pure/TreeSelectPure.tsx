import React, { useEffect, useState } from 'react'
import { FormItem } from '@/common/componentJson'
import { TreeSelect } from 'antd'
import { useAppSelector } from '@/store/hook'
import { shopIdState } from '@/store/designerSlice'
import { useField, useFormikContext } from 'formik'
import { TreeNodeItem, TreeResponse } from '@/services/categoryTree.type'
import { services } from '@/services/api'
import { Result } from '@/services/types'
import { success } from '@/common/constants'
import { AssemblyParam } from '@/types/pageAssemblyTypes'
const { TreeNode } = TreeSelect

export const TreeSelectPure = (props: FormItem) => {
  const formik = useFormikContext<AssemblyParam>()
  const { controlItemParam } = props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dataSource, setDataSource] = useState<any[]>([])
  const shopId = useAppSelector(shopIdState)
  const name = controlItemParam?.id as string
  const requestParam = controlItemParam?.requestParam
  const reqUrl = controlItemParam?.requestParam?.url
  const [field, , helpers] = useField(name)

  const onChange = (value: string, valStr: string[]) => {
    helpers.setValue(value)
    formik.setFieldValue('categoryName', valStr.length && valStr[0])
  }

  useEffect(() => {
    if (shopId) {
      getTreeData(reqUrl as string, {
        ...requestParam?.options,
        shopId: requestParam?.options?.shopId === '' ? '' : shopId,
      })
    } else {
      getTreeData(controlItemParam?.requestParam?.url2 as string, {})
    }
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getTreeData = async (url: string, options: any) => {
    const res = (await services.doAnyRequest(
      url,
      options,
    )) as unknown as Result<TreeResponse>
    if (res.resultCode === success) {
      setDataSource(res.data?.tree || [])
    }
  }

  const renderTreeNodes = (data: TreeNodeItem[]) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode
            value={item.node.id}
            title={item.node.name}
            key={item.node.id}
          >
            {renderTreeNodes(item.children)}
          </TreeNode>
        )
      }

      return (
        <TreeNode
          value={item.node.id}
          title={item.node.name}
          key={item.node.id}
        />
      )
    })
  }

  // console.log('TreeSelect-render-test', {
  //   controlItemParam: props.controlItemParam,
  //   values,
  // })

  return (
    <div className="form-item">
      <div className="form-label">{controlItemParam?.label}</div>

      <div className="form-content">
        <TreeSelect
          style={{ width: '50%' }}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          {...field}
          showSearch
          placeholder="请选择"
          allowClear
          multiple={false}
          treeDefaultExpandAll
          value={controlItemParam?.value as string}
          onChange={onChange}
        >
          {renderTreeNodes(dataSource)}
        </TreeSelect>
      </div>
    </div>
  )
}
