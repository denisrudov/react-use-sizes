import { useEffect, useState } from 'react'


interface useSizesResult {
    windowSize: {
        width: number,
        height: number
    }
}

export const useSizes = (): useSizesResult => {
    const isSSR: boolean = (typeof window === 'undefined')

    const [windowSize, setWindowSize] = useState({
        width: isSSR ? 1080 : window.innerWidth,
        height: isSSR ? 800 : window.innerHeight,
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