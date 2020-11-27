import * as React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { useSizes } from '../index'

describe('hook', () => {
  it('should give default value', async () => {
    const {
      result: {
        current: {
          windowSize: { height, width },
        },
      },
    } = renderHook(() => useSizes())

    expect(height).not.toBeUndefined()
    expect(width).not.toBeUndefined()
  })

  it('should get window size value', async () => {
    window = Object.assign(window, { innerWidth: 105, innerHeight: 100 })

    const {
      result: {
        current: {
          windowSize: { height, width },
        },
      },
    } = renderHook(() => useSizes())

    expect(height).toEqual(100)
    expect(width).toEqual(105)
  })
})
