// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Navbar } from "@/components/navbar";
// import { PlacementData, InternshipData } from "@/utils/types";

// export default function AnalysisPage() {

//     const [selectedCategory, setSelectedCategory] = useState<"placements" | "internships">("placements");
//     const [selectedYear, setSelectedYear] = useState("2024");
//     const [placementData, setPlacementData] = useState<PlacementData[]>([]);
//     const [internshipData, setInternshipData] = useState<InternshipData[]>([]);
//     const [loading, setLoading] = useState(false);

//     const handleCategoryChange = (category: "placements" | "internships") => {
//         setSelectedCategory(category);
//     };


//     useEffect(() => {
//         async function fetchData() {
//             setLoading(true);
//             try {
//                 let data;
//                 if (selectedCategory === "placements") {
//                     // Fetch placement data based on the selected year
//                     const response = await fetch("/api/analysis_placements", {
//                         method: "POST",
//                         headers: {
//                             "Content-Type": "application/json",
//                         },
//                         body: JSON.stringify({ year: selectedYear }),
//                     });
//                     const result = await response.json();
//                     data = result.data;  // Destructure data from the response
//                     setPlacementData(data);  // Set placement data
//                 } else {
//                     // Fetch internship data based on the selected year
//                     const response = await fetch("/api/analysis_internships", {
//                         method: "POST",
//                         headers: {
//                             "Content-Type": "application/json",
//                         },
//                         body: JSON.stringify({ year: selectedYear }),
//                     });
//                     const result = await response.json();
//                     data = result.data;  // Destructure data from the response
//                     setInternshipData(data);  // Set internship data
//                 }
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             } finally {
//                 setLoading(false);
//             }
//         }
    
//         fetchData();
//     }, [selectedCategory, selectedYear]);
    

//     return (
//         <div className="min-h-screen bg-gray-950 text-gray-50">
//             <Navbar />
//             <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                 <div className="space-y-6">
//                     {/* Category Selection (Placements or Internships) */}
//                     <div className="flex gap-4">
//                         <Button
//                             variant={selectedCategory === "placements" ? "default" : "secondary"}
//                             onClick={() => handleCategoryChange("placements")}
//                         >
//                             Placements
//                         </Button>
//                         <Button
//                             variant={selectedCategory === "internships" ? "default" : "secondary"}
//                             onClick={() => handleCategoryChange("internships")}
//                         >
//                             Internships
//                         </Button>
//                     </div>

//                     {/* Year Selection */}
//                     <div className="flex gap-4">
//                         {["2021", "2022", "2023", "2024"].map((year) => (
//                             <Button
//                                 key={year}
//                                 variant={selectedYear === year ? "default" : "secondary"}
//                                 onClick={() => setSelectedYear(year)}
//                             >
//                                 {year}
//                             </Button>
//                         ))}
//                     </div>

//                     {/* Results Table */}
//                     <div className="rounded-md border border-gray-800">
//                         {loading ? (
//                             <div className="p-4 text-center">Loading...</div>
//                         ) : selectedCategory === "placements" ? (
//                             <Table>
//                                 <TableHeader>
//                                     <TableRow>
//                                         <TableHead>Company</TableHead>
//                                         <TableHead>CTC (LPA)</TableHead>
//                                         <TableHead>FTE Offers</TableHead>
//                                     </TableRow>
//                                 </TableHeader>
//                                 <TableBody>
//                                     {placementData.length === 0 ? (
//                                         <TableRow>
//                                             <TableCell colSpan={3} className="text-center">No placement data available</TableCell>
//                                         </TableRow>
//                                     ) : (
//                                         placementData.map((row) => (
//                                             <TableRow key={row.Company}>
//                                                 <TableCell>{row.Company}</TableCell>
//                                                 <TableCell>{row.CTC}</TableCell>
//                                                 <TableCell>{row.FTEOffers}</TableCell>
//                                             </TableRow>
//                                         ))
//                                     )}
//                                 </TableBody>
//                             </Table>
//                         ) : (
//                             <Table>
//                                 <TableHeader>
//                                     <TableRow>
//                                         <TableHead>Company</TableHead>
//                                         <TableHead>Stipend (INR)</TableHead>
//                                         <TableHead>Total Offers</TableHead>
//                                     </TableRow>
//                                 </TableHeader>
//                                 <TableBody>
//                                     {internshipData.length === 0 ? (
//                                         <TableRow>
//                                             <TableCell colSpan={3} className="text-center">No internship data available</TableCell>
//                                         </TableRow>
//                                     ) : (
//                                         internshipData.map((row) => (
//                                             <TableRow key={row.Company}>
//                                                 <TableCell>{row.Company}</TableCell>
//                                                 <TableCell>{row.Stipend}</TableCell>
//                                                 <TableCell>{row.TotalOffers}</TableCell>
//                                             </TableRow>
//                                         ))
//                                     )}
//                                 </TableBody>
//                             </Table>
//                         )}
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// }
"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { fetchAnalysisData } from "@/utils/csv-parser"
import type { AnalysisPlacementData, AnalysisInternshipData } from "@/utils/types"

export default function AnalysisPage() {
  const [dataType, setDataType] = useState<'placements' | 'internships'>('placements')
  const [selectedYear, setSelectedYear] = useState("2024")
  const [data, setData] = useState<(AnalysisPlacementData | AnalysisInternshipData)[]>([])  // Allow both types in state
  const [filteredData, setFilteredData] = useState<(AnalysisPlacementData | AnalysisInternshipData)[]>([])  // Allow both types in state
  const [selectedCompany, setSelectedCompany] = useState<string>("")
  const [valueRange, setValueRange] = useState({ min: "", max: "" })
  const [offerRange, setOfferRange] = useState({ min: "", max: "" })

  const years = ["2021", "2022", "2023", "2024"]

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchAnalysisData(selectedYear, dataType)
      setData(result)
      setFilteredData(result)
    }
    fetchData()
  }, [selectedYear, dataType])
  function isPlacementData(item: AnalysisPlacementData | AnalysisInternshipData): item is AnalysisPlacementData {
    return (item as AnalysisPlacementData).CTC !== undefined;
  }
  
  useEffect(() => {
    const filtered = data.filter((item) => {
      const matchesCompany = selectedCompany ? item.Company === selectedCompany : true;
  
      const matchesValueRange = (
        (!valueRange.min || (isPlacementData(item) ? item.CTC : item.Stipend) >= Number(valueRange.min)) &&
        (!valueRange.max || (isPlacementData(item) ? item.CTC : item.Stipend) <= Number(valueRange.max))
      );
  
      const matchesOfferRange = (
        (!offerRange.min || (isPlacementData(item) ? item.FTEOffers : item.TotalOffers) >= Number(offerRange.min)) &&
        (!offerRange.max || (isPlacementData(item) ? item.FTEOffers : item.TotalOffers) <= Number(offerRange.max))
      );
  
      return matchesCompany && matchesValueRange && matchesOfferRange;
    });
  
    setFilteredData(filtered);
  }, [data, selectedCompany, valueRange, offerRange, dataType]);
  

//   const companies = Array.from(new Set(data.map((item: any) => item.Company)))
const companies = Array.from(new Set(data.map((item: AnalysisPlacementData | AnalysisInternshipData) => item.Company)));


  return (
    <div className="min-h-screen bg-gray-950 text-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Analysis</h1>
        <div className="space-y-6">
          <div className="flex gap-4">
            <Button
              variant={dataType === 'placements' ? "default" : "secondary"}
              onClick={() => setDataType('placements')}
            >
              Placements
            </Button>
            <Button
              variant={dataType === 'internships' ? "default" : "secondary"}
              onClick={() => setDataType('internships')}
            >
              Internships
            </Button>
          </div>

          <div className="flex gap-4">
            {years.map((year) => (
              <Button
                key={year}
                variant={selectedYear === year ? "default" : "secondary"}
                onClick={() => setSelectedYear(year)}
              >
                {year}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Company</label>
                    <Select onValueChange={setSelectedCompany}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select company" />
                    </SelectTrigger>
                    <SelectContent>
                        {companies.map((company) => (
                        <SelectItem key={company} value={company}>
                            {company}
                        </SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                    {/* Cross logic to reset selected company */}
                    {selectedCompany && (
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm font-medium">{selectedCompany}</span>
                        <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => setSelectedCompany("")}
                        >
                        ×
                        </button>
                    </div>
                    )}
                </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                {dataType === 'placements' ? 'CTC Range (LPA)' : 'Stipend Range (INR)'}
              </label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={valueRange.min}
                  onChange={(e) => setValueRange({ ...valueRange, min: e.target.value })}
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={valueRange.max}
                  onChange={(e) => setValueRange({ ...valueRange, max: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Offer Range</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={offerRange.min}
                  onChange={(e) => setOfferRange({ ...offerRange, min: e.target.value })}
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={offerRange.max}
                  onChange={(e) => setOfferRange({ ...offerRange, max: e.target.value })}
                />
              </div>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>{dataType === 'placements' ? 'CTC (LPA)' : 'Stipend (INR)'}</TableHead>
                <TableHead>{dataType === 'placements' ? 'FTE Offers' : 'Total Offers'}</TableHead>
              </TableRow>
            </TableHeader>
            {/* <TableBody>
              {filteredData.map((item: AnalysisPlacementData | AnalysisInternshipData, index) => (
                <TableRow key={index}>
                  <TableCell>{item.Company}</TableCell>
                  <TableCell>{dataType === 'placements' ? item.CTC : item.Stipend}</TableCell>
                  <TableCell>{dataType === 'placements' ? item.FTEOffers : item.TotalOffers}</TableCell>
                </TableRow>
              ))}
            </TableBody> */}
            <TableBody>
            {filteredData.map((item, index) => (
                <TableRow key={index}>
                <TableCell>{item.Company}</TableCell>
                <TableCell>
                    {dataType === 'placements' ? (
                    // TypeScript knows item is AnalysisPlacementData here
                    'CTC' in item ? item.CTC : 'N/A' 
                    ) : (
                    // TypeScript knows item is AnalysisInternshipData here
                    'Stipend' in item ? item.Stipend : 'N/A'
                    )}
                </TableCell>
                <TableCell>
                    {dataType === 'placements' ? (
                    'FTEOffers' in item ? item.FTEOffers : 'N/A'
                    ) : (
                    'TotalOffers' in item ? item.TotalOffers : 'N/A'
                    )}
                </TableCell>
                </TableRow>
            ))}
            </TableBody>

          </Table>
        </div>
      </main>
    </div>
  )
}
