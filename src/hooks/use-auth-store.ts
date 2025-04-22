import { useAppSelector } from "@/store/store-hooks";

export const useAuthStore = () => {
  const user = useAppSelector((state) => state.auth);
  return {
    user: user.user,
    isAuthenticated: user.isAuthenticated,
    tokens: user.tokens,
    openLogin: user.openLogin,
    openRegister: user.openRegister,
  };
};