'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TrendingUp, Calculator, BookOpen, Home, Landmark, Newspaper } from 'lucide-react';
import { motion } from 'framer-motion';

export const NavBar = () => {
  const pathname = usePathname();

  const links = [
    { name: 'Start', href: '/', icon: <Home size={18} /> },
    { name: 'Kalkulator', href: '/kalkulator', icon: <Calculator size={18} /> },
    { name: 'Obligacje', href: '/obligacje', icon: <Landmark size={18} /> },
    { name: 'Rynek', href: '/rynek', icon: <Newspaper size={18} /> },
    { name: 'FAQ', href: '/faq', icon: <BookOpen size={18} /> },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-[100] flex h-[70px] w-full items-center justify-center border-b border-black/5 bg-white/80 px-5 backdrop-blur-[20px]"
    >
      <div className="flex w-full max-w-[980px] items-center justify-between">
        
        <Link href="/" className="no-underline">
          <div className="flex items-center gap-2 text-[1.1rem] font-bold text-[#1D1D1F] md:text-[1.2rem]">
            <div className="flex rounded-lg bg-gradient-to-br from-[#0071E3] to-[#00C7BE] p-1.5 text-white shadow-sm">
               <TrendingUp size={20} />
            </div>
            <span>Obligacje.tech</span>
          </div>
        </Link>

        <div className="flex items-center gap-1 md:gap-2">
          {links.map((link) => {
            const isActive = pathname === link.href;
            
            return (
              <Link key={link.href} href={link.href} className="no-underline">
                <div 
                  className={`
                    flex items-center gap-2 rounded-full p-2.5 text-[0.95rem] font-medium transition-all duration-200 ease-in-out md:px-4 
                    ${isActive 
                      ? 'bg-[#0071E3]/10 text-[#0071E3]' 
                      : 'bg-transparent text-[#86868b] hover:text-gray-600 hover:bg-gray-50'
                    }
                  `}
                >
                  <span className={isActive ? 'opacity-100' : 'opacity-70'}>
                    {link.icon}
                  </span>
                  <span className="hidden md:block">
                    {link.name}
                  </span> 
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </motion.nav>
  );
};

export default NavBar;