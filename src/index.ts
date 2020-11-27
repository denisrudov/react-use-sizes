import { useEffect, useState } from 'react'

interface useSizesResult {
  windowSize: {
    width: number
    height: number
  }
}

const DEFAULT_WIDTH = 1920
const DEFAULT_HEIGHT = 1080

export const useSizes = (
  initialWidth?: number,
  initialHeight?: number
): useSizesResult => {
  const isSSR: boolean = typeof window === 'undefined'

  const [windowSize, setWindowSize] = useState({
    width: isSSR ? initialWidth || DEFAULT_WIDTH : window.innerWidth,
    height: isSSR ? initialHeight || DEFAULT_HEIGHT : window.innerHeight,
  })

  const onWindowResize = (ev: UIEvent) => {
    const { innerHeight, innerWidth } = window

    setWindowSize({
      width: innerWidth,
      height: innerHeight,
    })
  }

  useEffect(() => {
    if (!isSSR) {
      window.addEventListener('resize', onWindowResize, false)

      return () => window.removeEventListener('resize', onWindowResize, false)
    }
  }, [isSSR])

  return {
    windowSize,
  }
}
