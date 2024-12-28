import { Navbar } from "@/components/navbar"
import Footer from "@/components/Footer"
import PlacementTimeline from "@/components/PlacementTimeline"
// // import { redirect } from 'next/navigation'
// export default function HomePage() {
//   return (
//     <div className="">
//       
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="text-center space-y-4">
//           <h1 className="text-4xl font-bold">Welcome to Career Check</h1>
//           <p className="text-xl text-gray-400">
//             Explore placement statistics and career opportunities at IGDTUW
//           </p>
          
//         </div>
//       </main>
//      
//     </div>
//   )
// }




export default function Home() {
  return (
    
      <div className="min-h-screen bg-gray-950 text-gray-50">
        <Navbar />
        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8 text-white-800">Welcome to Career Check</h1>
            <p className="text-center text-white-600 mb-12 max-w-2xl mx-auto">
              Empowering students and professionals to make informed career decisions. 
              Explore our placement history and see how we've helped shape successful careers.
            </p>
            
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8 text-white-800">Placement Timeline</h2>
              <PlacementTimeline />
            </section>
          </div>
        </div>
        <Footer />
      </div>
    
  )
}




