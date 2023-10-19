import React, { useEffect, useState } from 'react'
import { calculateTime, toSeconds } from '@/common/utils'

interface Props {
  color?: string
  background?: string
  size?: string
  day?: string | number
  hours?: string | number
  minutes?: string | number
  seconds?: string | number
  /**是否是显示天 */
  isShowDay?: boolean
  onTimeUp?: () => void
}

export const CountDownView = (props: Props) => {
  const {
    color,
    background,
    size,
    day,
    hours,
    minutes,
    seconds,
    isShowDay,
    onTimeUp,
  } = props

  const [instate, setInstate] = useState({
    _day: day,
    _hours: hours,
    _minutes: minutes,
    _seconds: seconds,
  })

  let newSeconds = toSeconds(day, hours, minutes, seconds)

  let timer: string | number | NodeJS.Timeout | undefined = undefined

  /**
   * 定时器
   */
  const setTimer = () => {
    if (!timer) countdown()
  }

  /**
   * 清除定时器
   */
  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer)
      timer = undefined
    }
  }

  const countdown = () => {
    const { day, hours, minutes, seconds } = calculateTime(
      newSeconds,
      isShowDay,
    )

    setInstate({
      _day: day,
      _hours: hours,
      _minutes: minutes,
      _seconds: seconds,
    })

    newSeconds--
    if (newSeconds < 0) {
      clearTimer()
      onTimeUp && onTimeUp()
      return
    }
    timer = setTimeout(() => {
      countdown()
    }, 1000)
  }

  useEffect(() => {
    clearTimer()
    newSeconds && setTimer()
  }, [newSeconds])

  useEffect(() => {
    return () => {
      clearTimer()
    }
  }, [])

  const { _day, _hours, _minutes, _seconds } = instate

  return (
    <div className="countdown">
      <div className="countdown" style={{ color: color }}>
        {Number(_day) > 0 && (
          <div
            className={`countdown-item countdown-size_${size}`}
            style={{ background: background }}
          >
            {_day}天
          </div>
        )}
        {Number(_day) > 0 && (
          <div className="countdown-item-icon" style={{ color: background }}>
            :
          </div>
        )}
        <div
          className={`countdown-item countdown-size_${size}`}
          style={{ background: background }}
        >
          {_hours === 0 ? '00' : _hours}
        </div>
        <div className="countdown-item-icon" style={{ color: background }}>
          :
        </div>
        <div
          className={`countdown-item countdown-size_${size}`}
          style={{ background: background }}
        >
          {_minutes === 0 ? '00' : _minutes}
        </div>
        <div className="countdown-item-icon" style={{ color: background }}>
          :
        </div>
        <div
          className={`countdown-item countdown-size_${size}`}
          style={{ background: background }}
        >
          {_seconds === 0 ? '00' : _seconds}
        </div>
      </div>
    </div>
  )
}
