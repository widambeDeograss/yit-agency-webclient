import { Button } from "@/components/ui/button"
import { Link, useLocation } from "react-router-dom"
import { useTheme } from "../theme-provider"
import { NAV_LINKS } from "@/constants/yit"
import ThemeSwitch from "../theme-switch"
import { useEffect, useState } from "react"
import { useAuthStore } from "@/hooks/use-auth-store"
import { User, Menu, X } from "lucide-react"
import { useAppDispatch } from "@/store/store-hooks"
import { SetOpenLogin } from "@/store/slices/auth/auth.slice"

const Logo = ({ tet = false }: { tet: boolean }) => (
  <div className="flex items-center">
    <div className="w-28 ">
      {tet ? (
        <img
          src="/logos/tet2.png"
          alt="logo"
          className="bg-primary rounded-b-xl shadow-lg overflow-hidden py-2"
        />
      ) : (
        <img
          src="/logos/yitpreview.png"
          alt="logo"
          className="bg-primary rounded-b-xl shadow-lg overflow-hidden"
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
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useAppDispatch();

  // Check if the current path matches the nav link
  const isActiveLink = (path: string) => {
    if (path === "/" && location.pathname === "/") return true
    if (path !== "/" && location.pathname.startsWith(path)) return true
    return false
  }

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

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "shadow-md bg-background/95" : "bg-background"
      } backdrop-blur`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="mr-4 flex items-center">
          <Link to="/">
            <Logo tet={location.pathname?.includes("tet")} />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm ml-auto py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors hover:text-primary ${
                isActiveLink(link.path) 
                  ? "text-primary font-medium" 
                  : "text-foreground"
              }`}
              aria-current={isActiveLink(link.path) ? "page" : undefined}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Side Actions - Desktop */}
        <div className="hidden md:flex items-center gap-3 ml-6">
          <ThemeSwitch />
          {isAuthenticated ? (
            <Link to="/profile">
              <Button variant="outline" className="flex items-center gap-2">
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
                onClick={() => {
                  dispatch(SetOpenLogin(true))
                }
                }
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

        {/* Mobile Menu Controls */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeSwitch />
          {isAuthenticated ? (
            <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" size="sm" className="flex items-center gap-1 py-1 px-2">
                <User className="h-3 w-3" />
                <span className="text-xs truncate max-w-24">{user?.username}</span>
              </Button>
            </Link>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="text-foreground"
              onClick={() => {
                auth.openLogin();
                setMobileMenuOpen(false);
              }}
            >
              Sign In
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 border-t border-border/50 bg-background/95 backdrop-blur">
          <nav className="flex flex-col gap-1 py-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2.5 rounded-md transition-colors ${
                  isActiveLink(link.path)
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-muted text-foreground"
                }`}
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