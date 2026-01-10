"use client"

import { useState, useEffect, useRef } from "react"

type PollingOptions<T> = {
  fetcher: () => Promise<T>
  isDone: (data: T) => boolean
  interval?: number
  maxAttempts?: number
}

export function usePolling<T>({
  fetcher,
  isDone,
  interval = 2000,
  maxAttempts = 15,
}: PollingOptions<T>) {
  const [data, setData] = useState<T | null>(null)
  const [isPolling, setIsPolling] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [attempts, setAttempts] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const stopPolling = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsPolling(false)
    setAttempts(0)
  }

  const startPolling = async () => {
    setIsPolling(true)
    setError(null)
    setAttempts(0)

    const poll = async () => {
      if (attempts >= maxAttempts) {
        setError(new Error("Polling timed out."))
        stopPolling()
        return
      }

      try {
        const result = await fetcher()
        setData(result)
        setAttempts((prev) => prev + 1)

        if (isDone(result)) {
          stopPolling()
        } else {
          timeoutRef.current = setTimeout(poll, interval)
        }
      } catch (e) {
        setError(e as Error)
        stopPolling()
      }
    }

    await poll()
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return { data, isPolling, error, startPolling, stopPolling }
}