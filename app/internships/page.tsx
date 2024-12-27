// import { Navbar } from "@/components/navbar"
import { Navbar } from "@/components/navbar"
import CompanyCard from '@/components/CompanyCard'

// Mock data for companies
const companies = [
  { id: '1', name: 'TechCorp', logo: '/placeholder.svg?height=100&width=100' },
  { id: '2', name: 'InnoSoft', logo: '/placeholder.svg?height=100&width=100' },
  { id: '3', name: 'DataDynamics', logo: '/placeholder.svg?height=100&width=100' },
  { id: '4', name: 'DataDynamics', logo: '/placeholder.svg?height=100&width=100' },
]

export default function InternshipPage() {
  return (
    <div className="container mx-auto px-4">
      <Navbar />
      <h1 className="text-3xl font-bold mb-6">Internship Opportunities</h1>
      <div className="grid grid-cols-1 gap-4">
        {companies.map((company) => (
          <CompanyCard key={company.id} {...company} />
        ))}
      </div>
    </div>
  )
}

