// import { Navbar } from "@/components/navbar"
import { Navbar } from "@/components/navbar"
import CompanyCard from '@/components/CompanyCard'

// Mock data for companies
const companies = [
  { id: '1', name: 'Google WE Scholar', logo: '/google logo.png' },
  { id: '2', name: 'Google STEP', logo: '/placeholder.svg?height=100&width=100' },
  { id: '3', name: 'DeSHAW', logo: '/placeholder.svg?height=100&width=100' },
  { id: '4', name: 'NXP Wit Scholar', logo: '/placeholder.svg?height=100&width=100' },
  { id: '5', name: 'Uber she++/STAR', logo: '/placeholder.svg?height=100&width=100' },
  { id: '6', name: 'LinkedIN Coachin', logo: '/placeholder.svg?height=100&width=100' },
]

export default function InternshipPage() {
  return (
    <div className="container mx-auto px-4">
      <Navbar />
      <h1 className="text-3xl font-bold mb-6">


      </h1>
      <div className="grid grid-cols-1 gap-4">
        {companies.map((company) => (
          <CompanyCard key={company.id} {...company} />
        ))}
      </div>
    </div>
  )
}

