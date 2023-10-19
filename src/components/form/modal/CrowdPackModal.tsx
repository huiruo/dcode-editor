import React, { useEffect, useState } from 'react'
import { Button, Modal, message } from 'antd'
import { ModalType, ModalTypes, RequestOptions, TableParam } from './types'
import { FormItem } from '@/common/componentJson'
import { TableList } from '@/services/product.type'
import { PaginationType } from '@/services/types'
import { ModalTable } from './Table'
import { FilterOperation } from './FilterOperation'
import { AssemblyParam } from '@/types/pageAssemblyTypes'
import { extractIdFromString } from './utils'
import {
  CrowdPackType,
  GetCrowdPackListParams,
} from '@/services/CrowdPack.type'

interface Props extends FormItem {
  visible: boolean
  onClose: (modalType: ModalType) => void
  onOkCallback: <T extends CrowdPackType[]>(
    selectRowData: T,
    selectedRowKeys: React.Key[],
  ) => void
  remoteData: {
    id: string
    name: string
  }[]
}

const modalType = ModalTypes.CrowdPack

export const CrowdPackModal = (props: Props) => {
  const { visible, onClose, onOkCallback, remoteData, ...rest } = props
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [loading, ] = useState(false)
  const [selectRowData, setSelectRowData] = useState<CrowdPackType[]>([])
  const [afterFilterValues, setAfterFilterValues] = useState({})
  const tableParam = rest.listPage?.tableParam as TableParam
  const requestParam = rest.listPage?.requestParam?.options as RequestOptions
  const panelParam = rest.listPage?.panelParam?.items || ([] as FormItem[])
  // const requestUrl = rest.listPage?.requestParam?.url as string

  const [CrowdPackList, ] = useState<TableList<CrowdPackType>>({
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

  const getCrowdPackList = async (options: GetCrowdPackListParams) => {
    // TODO
    console.log('get getCrowdPackList==>',)
  }

  const afterOpenChange = (open: boolean) => {
    if (open) {
      getCrowdPackList({
        pageNum: 1,
        pageSize: 10,
        ...requestParam,
      } as GetCrowdPackListParams)
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
    getCrowdPackList({
      ...requestParam,
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize,
      ...afterFilterValues,
    } as GetCrowdPackListParams)
  }

  const filterCallback = (values: AssemblyParam) => {
    setAfterFilterValues(values)
    getCrowdPackList({
      ...requestParam,
      pageNum: 1,
      pageSize: 10,
      ...values,
    } as unknown as GetCrowdPackListParams)
  }

  const onChangeCallback = (
    selectedRowKeys: React.Key[],
    selectedRows: CrowdPackType[],
  ) => {
    setSelectedRowKeys(Array.from(new Set(selectedRowKeys)))
    setSelectRowData(selectedRows)
  }

  // console.log('Product - selectRowData:', selectRowData, { rest, CrowdPackList, })

  return (
    <Modal
      title={props.text}
      open={visible}
      afterOpenChange={afterOpenChange}
      onCancel={onCancel}
      afterClose={() => remove()}
      width="50%"
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
          shopId={''}
        />

        <ModalTable
          list={CrowdPackList.list}
          total={CrowdPackList.total}
          loading={loading}
          pageNum={CrowdPackList.pageNum}
          pageSize={CrowdPackList.pageSize}
          tableParam={tableParam}
          selectedRowKeys={selectedRowKeys}
          tableCallback={tableCallback}
          onChangeCallback={onChangeCallback}
        />
      </div>
    </Modal>
  )
}
