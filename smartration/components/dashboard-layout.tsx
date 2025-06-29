"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  ChefHat,
  Home,
  Menu,
  Receipt,
  Settings,
  User,
  X,
  Heart,
  ShoppingCart,
} from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "FoodGPT", href: "/dashboard/foodgpt", icon: ChefHat },
  { name: "Shopping List", href: "/dashboard/shopping-list", icon: ShoppingCart },
  { name: "Upload Receipt", href: "/dashboard/upload", icon: Receipt },
  { name: "AI Meal Plans", href: "/dashboard/ai-meal-plans", icon: Menu },
  { name: "Saved Meals", href: "/dashboard/saved-meals", icon: Heart },
  { name: "Profile", href: "/dashboard/profile", icon: User },
]

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
      >
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <ChefHat className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold">SmartRation</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <Separator />
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-green-100 text-green-700 shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon
                    className={`mr-4 h-6 w-6 ${
                      isActive ? "text-green-500" : "text-gray-400 group-hover:text-gray-500"
                    }`}
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex h-16 items-center px-0">
            <div className="flex items-center gap-3">
              <ChefHat className="h-7 w-7 text-green-600" />
              <span className="text-2xl font-bold">SmartRation</span>
            </div>
          </div>
          <Separator />
          <nav className="flex-1 space-y-2 px-4 py-6">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-4 py-4 text-base font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-green-100 text-green-700 shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon
                    className={`mr-4 h-6 w-6 ${
                      isActive ? "text-green-500" : "text-gray-400 group-hover:text-gray-500"
                    }`}
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Mobile header */}
        <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm lg:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <ChefHat className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">SmartRation</span>
          </div>
        </div>

        {/* Page content */}
        <main className="py-8 px-6 lg:px-8 xl:px-12">
          {children}
        </main>
      </div>
    </div>
  )
} 