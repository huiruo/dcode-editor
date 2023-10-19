import React, { useMemo, useState } from 'react'
import { Product, TableList } from '@/services/product.type'
import { EnumRender, TableParam } from './types'
import { Pagination, Table } from 'antd'
import { MiniPage } from '@/services/miniPage.type'
import { PaginationType } from '@/services/types'
import { Coupon } from '@/services/coupon.type'
import { Activity } from '@/services/activity.type'
import { ColumnType } from 'antd/es/table'
import { CrowdPackType } from '@/services/CrowdPack.type'

interface Props<T> extends TableList<T> {
  selectedRowKeys: React.Key[]
  tableParam: TableParam
  loading: boolean
  tableCallback: (pagination: PaginationType) => void
  onChangeCallback: (selectedRowKeys: React.Key[], selectedRows: T[]) => void
}

interface ColumnGroupType<T> {
  key?: React.Key
  title?: React.ReactNode
  children: Array<ColumnGroupType<T> | ColumnType<T>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any
}

export const ModalTable = <
  T extends Product | MiniPage | Coupon | Activity | CrowdPackType,
>(
  props: Props<T>,
) => {
  const {
    tableParam,
    list,
    total,
    loading,
    selectedRowKeys,
    onChangeCallback,
    tableCallback,
  } = props
  const { rowKey = 'id', rowSelection, columns: originalColumns } = tableParam
  const [, setPageSize] = useState<number>(10)
  const [pageNum, setPageNum] = useState<number>(1)
  const rowSelectionType = rowSelection?.type

  const columns = useMemo(() => {
    const columns: (ColumnGroupType<T> | ColumnType<T>)[] = originalColumns.map(
      (column) => {
        if (column.render) {
          const type = (column?.render as EnumRender)?.type
          if (type === 'enum') {
            const enumValues = column.render.enumValues
            column.render = (value: string) => enumValues[value]
          } else if (type === 'startEndTime') {
            const [startTimeKey, endTimeKey] = column.render?.renderKeys || []
            column.render = (text: string, record: Record<string, string>) => {
              const startTime = record[startTimeKey]
              const endTime = record[endTimeKey]
              return <div className="row-w3">{`${startTime}~${endTime}`}</div>
            }
          }
        }

        return column
      },
    )

    return columns
  }, [originalColumns])

  const onChangePage = (page: number, pageSize: number) => {
    setPageNum(page)
    setPageSize(pageSize)
    tableCallback({
      pageNum: page,
      pageSize: pageSize,
    })
  }

  const onShowSizeChange = (page: number, pageSize: number) => {
    setPageSize(pageSize)
    setPageNum(page)
  }

  const rowSelectionData = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: T[]) => {
      onChangeCallback(selectedRowKeys, selectedRows)
    },
    preserveSelectedRowKeys: true,
  }

  return (
    <div className="modal-table-container">
      <div className="table-container">
        <Table
          rowSelection={{
            type: rowSelectionType,
            ...rowSelectionData,
          }}
          rowKey={rowKey}
          columns={columns}
          dataSource={list}
          pagination={false}
          loading={loading}
        />
      </div>

      <Pagination
        current={pageNum}
        total={total}
        pageSizeOptions={['10', '20', '40']}
        showTotal={(total) => `共${total}条数据`}
        showSizeChanger={true}
        onChange={onChangePage}
        onShowSizeChange={onShowSizeChange}
        className="common-top-mg"
      />
    </div>
  )
}
