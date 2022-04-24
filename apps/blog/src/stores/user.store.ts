import create from 'zustand'

export interface UserStore {
  userId: string | null
  setUserId(userId: string | null): void
}

export const useUserStore = create<UserStore>((set) => ({
  userId: null,
  setUserId(userId: string | null) {
    set({ userId })
  },
}))
