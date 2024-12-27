'use client'
import { Navbar } from "@/components/navbar"
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import StudentCard from '@/components/StudentCard'

// Mock data for companies and selected students
const companies = [
  { 
    id: '1', 
    name: 'Google WE Scholar', 
    logo: '/placeholder.svg?height=100&width=100',
    students: [
      { id: '1', name: 'Alice Johnson', year: 3, branch: 'Computer Science', image: '/placeholder.svg?height=200&width=200' },
      { id: '2', name: 'Bob Smith', year: 4, branch: 'Electrical Engineering', image: '/placeholder.svg?height=200&width=200' },
      { id: '3', name: 'Charlie Brown', year: 2, branch: 'Computer Science', image: '/placeholder.svg?height=200&width=200' },
      { id: '4', name: 'Diana Lee', year: 3, branch: 'Mechanical Engineering', image: '/placeholder.svg?height=200&width=200' },
    ]
  },
  { 
    id: '2', 
    name: 'Google STEP', 
    logo: '/placeholder.svg?height=100&width=100',
    students: [
      { id: '1', name: 'MAHAK', year: 2, branch: 'CSE AI', image: '/placeholder.svg?height=200&width=200' },
      { id: '2', name: 'Bob Smith', year: 4, branch: 'Electrical Engineering', image: '/placeholder.svg?height=200&width=200' },
      { id: '3', name: 'Charlie Brown', year: 2, branch: 'Computer Science', image: '/placeholder.svg?height=200&width=200' },
      { id: '4', name: 'Diana Lee', year: 3, branch: 'Mechanical Engineering', image: '/placeholder.svg?height=200&width=200' },
    ]
  },
  { 
    id: '3', 
    name: 'DeSHAW', 
    logo: '/placeholder.svg?height=100&width=100',
    students: [
      { id: '5', name: 'Eva Green', year: 3, branch: 'Computer Science', image: '/placeholder.svg?height=200&width=200' },
      { id: '6', name: 'Frank White', year: 4, branch: 'Electrical Engineering', image: '/placeholder.svg?height=200&width=200' },
      { id: '7', name: 'Grace Taylor', year: 2, branch: 'Mechanical Engineering', image: '/placeholder.svg?height=200&width=200' },
    ]
  },
  { 
    id: '4', 
    name: 'NPX Wit Scholar', 
    logo: '/placeholder.svg?height=100&width=100',
    students: [
      { id: '5', name: 'Eva Green', year: 3, branch: 'Computer Science', image: '/placeholder.svg?height=200&width=200' },
      { id: '6', name: 'Frank White', year: 4, branch: 'Electrical Engineering', image: '/placeholder.svg?height=200&width=200' },
      { id: '7', name: 'Grace Taylor', year: 2, branch: 'Mechanical Engineering', image: '/placeholder.svg?height=200&width=200' },
    ]
  },
  { 
    id: '5', 
    name: 'Uber she++/STAR', 
    logo: '/placeholder.svg?height=100&width=100',
    students: [
      { id: '5', name: 'Eva Green', year: 3, branch: 'Computer Science', image: '/placeholder.svg?height=200&width=200' },
      { id: '6', name: 'Frank White', year: 4, branch: 'Electrical Engineering', image: '/placeholder.svg?height=200&width=200' },
      { id: '7', name: 'Grace Taylor', year: 2, branch: 'Mechanical Engineering', image: '/placeholder.svg?height=200&width=200' },
    ]
  },
  { 
    id: '6', 
    name: 'LinkedIN Coachin', 
    logo: '/placeholder.svg?height=100&width=100',
    students: [
      { id: '5', name: 'Eva Green', year: 3, branch: 'Computer Science', image: '/placeholder.svg?height=200&width=200' },
      { id: '6', name: 'Frank White', year: 4, branch: 'Electrical Engineering', image: '/placeholder.svg?height=200&width=200' },
      { id: '7', name: 'Grace Taylor', year: 2, branch: 'Mechanical Engineering', image: '/placeholder.svg?height=200&width=200' },
    ]
  },
]

export default function CompanyPage() {
  
  const params = useParams()
  const companyId = params.companyId as string

  const [company, setCompany] = useState<typeof companies[0] | null>(null)
  const [yearFilter, setYearFilter] = useState<number | null>(null)
  const [branchFilter, setBranchFilter] = useState<string | null>(null)

  useEffect(() => {
    const foundCompany = companies.find(c => c.id === companyId)
    setCompany(foundCompany || null)
  }, [companyId])

  if (!company) {
    return <div className="text-center py-10">Loading...</div>
  }

  const filteredStudents = company.students.filter(student => 
    (!yearFilter || student.year === yearFilter) &&
    (!branchFilter || student.branch === branchFilter)
  )

  const years = Array.from(new Set(company.students.map(s => s.year)))
  const branches = Array.from(new Set(company.students.map(s => s.branch)))

  return (
    <div className="container mx-auto px-4">
      <Navbar />
      <div className="flex items-center mb-6">
        <Image
          src={company.logo}
          alt={`${company.name} logo`}
          width={100}
          height={100}
          className="mr-4"
        />
        <h1 className="text-3xl font-bold">{company.name}</h1>
      </div>
      <div className="mb-4 flex flex-wrap gap-4">
        <select 
          onChange={(e) => setYearFilter(e.target.value ? Number(e.target.value) : null)}
          className="border rounded-md p-2 text-black"
        >
          <option value="">All Years</option>
          {years.map(year => (
            <option key={year} value={year}>Year {year}</option>
          ))}
        </select>
        <select 
          onChange={(e) => setBranchFilter(e.target.value || null)}
          className="border rounded-md p-2 text-black"
        >
          <option value="">All Branches</option>
          {branches.map(branch => (
            <option key={branch} value={branch}>{branch}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredStudents.map((student) => (
          <StudentCard key={student.id} {...student} />
        ))}
      </div>
    </div>
  )
}

