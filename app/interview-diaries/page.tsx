import { Navbar } from "@/components/navbar"
// import Footer from "@/components/Footer"
// export default function StudentProfilePage() {
//   return (
//     <div className="min-h-screen bg-gray-950 text-gray-50">
//       <Navbar />
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <h1 className="text-3xl font-bold text-center">Real Talk: Interview Experience and FAQs</h1>
//         <h3 className="text-3xl font-bold text-center">Coming Soon</h3>
//         {/* <h1 className="text-3xl font-bold text-center">Networking: whoooooooo</h1> */}
//       </main>
//       {/* <Footer /> */}
//     </div>
//   )
// }

import Link from 'next/link'
import { companies } from '@/public/data/companies'
import { Button } from '@/components/ui/button'

export default function InterviewDiaries() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Navbar />
      {/* <h1 className="text-3xl font-bold text-center mb-8">Interview Diaries</h1> */}
      {/* <h1 className="text-3xl font-bold text-center mb-8">Interview Diaries</h1> */}
      <h1 className="text-3xl font-bold text-center">Real Talk: Interview Experience and FAQs</h1>
      <h3 className="text-3xl font-bold text-center mb-8">Coming Soon</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {companies.map((company) => (
          <Link key={company.id} href={`/interview-diaries/${company.id}`} passHref>
            <Button
              variant="outline"
              className="w-full h-20 text-lg font-semibold text-[#000814] transition-transform transform hover:-translate-y-1.5"
            >
              {company.name}
            </Button>
          </Link>
        ))}
      </div>
      {/* <Footer />  */}
    </div>
  )
}

