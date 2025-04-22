import Footer from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import { useAuthStore } from "@/hooks/use-auth-store";
import { AuthLoginModal } from "@/pages/auth/auth-login-view";
import { AuthModal } from "@/pages/auth/auth-view";
import { SetOpenLogin } from "@/store/slices/auth/auth.slice";
import { useAppDispatch } from "@/store/store-hooks";
import { useState } from "react";
import { Outlet } from "react-router-dom";



const Main = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoginAuthOpen, setIsLoginAuthOpen] = useState(false);
  const {openLogin} = useAuthStore();
  const dispatch = useAppDispatch();
  const handleAuthOpen = () => {
    setIsAuthOpen(true);
  };
  const handleAuthClose = () => {
    setIsAuthOpen(false);
  };

  const handleCloseLogin = () => {
  dispatch(SetOpenLogin(false));
  };

  
  return (
    <div>
      <Header  open={handleAuthOpen} openLogin={() =>  setIsLoginAuthOpen(true)}/>

      <Outlet />

      <Footer/>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={handleAuthClose}
      />

      <AuthLoginModal 
        isOpen={openLogin} 
        onClose={() => handleCloseLogin() }
      />
    </div>
  );
};

export default Main;
