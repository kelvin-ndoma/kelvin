'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/components/providers/ThemeProvider';
import { cn } from '@/lib/utils';
import { 
  SunIcon, 
  MoonIcon, 
  Bars3Icon, 
  XMarkIcon,
  RocketLaunchIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '/' },
  { 
    name: 'Services', 
    href: '/services',
    dropdown: [
      { name: 'Web Design', href: '/services/web-design' },
      { name: 'Web Development', href: '/services/web-development' },
      { name: 'Website Refurbishment', href: '/services/website-refurbishment' },
      { name: 'Digital Marketing', href: '/services/digital-marketing' },
    ]
  },
  { name: 'Blog', href: '/blogs' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { theme, setTheme, mounted } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Don't render theme-dependent content until mounted
  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 transition-colors">
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl animate-pulse"></div>
              <div className="w-32 h-6 bg-gray-300 rounded animate-pulse"></div>
            </div>
            <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      scrolled 
        ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl shadow-blue-500/5 border-b border-gray-200/50 dark:border-gray-700/50" 
        : "bg-transparent"
    )}>
      {/* Animated Background Effect */}
      <div className={cn(
        "absolute inset-0 transition-opacity duration-700",
        scrolled ? "opacity-100" : "opacity-0",
        "bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/20 dark:from-gray-900 dark:via-blue-950/20 dark:to-cyan-950/10"
      )} />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={cn(
          "absolute top-4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full blur-sm transition-all duration-1000",
          scrolled ? "opacity-40" : "opacity-20",
          "animate-float"
        )} />
        <div className={cn(
          "absolute top-8 right-1/3 w-1 h-1 bg-purple-400 rounded-full blur-sm transition-all duration-1000 delay-300",
          scrolled ? "opacity-30" : "opacity-15",
          "animate-float-reverse"
        )} />
      </div>

      <div className="relative w-full px-6 lg:px-12 xl:px-16 2xl:px-24">
        <div className="flex items-center justify-between py-4">
          {/* Enhanced Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 group relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Animated Logo Container */}
            <div className={cn(
              "relative transition-all duration-500 group-hover:scale-110",
              isHovering ? "rotate-12" : "rotate-0"
            )}>
              {/* Glow Effect */}
              <div className={cn(
                "absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur-md transition-opacity duration-500",
                isHovering ? "opacity-70" : "opacity-0"
              )} />
              
              {/* Main Logo */}
              <div className="relative w-10 h-10 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/30 border border-white/20">
                <RocketLaunchIcon className="w-5 h-5 text-white" />
                {/* Sparkle Effect */}
                <SparklesIcon className={cn(
                  "absolute -top-1 -right-1 w-3 h-3 text-yellow-300 transition-all duration-300",
                  isHovering ? "opacity-100 scale-100" : "opacity-0 scale-50"
                )} />
              </div>
            </div>

            {/* Text Logo */}
            <div className="flex flex-col">
              <span className="text-2xl font-black bg-gradient-to-r from-gray-800 via-blue-600 to-cyan-600 dark:from-white dark:via-blue-300 dark:to-cyan-400 bg-clip-text text-transparent transition-all duration-500 group-hover:scale-105">
                Kelvin Ndoma
              </span>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 tracking-widest uppercase transition-all duration-500 group-hover:translate-x-1">
                Digital Creator
              </span>
            </div>
          </Link>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center space-x-3">
            {/* Theme Toggle - Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-600/50 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg shadow-gray-500/10"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>

            <button
              type="button"
              className="p-2 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-600/50 text-gray-700 dark:text-gray-300 hover:scale-110 transition-all duration-300 hover:shadow-lg shadow-gray-500/10"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Desktop navigation - Full Width */}
          <div className="hidden lg:flex flex-1 justify-center items-center">
            <div className="flex items-center space-x-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-600/50 p-1 shadow-2xl shadow-blue-500/5">
              {navigation.map((item, index) => (
                <div key={item.name} className="relative group">
                  {item.dropdown ? (
                    <div className="relative">
                      <button className="flex items-center px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group-hover:scale-105 rounded-xl hover:bg-white/50 dark:hover:bg-gray-700/50">
                        {item.name}
                        <svg className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-blue-500/20 border border-gray-200/50 dark:border-gray-600/50 py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 scale-95 group-hover:scale-100">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 hover:translate-x-2 group"
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mr-3 transition-transform duration-300 group-hover:scale-150" />
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "relative px-6 py-3 text-sm font-semibold transition-all duration-500 rounded-xl hover:scale-105",
                        pathname === item.href
                          ? "text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-blue-500/30"
                          : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/50 dark:hover:bg-gray-700/50"
                      )}
                    >
                      {item.name}
                      {pathname === item.href && (
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl -z-10 animate-pulse-slow" />
                      )}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Desktop right side */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Simple Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={cn(
                "p-3 rounded-2xl backdrop-blur-xl border transition-all duration-500 hover:scale-110 hover:shadow-2xl",
                theme === 'dark' 
                  ? "bg-yellow-100/80 border-yellow-200/50 text-yellow-600 hover:shadow-yellow-500/20" 
                  : "bg-blue-100/80 border-blue-200/50 text-blue-600 hover:shadow-blue-500/20"
              )}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>

            {/* Enhanced CTA Button */}
            <Link
              href="/contact"
              className="group relative px-8 py-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 overflow-hidden"
            >
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              {/* Button Content */}
              <span className="relative flex items-center space-x-2">
                <RocketLaunchIcon className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                <span>Launch Project</span>
              </span>
              
              {/* Border Animation */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              <div className="absolute inset-[1px] rounded-2xl bg-white dark:bg-gray-900 -z-10" />
            </Link>
          </div>
        </div>

        {/* Enhanced Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            {/* Backdrop with blur */}
            <div 
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" 
              onClick={() => setMobileMenuOpen(false)} 
            />
            
            {/* Menu Panel */}
            <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-l border-gray-200/50 dark:border-gray-700/50 shadow-2xl shadow-blue-500/20">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-700/50">
                  <Link href="/" className="flex items-center space-x-3" onClick={() => setMobileMenuOpen(false)}>
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <RocketLaunchIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-black bg-gradient-to-r from-gray-800 to-blue-600 dark:from-white dark:to-blue-300 bg-clip-text text-transparent">
                        Kelvin Ndoma
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                        Digital Creator
                      </span>
                    </div>
                  </Link>
                  <button
                    type="button"
                    className="p-2 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:scale-110 transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Navigation Items */}
                <div className="flex-1 overflow-y-auto py-6">
                  <div className="space-y-2 px-6">
                    {navigation.map((item) => (
                      <div key={item.name}>
                        {item.dropdown ? (
                          <div className="space-y-3">
                            <div className="text-lg font-bold text-gray-900 dark:text-white px-3 py-2">
                              {item.name}
                            </div>
                            <div className="space-y-2 pl-6 border-l-2 border-cyan-500/30">
                              {item.dropdown.map((dropdownItem) => (
                                <Link
                                  key={dropdownItem.name}
                                  href={dropdownItem.href}
                                  className="block px-3 py-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:translate-x-2 rounded-xl hover:bg-blue-50/50 dark:hover:bg-blue-900/20"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {dropdownItem.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            className={cn(
                              "block px-4 py-4 text-lg font-semibold rounded-2xl transition-all duration-300",
                              pathname === item.href
                                ? "text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg"
                                : "text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                            )}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200/50 dark:border-gray-700/50 space-y-4">
                  <Link
                    href="/contact"
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-4 rounded-2xl font-bold text-center block shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Start Your Project
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}