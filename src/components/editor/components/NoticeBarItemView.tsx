import React, { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import { AssemblyParam } from '@/types/pageAssemblyTypes'

interface Props {
  assemblyParam: AssemblyParam
  /**滚动速度 */
  speed?: number
}

let timeout: NodeJS.Timeout | null = null
const animElemId = `J_${Math.ceil(Math.random() * 10e5).toString(36)}`

export const NoticeBarItemView = (props: Props) => {
  const { speed = 10, assemblyParam } = props
  const [duration, setDuration] = useState(15)
  const { direction, marquee, color, fontSize, text } = assemblyParam

  useEffect(() => {
    if (!timeout || marquee) {
      initAnimation()
    }
  }, [timeout, marquee])

  /**
   * 设置滚动整度
   */
  const initAnimation = () => {
    timeout = setTimeout(() => {
      timeout = null
      const elem = document.querySelector(`.${animElemId}`)
      if (!elem) return
      const { width } = elem.getBoundingClientRect()

      let distance = 0

      if (direction === 'left' || direction === 'right') {
        distance = width
      } else {
        distance = speed * 5
      }

      const duration = distance / +speed
      setDuration(duration)
    }, 100)
  }

  /**
   * 动画函数
   */
  const innerClassName = useMemo(() => {
    const animationClassName = ['at-noticeBar__content-inner']
    if (marquee) {
      animationClassName.push(animElemId)
      direction && animationClassName.push(direction)
    }
    return animationClassName
  }, [direction, marquee])

  return (
    <div
      className={classNames(['at-noticeBar'], 'at-noticeBar-wrap', {
        'at-noticeBar--marquee': marquee,
      })}
    >
      <div className="at-noticeBar__content">
        <div className="at-noticeBar__content-text">
          <div
            className={classNames(innerClassName)}
            style={{ animationDuration: `${duration}s` }}
          >
            <span style={{ color: color, fontSize: `${fontSize}px` }}>
              {text}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
