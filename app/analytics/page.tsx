"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { BarChartComponent } from "@/components/BarChart"
import { PieChartComponent } from "@/components/PieChart"
import { BranchAnalysis } from "@/components/BranchAnalysis"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/analysis_card"
import { fetchCompanyData, fetchBranchData, fetchAllYearsData } from "@/utils/data-fetcher"
import type { CompanyPlacementData, CompanyInternshipData, BranchPlacementData, BranchInternshipData } from "@/utils/types"

export default function AnalyticsPage() {
  const [selectedYear, setSelectedYear] = useState("2023")
  const [activeTab, setActiveTab] = useState("company")
  const [companyData, setCompanyData] = useState<{
    placements: CompanyPlacementData[]
    internships: CompanyInternshipData[]
  }>({ placements: [], internships: [] })
  const [branchData, setBranchData] = useState<{
    placements: BranchPlacementData[]
    internships: BranchInternshipData[]
  }>({ placements: [], internships: [] })
  const [allYearsData, setAllYearsData] = useState<{
    companies: { placements: CompanyPlacementData[], internships: CompanyInternshipData[] }
    branches: { placements: BranchPlacementData[], internships: BranchInternshipData[] }
  }>({
    companies: { placements: [], internships: [] },
    branches: { placements: [], internships: [] }
  })

  useEffect(() => {
    const fetchData = async () => {
      if (selectedYear === "all") {
        const data = await fetchAllYearsData()
        setAllYearsData(data)
      } else {
        const company = await fetchCompanyData(selectedYear)
        const branch = await fetchBranchData(selectedYear)
        setCompanyData(company)
        setBranchData(branch)
      }
    }

    fetchData()
  }, [selectedYear])

  const getTopCompaniesByJobs = (data: CompanyPlacementData[]) => {
    return data
      .sort((a, b) => b["FTE Offers"] - a["FTE Offers"])
      .slice(0, 10)
  }

  const getTopCompaniesByCTC = (data: CompanyPlacementData[]) => {
    return data
      .sort((a, b) => b["CTC (LPA)"] - a["CTC (LPA)"])
      .slice(0, 10)
  }

  const getInternshipShareData = (data: CompanyInternshipData[]) => {
    return data
      .sort((a, b) => b["Internship Offers"] - a["Internship Offers"])
      .slice(0, 10)
  }

  const getTopCompaniesByStipend = (data: CompanyInternshipData[]) => {
    return data
      .sort((a, b) => b["Stipend (INR per month)"] - a["Stipend (INR per month)"])
      .slice(0, 10)
  }

  const getCompanyOffersTrend = (data: CompanyPlacementData[]) => {
    const companyOffers: { [key: string]: { [year: string]: number } } = {}
    data.forEach(item => {
      if (!companyOffers[item.Company]) {
        companyOffers[item.Company] = { '2021': 0, '2022': 0, '2023': 0 }
      }
      companyOffers[item.Company][item.Year] = item["FTE Offers"]
    })
    return Object.entries(companyOffers)
      .map(([company, offers]) => ({ Company: company, ...offers }))
      .sort((a, b) => {
        const sumA = (['2021', '2022', '2023'] as const).reduce((sum, year) => {
          const value = a[year as keyof typeof a];
          return sum + (typeof value === 'number' ? value : 0);
        }, 0);
        
        const sumB = (['2021', '2022', '2023'] as const).reduce((sum, year) => {
          const value = b[year as keyof typeof b];
          return sum + (typeof value === 'number' ? value : 0);
        }, 0);
        
        
        return sumB - sumA;
      })
      .slice(0, 10)
  }

  const getInternshipOffersTrend = (data: CompanyInternshipData[]) => {
    const companyOffers: { [key: string]: { [year: string]: number } } = {}
    data.forEach(item => {
      if (!companyOffers[item["company Name"]]) {
        companyOffers[item["company Name"]] = { '2021': 0, '2022': 0, '2023': 0 }
      }
      companyOffers[item["company Name"]][item.Year] = item["Internship Offers"]
    })
    return Object.entries(companyOffers)
      .map(([company, offers]) => ({ Company: company, ...offers }))
      .sort((a, b) => {
        const sumA = (['2021', '2022', '2023'] as const).reduce((sum, year) => {
          const value = a[year as keyof typeof a];
          return sum + (typeof value === 'number' ? value : 0);
        }, 0);
        
        const sumB = (['2021', '2022', '2023'] as const).reduce((sum, year) => {
          const value = b[year as keyof typeof b];
          return sum + (typeof value === 'number' ? value : 0);
        }, 0);
        
        return sumB - sumA;
      })
      .slice(0, 10)
  }

  const getTotalOffers = (
    data: (CompanyPlacementData | CompanyInternshipData)[],
    key: "FTE Offers" | "Internship Offers"
  ) => {
    return data.reduce((total, item) => {
      return total + ((item as any)[key] || 0); // Cast item to `any` or explicitly type it
    }, 0);
  };
  
  const getTotalOffersPerYear = (
    data: (CompanyPlacementData | CompanyInternshipData)[],
    key: "FTE Offers" | "Internship Offers"
  ) => {
    const totals = { '2021': 0, '2022': 0, '2023': 0 };
    data.forEach(item => {
      if (totals.hasOwnProperty(item.Year)) {
        totals[item.Year as keyof typeof totals] += (item as any)[key] || 0;
      }
    });
    return [
      { year: '2021', total: totals['2021'] },
      { year: '2022', total: totals['2022'] },
      { year: '2023', total: totals['2023'] },
    ];
  };
  

  return (
    <div className="min-h-screen bg-gray-950 text-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Analytics</h1>
        <div className="mb-8">
          <Select onValueChange={(value) => setSelectedYear(value)} defaultValue="2023">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2021">2021</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="all">All Years</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Tabs defaultValue="company" onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="company">Company Analysis</TabsTrigger>
            <TabsTrigger value="branch">Branch Analysis</TabsTrigger>
          </TabsList>
          <TabsContent value="company" className="space-y-8">
            {selectedYear !== "all" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Offers</CardTitle>
                    <CardDescription>FTE and Internship offers for {selectedYear}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold">
                      FTE: {getTotalOffers(companyData.placements, "FTE Offers")}
                    </div>
                    <div className="text-4xl font-bold mt-4">
                      Internships: {getTotalOffers(companyData.internships, "Internship Offers")}
                    </div>
                  </CardContent>
                </Card>
                <BarChartComponent
                  data={getTopCompaniesByJobs(companyData.placements)}
                  xKey="Company"
                  yKey="FTE Offers"
                  title="Top Companies by Job Offers"
                  description={`Number of full-time job offers by company (${selectedYear})`}
                />
                <PieChartComponent
                  data={getInternshipShareData(companyData.internships)}
                  dataKey="Internship Offers"
                  nameKey="company Name"
                  title="Internship Offers by Company"
                  description={`Share of internship offers across top companies (${selectedYear})`}
                />
                <BarChartComponent
                  data={getTopCompaniesByCTC(companyData.placements)}
                  xKey="Company"
                  yKey="CTC (LPA)"
                  title="Top Companies by CTC"
                  description={`Comparison of CTC offered by top companies (${selectedYear})`}
                />
                <BarChartComponent
                  data={getTopCompaniesByStipend(companyData.internships)}
                  xKey="company Name"
                  yKey="Stipend (INR per month)"
                  title="Top Companies by Internship Stipend"
                  description={`Comparison of internship stipends offered by top companies (${selectedYear})`}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <BarChartComponent
                    data={getTotalOffersPerYear(allYearsData.companies.placements, "FTE Offers")}
                    xKey="year"
                    yKey="total"
                    title="Total FTE Offers per Year"
                    description="Number of full-time job offers across all companies per year"
                  />
                  <BarChartComponent
                    data={getTotalOffersPerYear(allYearsData.companies.internships, "Internship Offers")}
                    xKey="year"
                    yKey="total"
                    title="Total Internship Offers per Year"
                    description="Number of internship offers across all companies per year"
                  />
                </div>
                <BarChartComponent
                  data={getCompanyOffersTrend(allYearsData.companies.placements)}
                  xKey="Company"
                  yKey={['2021', '2022', '2023']}
                  title="Company FTE Offers Trend"
                  description="Number of full-time job offers by company over the years"
                  isMultiYear={true}
                />
                <BarChartComponent
                  data={getInternshipOffersTrend(allYearsData.companies.internships)}
                  xKey="Company"
                  yKey={['2021', '2022', '2023']}
                  title="Company Internship Offers Trend"
                  description="Number of internship offers by company over the years"
                  isMultiYear={true}
                />
              </div>
            )}
          </TabsContent>
          <TabsContent value="branch" className="space-y-8">
            <BranchAnalysis
              year={selectedYear}
              placementData={selectedYear === "all" ? allYearsData.branches.placements : branchData.placements}
              internshipData={selectedYear === "all" ? allYearsData.branches.internships : branchData.internships}
              allYearsData={selectedYear === "all" ? allYearsData.branches : undefined}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

