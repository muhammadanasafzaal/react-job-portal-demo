

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Search, Bell, MessageSquare, FileText, Calendar, Building2, Briefcase, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useAppSelector } from "@/store/hooks"
import { User as UserType } from "@/types"

const navigation = [
  { name: "Find Jobs", href: "/", icon: Briefcase },
  { name: "Top Companies", href: "/companies", icon: Building2 },
  { name: "Job Tracker", href: "/tracker", icon: FileText },
  { name: "My Calendar", href: "/calendar", icon: Calendar },
  { name: "Documents", href: "/documents", icon: FileText },
  { name: "Messages", href: "/messages", icon: MessageSquare },
  { name: "Notifications", href: "/notifications", icon: Bell },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const user: UserType | null = useAppSelector(state => state.user?.user || null)


  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 mr-0 sm:mr-8">
                <img src="/logo-demo.png" alt="JobHub Logo" className="w-full h-auto" />
              </div>
              {/* <span className="text-xl font-bold text-gray-900">JobHub</span> */}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden space-x-2 xl:flex">
            {navigation.map((item) => {
              // const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm xl:text-md font-normal transition-colors ${
                    isActive ? "text-blue-600 bg-blue-50 font-semibold" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {/* <Icon className="w-4 h-4" /> */}
                  <span className="whitespace-nowrap">{item.name}</span>
                  {item.name === "Notifications" && (
                    <Badge variant="destructive" className="ml-1 px-1.5 py-0.5 text-xs">
                      3
                    </Badge>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Search and Profile */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <Input type="text" placeholder="Search" className="w-32 pl-10" />
            </div>

            <Button className="hidden md:inline-flex">Resume Builder</Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative w-8 h-8 rounded-full">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/user-avatar-2.jpg" alt={user?.name ?? "User"} />
                    <AvatarFallback>{user?.initials ?? "JD"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem asChild>
                  <Link to="/profile">
                    <User className="w-4 h-4 mr-2" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/my-jobs">
                    <Briefcase className="w-4 h-4 mr-2" />
                    <span>My Jobs</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="xl:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="py-4 border-t border-gray-200 xl:hidden">
            <div className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                      isActive ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
