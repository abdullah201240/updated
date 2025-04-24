"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart, Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "About Us", href: "/about" },
  { name: "Help & Support", href: "/support" },
  { name: "Career", href: "/career" },
  { name: "Contact Us", href: "/contact" },
];

const categories = [
  { 
    name: "Living Room", 
    href: "/shop/living-room",
    items: ["Sofas", "Coffee Tables", "TV Stands"] 
  },
  { 
    name: "Bedroom", 
    href: "/shop/bedroom",
    items: ["Beds", "Wardrobes", "Nightstands"] 
  },
  { 
    name: "Dining", 
    href: "/shop/dining",
    items: ["Dining Tables", "Chairs", "Buffets"] 
  },
  { 
    name: "Office", 
    href: "/shop/office",
    items: ["Desks", "Chairs", "Bookcases"] 
  }
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Close menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle menu hover with delay
  const handleMenuHover = (menu: string | null) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setActiveMenu(menu), 150);
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300 h-[80px] flex items-center",
      hasScrolled 
        ? "bg-[#F6951E]/90 border-b border-[#F6951E]/10 backdrop-blur-lg shadow-lg" 
        : "bg-[#F6951E] backdrop-blur-md"
    )}>
      <div className="container flex items-center justify-between h-full gap-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 h-12 w-24 relative">
          <Image 
            src="/logo.png" 
            alt="Interio Logo"
            fill
            className="object-contain"
            priority
          />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center flex-1 gap-1">
          {NAV_LINKS.map((link) => (
            <div 
              key={link.name} 
              className="relative"
              onMouseEnter={() => handleMenuHover(link.name === 'Shop' ? 'shop' : null)}
              onMouseLeave={() => handleMenuHover(null)}
            >
              <Link 
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1",
                  pathname === link.href 
                    ? "text-white bg-[#F6951E]/20" 
                    : "text-white/90 hover:text-white hover:bg-[#F6951E]/10"
                )}
              >
                {link.name}
                {link.name === 'Shop' && (
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    activeMenu === 'shop' ? "rotate-180" : ""
                  )} />
                )}
              </Link>
              
              {/* Shop Dropdown */}
              {link.name === 'Shop' && (
                <AnimatePresence>
                  {activeMenu === 'shop' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full pt-2 w-64"
                    >
                      <div className="rounded-xl bg-white p-2 shadow-xl border border-gray-100">
                        {categories.map((category) => (
                          <div 
                            key={category.name}
                            className="relative group"
                            onMouseEnter={() => handleMenuHover(category.name)}
                            onMouseLeave={() => handleMenuHover('shop')}
                          >
                            <div className="flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg text-gray-800 hover:bg-[#F6951E]/5 hover:text-[#F6951E] cursor-pointer">
                              {category.name}
                              <ChevronRight className="h-4 w-4 opacity-70" />
                            </div>
                            
                            {/* Subcategories */}
                            <AnimatePresence>
                              {activeMenu === category.name && (
                                <motion.div
                                  initial={{ opacity: 0, x: 10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: 10 }}
                                  transition={{ duration: 0.2 }}
                                  className="absolute left-full top-0 pl-2"
                                >
                                  <div className="rounded-xl bg-white p-2 shadow-xl border border-gray-100 w-56">
                                    {category.items.map((item) => (
                                      <Link
                                        key={item}
                                        href={`/shop/${category.name.toLowerCase().replace(' ', '-')}/${item.toLowerCase().replace(' ', '-')}`}
                                        className="block px-3 py-2 text-sm rounded-lg text-gray-800 hover:bg-[#F6951E]/5 hover:text-[#F6951E]"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                      >
                                        {item}
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>
        
        {/* Mobile Navigation */}
        <div className="flex items-center gap-4 md:hidden">
          <Button variant="ghost" size="icon" className="text-white">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl overflow-hidden md:hidden"
          >
            <div className="container py-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <div key={link.name} className="border-b border-gray-100 last:border-0">
                  <Link
                    href={link.href}
                    className="block py-3 px-4 text-gray-800 font-medium hover:bg-gray-50 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                  
                  {/* Mobile Shop Categories */}
                  {link.name === 'Shop' && (
                    <div className="pl-6 py-2 space-y-1">
                      {categories.map((category) => (
                        <div key={category.name} className="border-b border-gray-100 last:border-0">
                          <div className="block py-2 px-4 text-gray-700 font-medium hover:bg-gray-50 rounded-lg">
                            {category.name}
                          </div>
                          
                          {/* Mobile Subcategories */}
                          <div className="pl-6 py-1 space-y-1">
                            {category.items.map((item) => (
                              <Link
                                key={item}
                                href={`/shop/${category.name.toLowerCase().replace(' ', '-')}/${item.toLowerCase().replace(' ', '-')}`}
                                className="block py-2 px-4 text-gray-600 hover:bg-gray-50 rounded-lg text-sm"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {item}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}