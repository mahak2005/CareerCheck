import { Navbar } from "@/components/navbar"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Welcome to Career Check</h1>
          <p className="text-xl text-gray-400">
            Explore placement statistics and career opportunities at IGDTUW
          </p>
        </div>
      </main>
    </div>
  )
}

