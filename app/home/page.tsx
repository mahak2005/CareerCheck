import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/homecard"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Briefcase, GraduationCap, Users } from 'lucide-react'
// import Footer from "@/components/Footer"

export default function DataPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Data</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="mr-2" />
                Placements
              </CardTitle>
              <CardDescription>View and analyze placement data</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Explore placement statistics, company-wise data, and more.</p>
            </CardContent>
            <CardFooter>
              <Link href="/placements" passHref>
                <Button>View Placements</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center">
                <GraduationCap className="mr-2" />
                Internships
              </CardTitle>
              <CardDescription>Explore internship opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Discover internship trends, company offerings, and student experiences.</p>
            </CardContent>
            <CardFooter>
              <Link href="/internships" passHref>
                <Button>View Internships</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2" />
                Career Program
              </CardTitle>
              <CardDescription>Access career development resources</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Find information about career workshops, mentorship programs, and skill development.</p>
            </CardContent>
            <CardFooter>
              <Link href="/career-programs" passHref>
                <Button>Explore Program</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
        
      </main>
      
    </div>
    
  )
}

