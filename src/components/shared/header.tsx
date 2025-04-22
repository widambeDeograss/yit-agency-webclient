import { Button } from "@/components/ui/button"
import { Link, useLocation } from "react-router-dom"
import { useTheme } from "../theme-provider"
import { NAV_LINKS } from "@/constants/yit"
import ThemeSwitch from "../theme-switch"
import { useEffect, useState } from "react"
import { useAuthStore } from "@/hooks/use-auth-store"
import { User, Menu, X } from "lucide-react"

const Logo = ({ tet = false }: { tet: boolean }) => (
  <div className="flex items-center relative">
    <div className="w-28 h-20 sm:w-32 sm:h-24 absolute -mt-6 top-0">
      {tet ? (
        <img
          src="/logos/tet2.png"
          alt="logo"
          className="bg-primary rounded-b-xl shadow-lg overflow-hidden py-3.5"
        />
      ) : (
        <img
          src="/logos/yit.jpeg"
          alt="logo"
          className="bg-background rounded-b-xl shadow-lg overflow-hidden"
        />
      )}
    </div>
  </div>
)

interface HeaderProps {
  open: () => void;
  openLogin: () => void;
}

export function Header(auth: HeaderProps) {
  const { theme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const { isAuthenticated, user } = useAuthStore()
  const path = useLocation().pathname
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "shadow-md bg-background/95" : "bg-background"
      } backdrop-blur`}
    >
      <div className="container mx-auto px-4  flex items-center justify-between">
        <div className="mr-4 flex items-center">
          <Logo tet={path?.includes("tet")} />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm ml-auto py-4">
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

        {/* Right Side Actions */}
        <div className="hidden md:flex items-center gap-2 ml-6">
          <ThemeSwitch />
          {isAuthenticated ? (
            <Link to="/profile">
              <Button variant="outline" className="hidden sm:flex items-center gap-2">
                <User className="h-4 w-4" />
                {user?.username}
              </Button>
            </Link>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                className="text-foreground"
                onClick={auth.openLogin}
              >
                Sign In
              </Button>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={auth.open}
              >
                Register
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden ml-auto">
        <div className="flex flex-wrap gap-2 mt-4">
            <ThemeSwitch />
            {isAuthenticated ? (
              <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {user?.username}
                </Button>
              </Link>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    auth.openLogin()
                    setMobileMenuOpen(false)
                  }}
                >
                  Sign In
                </Button>
                <Button
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => {
                    auth.open()
                    setMobileMenuOpen(false)
                  }}
                >
                  Register
                </Button>
              </>
            )}
                <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          <nav className="flex flex-col gap-2 text-sm">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block py-2 px-2 rounded hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
