import { create } from 'zustand';
import Cookies from 'js-cookie';

interface AuthState {
  isLoggedIn: boolean;
  username: string | null;
  login: (username: string) => void;
  logout: () => void;
  updateUsername: (username: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: !!Cookies.get('isLoggedIn'),
  username: Cookies.get('username') || null,
  login: (username: string) => {
    Cookies.set('isLoggedIn', 'true');
    Cookies.set('username', username);
    set({ isLoggedIn: true, username });
  },
  logout: () => {
    Cookies.remove('isLoggedIn');
    Cookies.remove('username');
    set({ isLoggedIn: false, username: null });
  },
  updateUsername: (username: string) => {
    Cookies.set('username', username);
    set({ username });
  },
}));
