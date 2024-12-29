
// import Image from 'next/image';
// import Link from 'next/link';

// export function Navbar() {
//   return (
//     <nav className="border-b border-gray-800">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo and Title */}
//           <div className="flex items-center flex-shrink-0 space-x-3">
            
//             <Link href="/" className="text-2xl font-bold">
//             <Image 
//               src="/mainlogo.png" 
//               alt="Logo" 
//               width={150} 
//               height={170} 
//               className="logo-class"
//             />
//             </Link>
//           </div>
//           {/* Navigation Links */}
//           <div className="flex space-x-8">
//             <Link href="/" className="hover:text-gray-300">
//               Home
//             </Link>
//             <Link href="/placements" className="hover:text-gray-300">
//               Placements
//             </Link>
//             <Link href="/analytics" className="hover:text-gray-300">
//               Analytics
//             </Link>
//             <Link href="/internships" className="hover:text-gray-300">
//               Internships
//             </Link>
//             <Link href="/interview-diaries" className="hover:text-gray-300">
//               Interview Diaries
//             </Link>
//             <Link href="/alumini-connect" className="hover:text-gray-300">
//               Alumni Connect
//             </Link>
//             <Link href="/about-us" className="hover:text-gray-300">
//               About us
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }


'use client'

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b fixed top-0 left-0 right-0  z-50 border-gray-800 bg-[#000814] style={{--navbar-height: '4rem'}}">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center flex-shrink-0 space-x-3">
            <Link href="/" className="text-2xl font-bold">
              <Image 
                src="/mainlogo.png" 
                alt="Logo" 
                width={150} 
                height={170} 
                className="logo-class"
              />
            </Link>
          </div>
          {/* Navigation Links */}
          <div className="flex space-x-8">
            {[
              // { href: '/', label: 'Home' },
              { href: '/placements', label: 'Placements' },
              { href: '/internships', label: 'Internships' },
              { href: '/analytics', label: 'Analytics' },
              { href: '/career-programs', label: 'Career Programs' },
              { href: '/interview-diaries', label: 'Interview Diaries' },
              { href: '/alumini-connect', label: 'Alumni Connect' },
              { href: '/about-us', label: 'Us' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="relative">
                <motion.span
                  className={`inline-block ${
                    pathname === href ? 'text-gray-100' : 'text-gray-300 hover:text-gray-100'
                  }`}
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {label}
                </motion.span>
                {pathname === href && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-100"
                    layoutId="underline"
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

