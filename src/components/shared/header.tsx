import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useTheme } from "../theme-provider"
import { NAV_LINKS } from "@/constants/yit"
import ThemeSwitch from "../theme-switch"
import { useEffect, useState } from "react"

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
  const bgColor = theme === 'dark' ? 'bg-slate-900/95' : 'bg-white/95'
  const textColor = theme === 'dark' ? 'text-white' : 'text-slate-900'
  const hoverColor = theme === 'dark' ? 'hover:text-green-400' : 'hover:text-green-600'

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300  ${bgColor} backdrop-blur ${isScrolled ? 'bg-slate-900/95 shadow-md' : 'bg-slate-900'}`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="mr-4 flex">
          <Link to="/" className={`flex items-center font-bold text-lg ${textColor}`}>
            <span className="text-green-500">YIT</span> Agency
          </Link>
        </div>
        
        <nav className="flex items-center gap-6 text-sm ml-auto">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors ${textColor} ${hoverColor}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 ml-6">
          <ThemeSwitch />
          <Button variant="outline" size="sm" className={textColor}>
            Sign In
          </Button>
          <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
            Register
          </Button>
        </div>
      </div>
    </header>
  )
}