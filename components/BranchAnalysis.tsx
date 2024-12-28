"use client"

import { LineChartComponent } from "./LineChart"
import { BarChartComponent } from "./BarChart"
import { PieChartComponent } from "./PieChart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/analysis_card"
import type { BranchPlacementData, BranchInternshipData } from "@/utils/types"

interface BranchAnalysisProps {
  year: string
  placementData: BranchPlacementData[]
  internshipData: BranchInternshipData[]
  allYearsData?: {
    placements: BranchPlacementData[]
    internships: BranchInternshipData[]
  }
}

export function BranchAnalysis({ year, placementData, internshipData, allYearsData }: BranchAnalysisProps) {
  const getPlacementSeasonGlimpse = () => {
    const totalPlaced = placementData.reduce((sum, item) => sum + item["Placed Students"], 0)
    const totalSixMonthInterns = placementData.reduce((sum, item) => sum + item["6 Month Interns"], 0)
    const totalInterned = internshipData.reduce((sum, item) => sum + item["Interned Students"], 0)

    return [
      { name: "Full-time Offers", value: totalPlaced },
      { name: "6 Month Interns", value: totalSixMonthInterns },
      { name: "Interned Students", value: totalInterned }
    ]
  }

  const getBranchWiseStats = () => {
    return placementData.map(branch => ({
      Branch: branch.Branch,
      "Total Students": branch["Total Students"],
      "Placed Students": branch["Placed Students"],
      "6 Month Interns": branch["6 Month Interns"],
      "Placement %": ((branch["Placed Students"] / branch["Total Students"]) * 100).toFixed(1)
    }))
  }

  const getInternshipStats = () => {
    return internshipData.map(branch => ({
      Branch: branch.Branch,
      "Total Students": branch["Total Students"],
      "Interned Students": branch["Interned Students"],
      "Internship %": ((branch["Interned Students"] / branch["Total Students"]) * 100).toFixed(1)
    }))
  }

  const getAllYearsTrend = () => {
    if (!allYearsData) return []

    const yearWiseData: { [key: string]: any } = {}
    
    allYearsData.placements.forEach(item => {
      if (!yearWiseData[item.Year]) {
        yearWiseData[item.Year] = {
          year: item.Year,
          "Full-time Offers": 0,
          "Internship Offers": 0
        }
      }
      yearWiseData[item.Year]["Full-time Offers"] += item["Placed Students"]
    })

    allYearsData.internships.forEach(item => {
      if (yearWiseData[item.Year]) {
        yearWiseData[item.Year]["Internship Offers"] += item["Interned Students"]
      }
    })

    return Object.values(yearWiseData)
  }

  return (
    <div className="space-y-8">
      {year === "all" ? (
        <div className="space-y-8">
          <LineChartComponent
            data={getAllYearsTrend()}
            xKey="year"
            yKeys={["Full-time Offers", "Internship Offers"]}
            title="Offers Trend Over Years"
            description="Total full-time and internship offers across all branches"
          />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PieChartComponent
              data={getPlacementSeasonGlimpse()}
              dataKey="value"
              nameKey="name"
              title={`Placement Season ${year} Overview`}
              description="Distribution of offers and internships"
            />
            <Card>
              <CardHeader>
                <CardTitle>Highest Package Details</CardTitle>
                <CardDescription>Top offers for the year {year}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {placementData.map(branch => (
                  <div key={branch.Branch} className="space-y-2">
                    <h4 className="font-semibold">{branch.Branch}</h4>
                    <p>Highest CTC: {branch["Highest CTC (LPA)"]} LPA ({branch["Highest CTC Company"]})</p>
                    <p>Highest Stipend: {branch["Highest Stipend (LPM)"]} LPM ({branch["Highest Stipend Company"]})</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <BarChartComponent
              data={getBranchWiseStats()}
              xKey="Branch"
              yKey={["Total Students", "Placed Students", "6 Month Interns"]}
              title="Branch-wise Placement Statistics"
              description={`Placement statistics for ${year}`}
              isMultiYear={true}
            />

            <BarChartComponent
              data={getInternshipStats()}
              xKey="Branch"
              yKey={["Total Students", "Interned Students"]}
              title="Branch-wise Internship Statistics"
              description={`Internship statistics for ${year}`}
              isMultiYear={true}
            />
          </div>
        </>
      )}
    </div>
  )
}

