import { create } from 'zustand'

const useStore = create((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
  register: (user) => set({ user }),
  updateUser: (user) => set((state) => ({ user: { ...state.user, ...user } })),
}))

export default useStore
