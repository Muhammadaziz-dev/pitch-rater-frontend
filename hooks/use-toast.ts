// This hook is a placeholder. In a real app, you'd use a library
// like react-hot-toast or sonner to show toast notifications.
// We'll keep this simple for now.
"use client"

import { useState, useCallback } from "react"

interface Toast {
  id: number
  title: string
  description?: string
  variant?: "default" | "destructive"
}

let toastId = 0

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback(
    ({ title, description, variant }: Omit<Toast, "id">) => {
      const newToast = { id: toastId++, title, description, variant }
      setToasts((prev) => [newToast, ...prev])

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id))
      }, 5000)
    },
    []
  )

  return { toasts, toast }
}