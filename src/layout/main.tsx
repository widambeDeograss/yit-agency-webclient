import Footer from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import { AuthModal } from "@/pages/auth/auth-view";
import { useState } from "react";
import { Outlet } from "react-router-dom";



const Main = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const handleAuthOpen = () => {
    setIsAuthOpen(true);
  };
  const handleAuthClose = () => {
    setIsAuthOpen(false);
  };
  return (
    <div>
      <Header  open={handleAuthOpen}/>

      <Outlet />

      <Footer/>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={handleAuthClose}
      />
    </div>
  );
};

export default Main;
