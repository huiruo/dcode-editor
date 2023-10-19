import React, { useEffect, useState } from 'react'
import { Button, Modal, message } from 'antd'
import {
  ModalType,
  ModalTypes,
  ProductType,
  RequestOptions,
  TableParam,
} from './types'
import { FormItem } from '@/common/componentJson'
import { ModalTable } from './Table'
import {
  GetProductListParams,
  TableList,
  Product,
  GetProductLibListParams,
} from '@/services/product.type'
import { PaginationType } from '@/services/types'
import { FilterOperation } from './FilterOperation'
import { AssemblyParam } from '@/types/pageAssemblyTypes'
import { extractIdFromString } from './utils'

interface Props extends FormItem {
  shopId: string
  visible: boolean
  onClose: (modalType: ModalType) => void
  onOkCallback: <T extends Product[]>(
    selectRowData: T,
    selectedRowKeys: React.Key[],
  ) => void
  productType: ProductType
  remoteData: {
    id: string
    children: string
  }[]
}

const modalType = ModalTypes.Product

export const ProductModal = (props: Props) => {
  const {
    visible,
    onClose,
    onOkCallback,
    shopId,
    remoteData = [],
    ...rest
  } = props
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [selectRowData, setSelectRowData] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [afterFilterValues, setAfterFilterValues] = useState({})
  const tableParam = rest.listPage?.tableParam as TableParam
  const requestParam = rest.listPage?.requestParam?.options as RequestOptions
  const panelParam = rest.listPage?.panelParam?.items || ([] as FormItem[])

  const [productList, ] = useState<TableList<Product>>({
    list: [],
    total: 0,
    pageNum: 1,
    pageSize: 10,
  })

  useEffect(() => {
    if (visible) {
      const selectedRowKeys: React.Key[] = []
      remoteData.forEach((item) => {
        const selectedRowKey = extractIdFromString(item.id)
        if (selectedRowKey) {
          selectedRowKeys.push(selectedRowKey)
        }
      })

      setSelectedRowKeys(selectedRowKeys)
    }
  }, [visible])

  const getProductList = async (
    getProductParams: GetProductListParams | GetProductLibListParams,
  ) => {
    setLoading(true)
    console.log('getProductList-->',)
  }

  const afterOpenChange = (open: boolean) => {
    if (open) {
      getProductList({
        ...requestParam,
        shopId: requestParam?.shopId === '' ? '' : shopId,
        pageNum: 1,
        pageSize: 10,
      } as GetProductListParams | GetProductLibListParams)
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
    getProductList({
      ...requestParam,
      shopId: requestParam?.shopId === '' ? '' : shopId,
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize,
      ...afterFilterValues,
    } as GetProductListParams | GetProductLibListParams)
  }

  const filterCallback = (values: AssemblyParam) => {
    setAfterFilterValues(values)
    getProductList({
      ...requestParam,
      shopId: requestParam?.shopId === '' ? '' : shopId,
      pageNum: 1,
      pageSize: 10,
      ...values,
    } as unknown as GetProductListParams)
  }

  const onChangeCallback = (
    selectedRowKeys: React.Key[],
    curSelectedRows: Product[],
  ) => {
    setSelectedRowKeys(Array.from(new Set(selectedRowKeys)))
    setSelectRowData(curSelectedRows)
  }

  return (
    <Modal
      title={props.text}
      open={visible}
      afterOpenChange={afterOpenChange}
      onCancel={onCancel}
      afterClose={() => remove()}
      width="45%"
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
          list={productList.list}
          total={productList.total}
          loading={loading}
          pageNum={productList.pageNum}
          pageSize={productList.pageSize}
          tableParam={tableParam}
          selectedRowKeys={selectedRowKeys}
          tableCallback={tableCallback}
          onChangeCallback={onChangeCallback}
        />
      </div>
    </Modal>
  )
}
