import React, { useMemo } from 'react'
// import defaultImg from '@/assets/default-img.png'
import '@/styles/advertising.less'
import { AssemblyParam } from '@/types/pageAssemblyTypes'
import { getTemplate } from '@/common/template'
import { Grid, Image } from 'antd-mobile'
import { px2rem } from '@/common/utils'
import { isEmpty } from 'lodash'

interface Props {
  /**列数 */
  columns: number
  /**间距 */
  gap: number
  // /**排列方式 后面要用到 */
  type: string
  /**数据源 */
  assemblyParam: AssemblyParam
}

export const GridView = (props: Props) => {
  const { assemblyParam, columns, gap, type } = props
  const { padding } = assemblyParam
  const style = {
    padding: `0  ${px2rem(Number(padding))}`,
  }

  const newModuleItem = useMemo(() => {
    const moduleItem = getTemplate(assemblyParam, columns)
    if (type === 'rightTwo') {
      return moduleItem.filter((item, index) => (index + 1) % 3 !== 0)
    } else {
      return moduleItem
    }
  }, [assemblyParam, columns, type])

  return (
    <div style={style}>
      <Grid columns={columns} gap={gap}>
        {newModuleItem?.length > 0 &&
          newModuleItem.map((item, index) => {
            return (
              <Grid.Item
                key={index}
                span={(item.param && item.param.span) || 2}
                style={{
                  height: px2rem(
                    (!isEmpty(item.param) &&
                      item.param.styleTypeParam.height) ||
                      187.5,
                  ),
                }}
              >
                {!isEmpty(item.param) && (
                  <div className="img-box">
                    <Image
                      style={{
                        borderRadius: px2rem(
                          item.param.styleTypeParam.borderRadius,
                        ),
                      }}
                      height={'100%'}
                      src={item.param.styleTypeParam.src}
                      width={'100%'}
                      fit="fill"
                    />
                  </div>
                )}
                {item.children &&
                  item.children.map((itx, inx) => {
                    return (
                      <Grid.Item
                        key={inx}
                        span={itx.span}
                        style={{
                          height: px2rem(itx.styleTypeParam.height),
                        }}
                      >
                        <div className="img-box">
                          <Image
                            style={{
                              borderRadius: px2rem(
                                itx.styleTypeParam.borderRadius,
                              ),
                            }}
                            height={'100%'}
                            src={itx.styleTypeParam.src}
                            width={'100%'}
                            fit="fill"
                          />
                        </div>
                      </Grid.Item>
                    )
                  })}
              </Grid.Item>
            )
          })}
      </Grid>
    </div>
  )
}
