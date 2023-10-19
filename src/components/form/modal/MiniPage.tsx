import React, { useEffect, useState } from 'react'
import { Button, Modal, message } from 'antd'
import { ModalType, ModalTypes, RequestOptions, TableParam } from './types'
import { FormItem } from '@/common/componentJson'
import { GetMiniPageListParams, MiniPage } from '@/services/miniPage.type'
import { TableList } from '@/services/product.type'
import { PaginationType } from '@/services/types'
import { ModalTable } from './Table'
import { FilterOperation } from './FilterOperation'
import { AssemblyParam } from '@/types/pageAssemblyTypes'
import { extractIdFromString } from './utils'

interface Props extends FormItem {
  visible: boolean
  shopId: string
  onClose: (modalType: ModalType) => void
  onOkCallback: <T extends MiniPage[]>(
    selectRowData: T,
    selectedRowKeys: React.Key[],
  ) => void
  remoteData: {
    id: string
    children: string
  }[]
}

const modalType = ModalTypes.MiniPage

export const MiniPageModal = (props: Props) => {
  const { visible, onClose, onOkCallback, shopId, remoteData, ...rest } = props
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [loading, ] = useState(false)
  const [selectRowData, setSelectRowData] = useState<MiniPage[]>([])
  const [afterFilterValues, setAfterFilterValues] = useState({})
  const tableParam = rest.listPage?.tableParam as TableParam
  const requestParam = rest.listPage?.requestParam?.options as RequestOptions
  const panelParam = rest.listPage?.panelParam?.items || ([] as FormItem[])

  const [miniPageList, ] = useState<TableList<MiniPage>>({
    list: [],
    total: 0,
    pageNum: 1,
    pageSize: 10,
  })

  useEffect(() => {
    if (visible) {
      const selectedRowKeys: React.Key[] = []
      remoteData.forEach((item) => {
        const selectedRowKey = extractIdFromString(item.id, 'pageId')
        if (selectedRowKey) {
          selectedRowKeys.push(selectedRowKey)
        }
      })

      setSelectedRowKeys(selectedRowKeys)
    }
  }, [visible])

  const getMiniPageList = async (options: GetMiniPageListParams) => {
    console.log('getMiniPageList-->',)
  }

  const afterOpenChange = (open: boolean) => {
    if (open) {
      getMiniPageList({
        shopId,
        pageNum: 1,
        pageSize: 10,
        ...requestParam,
      } as GetMiniPageListParams)
    }
  }

  const onCancel = () => {
    onClose(modalType)
  }

  const remove = () => {
    setSelectedRowKeys([])
    setSelectRowData([])
  }

  const handleOk = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请选择一条数据')
      return
    }
    onClose(modalType)
    onOkCallback(selectRowData, selectedRowKeys)
  }

  const tableCallback = (pagination: PaginationType) => {
    getMiniPageList({
      ...requestParam,
      shopId,
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize,
      ...afterFilterValues,
    } as GetMiniPageListParams)
  }

  const filterCallback = (values: AssemblyParam) => {
    setAfterFilterValues(values)
    getMiniPageList({
      ...requestParam,
      pageNum: 1,
      pageSize: 10,
      shopId,
      ...values,
    } as unknown as GetMiniPageListParams)
  }

  const onChangeCallback = (
    selectedRowKeys: React.Key[],
    selectedRows: MiniPage[],
  ) => {
    setSelectedRowKeys(Array.from(new Set(selectedRowKeys)))
    setSelectRowData(selectedRows)
  }

  // console.log('Product - selectRowData:', selectRowData, { rest, miniPageList, })

  return (
    <Modal
      title={props.text}
      open={visible}
      afterOpenChange={afterOpenChange}
      onCancel={onCancel}
      afterClose={() => remove()}
      width="42%"
      destroyOnClose={true}
      footer={[
        <Button key="back" onClick={onCancel}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          确定
        </Button>,
      ]}
    >
      <div className="modal-container">
        <FilterOperation
          panelParam={panelParam}
          filterCallback={filterCallback}
          shopId={shopId}
        />

        <ModalTable
          list={miniPageList.list}
          total={miniPageList.total}
          loading={loading}
          pageNum={miniPageList.pageNum}
          pageSize={miniPageList.pageSize}
          tableParam={tableParam}
          selectedRowKeys={selectedRowKeys}
          tableCallback={tableCallback}
          onChangeCallback={onChangeCallback}
        />
      </div>
    </Modal>
  )
}
