import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useTheme } from "../theme-provider"
import { NAV_LINKS } from "@/constants/yit"
import ThemeSwitch from "../theme-switch"
import { useEffect, useState } from "react"

const Logo = () => (
  <div className="flex items-center relative">
    <div className="w-32 h-24 absolute -mt-8 top-0">
      <img src="/logos/yit.jpeg" alt="logo" className="bg-white rounded-b-xl shadow-lg overflow-hidden" />
    </div>
  </div>
);

export function Header() {
  const { theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? 'shadow-md bg-background/95' 
        : 'bg-background'
    } backdrop-blur`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="mr-4 flex">
          <Logo />
        </div>
        
        <nav className="flex items-center gap-6 text-sm ml-auto">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="transition-colors text-foreground hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 ml-6">
          <ThemeSwitch />
          <Button variant="outline" size="sm" className="text-foreground">
            Sign In
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Register
          </Button>
        </div>
      </div>
    </header>
  )
}