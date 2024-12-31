// "use client"

// import { useState, useEffect } from "react"
// import { Navbar } from "@/components/navbar"
// import { BarChartComponent } from "@/components/BarChart"
// import { PieChartComponent } from "@/components/PieChart"
// import { LineChartComponent } from "@/components/LineChart"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/analysis_card"
// import { fetchAllYearsData } from "@/utils/csv-parser"
// import { calculateCTCRanges, calculateAverages, calculateStipendStats, getTotalOffersByCompany, getTotalInternshipsByCompany, calculateBranchStats } from "@/utils/data-processors"
// import type { CompanyPlacementData, CompanyInternshipData, BranchPlacementData, BranchInternshipData } from "@/utils/types"

// export default function AnalyticsPage() {
//   const [selectedYear, setSelectedYear] = useState("2023")
//   const [activeTab, setActiveTab] = useState("company")
//   const [allData, setAllData] = useState<{
//     companies: {
//       placements: Record<string, CompanyPlacementData[]>,
//       internships: Record<string, CompanyInternshipData[]>
//     },
//     branches: {
//       placements: Record<string, BranchPlacementData[]>,
//       internships: Record<string, BranchInternshipData[]>
//     }
//   }>({
//     companies: { placements: {}, internships: {} },
//     branches: { placements: {}, internships: {} }
//   })

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await fetchAllYearsData()
//       setAllData(data)
//     }

//     fetchData()
//   }, [])

//   const companyYears = ["2021", "2022", "2023", "2024"]
//   const branchYears = ["2022", "2023", "2024", "2025"]

//   const renderCompanyAnalysis = () => {
//     if (selectedYear === "all") {
//       return (
//         <div className="space-y-8">
//           <LineChartComponent
//             data={getTotalOffersByCompany(allData.companies.placements)}
//             xKey="company"
//             yKeys={companyYears}
//             title="FTE Offers by Company Over Years"
//             description="Number of full-time job offers by company across all years"
//           />
//           <LineChartComponent
//             data={getTotalInternshipsByCompany(allData.companies.internships)}
//             xKey="company"
//             yKeys={companyYears}
//             title="Internship Offers by Company Over Years"
//             description="Number of internship offers by company across all years"
//           />
//         </div>
//       )
//     } else {
//       const placementData = allData.companies.placements[selectedYear] || []
//       const internshipData = allData.companies.internships[selectedYear] || []
//       const ctcRanges = calculateCTCRanges(placementData)
//       const { average: avgCTC, highest: highestCTC } = calculateAverages(placementData)
//       const { average: avgStipend, highest: highestStipend } = calculateStipendStats(internshipData)

//       return (
//         <div className="space-y-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <Card>
//               <CardHeader>
//                 <CardTitle>CTC Statistics</CardTitle>
//                 <CardDescription>Average and Highest CTC for {selectedYear}</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <p>Average CTC: {avgCTC.toFixed(2)} LPA</p>
//                 <p>Highest CTC: {highestCTC.toFixed(2)} LPA</p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardTitle>Internship Statistics</CardTitle>
//                 <CardDescription>Average and Highest Stipend for {selectedYear}</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <p>Average Stipend: {avgStipend.toFixed(2)} INR per month</p>
//                 <p>Highest Stipend: {highestStipend.toFixed(2)} INR per month</p>
//               </CardContent>
//             </Card>
//           </div>
//           <PieChartComponent
//             data={ctcRanges}
//             dataKey="count"
//             nameKey="range"
//             title={`CTC Distribution (${selectedYear})`}
//             description="Distribution of CTC ranges for full-time offers"
//           />
//           <BarChartComponent
//             data={placementData.sort((a, b) => b["FTE Offers"] - a["FTE Offers"]).slice(0, 10)}
//             xKey="Company"
//             yKey="FTE Offers"
//             title={`Top 10 Companies by FTE Offers (${selectedYear})`}
//             description="Number of full-time job offers by top companies"
//           />
//           <BarChartComponent
//             data={internshipData.sort((a, b) => b["Internship Offers"] - a["Internship Offers"]).slice(0, 10)}
//             xKey="company Name"
//             yKey="Internship Offers"
//             title={`Top 10 Companies by Internship Offers (${selectedYear})`}
//             description="Number of internship offers by top companies"
//           />
//         </div>
//       )
//     }
//   }

//   const renderBranchAnalysis = () => {
//     if (selectedYear === "all") {
//       const allYearsData = branchYears.flatMap(year => {
//         const placementData = allData.branches.placements[year] || []
//         const internshipData = allData.branches.internships[year] || []
//         return calculateBranchStats(placementData, internshipData).map(item => ({ ...item, year }))
//       })

//       const totalOffers = allYearsData.reduce((acc: Record<string, { fullTime: number, internship: number }>, item) => {
//         if (!acc[item.year]) {
//           acc[item.year] = { fullTime: 0, internship: 0 }
//         }
//         acc[item.year].fullTime += item.placedStudents
//         acc[item.year].internship += item.internedStudents
//         return acc
//       }, {})

//       const totalOffersData = Object.entries(totalOffers).map(([year, data]) => ({
//         year,
//         "Full-time Offers": data.fullTime,
//         "Internship Offers": data.internship
//       }))

//       return (
//         <div className="space-y-8">
//           <LineChartComponent
//             data={totalOffersData}
//             xKey="year"
//             yKeys={["Full-time Offers", "Internship Offers"]}
//             title="Total Offers Over Years"
//             description="Full-time and internship offers across all branches over the years"
//           />
//           <BarChartComponent
//             data={allYearsData}
//             xKey="branch"
//             yKey={["placedStudents", "internedStudents"]}
//             title="Branch-wise Placement and Internship Statistics"
//             description="Number of students placed and interned by branch across all years"
//             isMultiYear={true}
//           />
//         </div>
//       )
//     } else {
//       const placementData = allData.branches.placements[selectedYear] || []
//       const internshipData = allData.branches.internships[selectedYear] || []
//       const branchStats = calculateBranchStats(placementData, internshipData)

//       return (
//         <div className="space-y-8">
//           <PieChartComponent
//             data={[
//               { name: "Full-time Offers", value: branchStats.reduce((sum, item) => sum + item.placedStudents, 0) },
//               { name: "6 Month Interns", value: branchStats.reduce((sum, item) => sum + item.sixMonthInterns, 0) },
//               { name: "Interned Students", value: branchStats.reduce((sum, item) => sum + (item.internedStudents || 0), 0) }
//             ]}
//             dataKey="value"
//             nameKey="name"
//             title={`Placement Season ${selectedYear} Overview`}
//             description="Distribution of offers and internships"
//           />
//           <BarChartComponent
//             data={branchStats}
//             xKey="branch"
//             yKey={["totalStudents", "placedStudents", "sixMonthInterns"]}
//             title={`Branch-wise Placement Statistics (${selectedYear})`}
//             description="Number of total students, placed students, and 6-month interns by branch"
//             isMultiYear={true}
//           />
//           <BarChartComponent
//             data={branchStats}
//             xKey="branch"
//             yKey={["totalStudents", "internedStudents"]}
//             title={`Branch-wise Internship Statistics (${selectedYear})`}
//             description="Number of total students and interned students by branch"
//             isMultiYear={true}
//           />
//         </div>
//       )
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-950 text-gray-50">
//       <Navbar />
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <h1 className="text-3xl font-bold mb-8">Analytics</h1>
//         <div className="mb-8">
//           <Select onValueChange={(value) => setSelectedYear(value)} defaultValue="2023">
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Select year" />
//             </SelectTrigger>
//             <SelectContent>
//               {activeTab === "company" ? companyYears.map((year) => (
//                 <SelectItem key={year} value={year}>{year}</SelectItem>
//               )) : branchYears.map((year) => (
//                 <SelectItem key={year} value={year}>{year}</SelectItem>
//               ))}
//               <SelectItem value="all">All Years</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//         <Tabs defaultValue="company" onValueChange={setActiveTab}>
//           <TabsList className="mb-8">
//             <TabsTrigger value="company">Company Analysis</TabsTrigger>
//             <TabsTrigger value="branch">Branch Analysis</TabsTrigger>
//           </TabsList>
//           <TabsContent value="company" className="space-y-8">
//             {renderCompanyAnalysis()}
//           </TabsContent>
//           <TabsContent value="branch" className="space-y-8">
//             {renderBranchAnalysis()}
//           </TabsContent>
//         </Tabs>
//       </main>
//     </div>
//   )
// }
"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BranchAnalysisChart } from "@/components/BranchAnalysisChart"
import { CompanyAnalysisChart } from "@/components/CompanyAnalysisChart"
import { fetchBranchAnalysisData, fetchCompanyAnalysisData } from "@/utils/csv-parser"
import type { BranchInternshipData, BranchPlacementData, CompanyInternshipData, CompanyPlacementData } from "@/utils/types"

export default function VisualsPage() {
  const [analysisType, setAnalysisType] = useState<'branch' | 'company'>('branch')
  const [dataType, setDataType] = useState<'internships' | 'placements'>('internships')
  const [selectedYear, setSelectedYear] = useState<string>("2024")
  const [branchData, setBranchData] = useState<(BranchInternshipData | BranchPlacementData)[]>([])
  const [companyData, setCompanyData] = useState<(CompanyInternshipData | CompanyPlacementData)[]>([])

  const branchYears = {
    internships: ["2023", "2024", "2025"],
    placements: ["2022", "2023", "2024"]
  }

  const companyYears = ["2021", "2022", "2023", "2024"]

  useEffect(() => {
    const fetchData = async () => {
      if (analysisType === 'branch') {
        if (selectedYear === 'all') {
          const allData = await Promise.all(
            branchYears[dataType].map(year => fetchBranchAnalysisData(dataType, year))
          );
          setBranchData(allData.flat());
        } else {
          const data = await fetchBranchAnalysisData(dataType, selectedYear);
          setBranchData(data);
        }
      } else {
        if (selectedYear === 'all') {
          const allData = await Promise.all(
            companyYears.map(year => fetchCompanyAnalysisData(dataType, year))
          );
          setCompanyData(allData.flat());
        } else {
          const data = await fetchCompanyAnalysisData(dataType, selectedYear);
          setCompanyData(data);
        }
      }
    };

    fetchData();
  }, [analysisType, dataType, selectedYear]);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Analytics</h1>
        <div className="space-y-6">
          <div className="flex gap-4">
            <Button
              variant={analysisType === 'branch' ? "default" : "secondary"}
              onClick={() => setAnalysisType('branch')}
            >
              Branch Analysis
            </Button>
            <Button
              variant={analysisType === 'company' ? "default" : "secondary"}
              onClick={() => setAnalysisType('company')}
            >
              Company Analysis
            </Button>
          </div>

          <div className="flex gap-4">
            <Button
              variant={dataType === 'internships' ? "default" : "secondary"}
              onClick={() => setDataType('internships')}
            >
              Internships
            </Button>
            <Button
              variant={dataType === 'placements' ? "default" : "secondary"}
              onClick={() => setDataType('placements')}
            >
              Placements
            </Button>
          </div>

          <div>
            <Select onValueChange={setSelectedYear} value={selectedYear}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                
                {(analysisType === 'branch' ? branchYears[dataType] : companyYears).map((year) => (
                  <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {analysisType === 'branch' ? (
            <BranchAnalysisChart data={branchData} dataType={dataType} selectedYear={selectedYear} />
          ) : (
            <CompanyAnalysisChart data={companyData} dataType={dataType} selectedYear={selectedYear} />
          )}
        </div>
      </main>
    </div>
  )
}

