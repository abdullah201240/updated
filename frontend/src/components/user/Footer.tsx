import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
  ];

  const companyLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Shipping Policy", href: "/shipping" },
    { name: "Return Policy", href: "/returns" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Interio</h3>
            <p className="text-gray-300 mb-6">
              Elevating homes with premium furniture since 2023.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="rounded-full bg-gray-800 hover:bg-[#F6951E]/20 hover:text-[#F6951E]">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-gray-800 hover:bg-[#F6951E]/20 hover:text-[#F6951E]">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-gray-800 hover:bg-[#F6951E]/20 hover:text-[#F6951E]">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-[#F6951E] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-[#F6951E] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-300 mb-4">
              Subscribe to get updates on new arrivals and special offers.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-gray-800 border-gray-700 focus:border-[#F6951E]"
              />
              <Button className="bg-[#F6951E] hover:bg-[#F6951E]/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-16 pt-8 border-t border-gray-800 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-[#F6951E]" />
            <span className="text-gray-300">contact@interio.com</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-[#F6951E]" />
            <span className="text-gray-300">+1 (555) 123-4567</span>
          </div>
          <div className="text-gray-300 md:text-right">
            Open 24/7 for your convenience
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-950 py-6">
        <div className="container text-center text-gray-400">
          <p>© {new Date().getFullYear()} Interio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
