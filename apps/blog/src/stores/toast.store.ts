import create from 'zustand'

interface ToastData {
  description?: string
  title: string
}

export interface ToastStore {
  open: boolean
  handleChange(open: boolean): void
  toast(toastData: ToastData): void
  toastData: ToastData
}

export const useToastStore = create<ToastStore>((set) => ({
  open: false,
  handleChange: (open) => set({ open }),
  toast: (toastData) =>
    set((state) => {
      if (state.open) return {} as ToastStore

      return { open: true, toastData }
    }),
  toastData: {
    title: '',
  },
}))
