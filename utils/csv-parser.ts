// import type { PlacementRecord as ImportedPlacementRecord, CompanyPlacementData, CompanyInternshipData, BranchPlacementData, BranchInternshipData } from './types';
import type { PlacementRecord as ImportedPlacementRecord, CompanyPlacementData, CompanyInternshipData, BranchPlacementData, BranchInternshipData, AnalysisPlacementData, AnalysisInternshipData } from './types';
import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';

export interface PlacementRecord {
  RollNumber: string;
  Name: string;
  FinalOffer: string;
  "CTC (LPA)": string;
}
export interface InternshipRecord {
  "S.no": string;
  Name: string;
  "InternshipDetails": string;
}


// const baseUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : 'http://localhost:3000';
const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://career-check.vercel.app' // Your production site URL
    : 'http://localhost:3000';

export async function fetchPlacementData(year: string, branch: string): Promise<PlacementRecord[]> {
  try {
    console.log(`Fetching data for year: ${year}, branch: ${branch}`);
    if (branch === 'cumulative') {
      const branches = ['cse', 'it', 'ece', 'mae'];
      if (year === '2024') {
        branches.push('cseai');
      }
      let allData: PlacementRecord[] = [];
      for (const b of branches) {
        const response = await fetch(`${baseUrl}/data/${year}/${b}.json`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        allData = allData.concat(data);
      }
      return allData;
    } else {
      const response = await fetch(`${baseUrl}/data/${year}/${branch.toLowerCase()}.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    }
  } catch (error) {
    console.error(`Error fetching placement data: ${error}`);
    return [];
  }

}
export function filterInternshipData(
  data: InternshipRecord[],
  filters: {
    name?: string;
    companies?: string[];
    internshipDetails?: string;
  }
): InternshipRecord[] {
  return data.filter((record) => {
    if (filters.name && !record.Name.toLowerCase().includes(filters.name.toLowerCase())) {
      return false;
    }

    // Access the 'Internship Details' property with bracket notation
    if (filters.companies?.length && !filters.companies.includes(record["InternshipDetails"])) {
      return false;
    }

    if (filters.internshipDetails && !record["InternshipDetails"].toLowerCase().includes(filters.internshipDetails.toLowerCase())) {
      return false;
    }

    return true;
  });
}

export async function fetchAnalysisData(year: string, type: 'placements' | 'internships'): Promise<AnalysisPlacementData[] | AnalysisInternshipData[]> {
  try {
    const response = await fetch(`${baseUrl}/data/${year}/${type}.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.map((item: any) => ({
      ...item,
      CTC: type === 'placements' ? Number(item.CTC) : undefined,
      Stipend: type === 'internships' ? Number(item.Stipend) : undefined,
      FTEOffers: type === 'placements' ? Number(item.FTEOffers) : undefined,
      TotalOffers: type === 'internships' ? Number(item.TotalOffers) : undefined,
    }));
  } catch (error) {
    console.error(`Error fetching ${type} data for ${year}:`, error);
    return [];
  }
}

// //InternShip Analysis table
// export async function fetchInternshipDataAnalysis(year: string): Promise<InternshipData[]> {
//   try {
//     console.log(`Fetching internship data analysis for year: ${year}`);

//     const url = `${baseUrl}/data/${year}/interns.json`;  // Path to the interns JSON for the selected year
//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     return await response.json();  // Return the internship data as an array of InternshipData
//   } catch (error) {
//     console.error(`Error fetching internship data analysis: ${error}`);
//     return [];
//   }
// }


// //Placement Analysis table
// export async function fetchPlacementDataAnalysis(year: string): Promise<PlacementData[]> {
//   try {
//     console.log(`Fetching placement data analysis for year: ${year}`);

//     const url = `${baseUrl}/data/${year}/placements.json`;  // Path to the placements JSON for the selected year
//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     return await response.json();  // Return the placement data as an array of PlacementData
//   } catch (error) {
//     console.error(`Error fetching placement data analysis: ${error}`);
//     return [];
//   }
// }



export async function fetchInternshipData(year: string, branch: string): Promise<InternshipRecord[]> {
  try {
    console.log(`Fetching internship data for year: ${year}, branch: ${branch}`);

    if (branch === 'cumulative') {
      const branches = ['cse', 'it', 'ece', 'mae'];
      if (year === '2024') {
        branches.push('cseai');
      }

      let allData: InternshipRecord[] = [];

      for (const b of branches) {
        const response = await fetch(`${baseUrl}/data/${year}/${b}_internship.json`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: BranchInternshipData[] = await response.json();

        // Map BranchInternshipData to InternshipRecord
        const mappedData: InternshipRecord[] = data.map((item) => ({
          "S.no": item["S.no"],  // Map S.no
          Name: item.Name,        // Map Name
          "InternshipDetails": item.InternshipDetails // Map InternshipDetails
        }));

        allData = allData.concat(mappedData);
      }

      return allData;
    } else {
      const response = await fetch(`${baseUrl}/data/${year}/${branch.toLowerCase()}_internship.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: BranchInternshipData[] = await response.json();

      // Map BranchInternshipData to InternshipRecord
      return data.map((item) => ({
        "S.no": item["S.no"], // Map S.no
        Name: item.Name,       // Map Name
        "InternshipDetails": item.InternshipDetails // Map InternshipDetails
      }));
    }
  } catch (error) {
    console.error(`Error fetching internship data: ${error}`);
    return []; // Return an empty array in case of error
  }
}

// export async function fetchInternshipDataAnalysis(year: string): Promise<InternData[]> {
//   try {
//     console.log(`Fetching internship data analysis for year: ${year}`);

//     // Construct the file path based on the year provided
//     const filePath = `data/${year}/${year}_interns.csv`;

//     // You would normally use fs or an API call here to fetch the CSV data.
//     const response = await fetch(filePath);

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data: InternData[] = await response.json(); // Assuming the CSV file has been parsed into JSON format

//     return data;
//   } catch (error) {
//     console.error(`Error fetching internship data analysis: ${error}`);
//     return [];
//   }
// }


export async function fetchCompanyData(year: string): Promise<{ placements: CompanyPlacementData[], internships: CompanyInternshipData[] }> {
  try {
    const placementsResponse = await fetch(`${baseUrl}/data/companies_data/placements_${year}.json`);
    const internshipsResponse = await fetch(`${baseUrl}/data/companies_data/internships_${year}.json`);

    if (!placementsResponse.ok || !internshipsResponse.ok) {
      throw new Error('Failed to fetch data');
    }

    const placements: CompanyPlacementData[] = await placementsResponse.json();
    const internships: CompanyInternshipData[] = await internshipsResponse.json();

    return { placements, internships };
  } catch (error) {
    console.error('Error fetching company data:', error);
    return { placements: [], internships: [] };
  }
}

export async function fetchBranchData(year: string): Promise<{ placements: BranchPlacementData[], internships: BranchInternshipData[] }> {
  try {
    const placementsResponse = await fetch(`${baseUrl}/data/branches_data/placement_${year}.json`);
    const internshipsResponse = await fetch(`${baseUrl}/data/branches_data/internship_${year}.json`);

    if (!placementsResponse.ok || !internshipsResponse.ok) {
      throw new Error('Failed to fetch data');
    }

    const placements: BranchPlacementData[] = await placementsResponse.json();
    const internships: BranchInternshipData[] = await internshipsResponse.json();

    return { placements, internships };
  } catch (error) {
    console.error('Error fetching branch data:', error);
    return { placements: [], internships: [] };
  }
}

export async function fetchAllYearsData() {
  const companyYears = ['2021', '2022', '2023', '2024'];
  const branchYears = ['2022', '2023', '2024', '2025'];
  const allData = {
    companies: {
      placements: {} as Record<string, CompanyPlacementData[]>,
      internships: {} as Record<string, CompanyInternshipData[]>
    },
    branches: {
      placements: {} as Record<string, BranchPlacementData[]>,
      internships: {} as Record<string, BranchInternshipData[]>
    }
  };

  for (const year of companyYears) {
    const companyData = await fetchCompanyData(year);
    allData.companies.placements[year] = companyData.placements;
    allData.companies.internships[year] = companyData.internships;
  }

  for (const year of branchYears) {
    const branchData = await fetchBranchData(year);
    allData.branches.placements[year] = branchData.placements;
    allData.branches.internships[year] = branchData.internships;
  }

  return allData;
}

export function filterPlacementData(
  data: PlacementRecord[],
  filters: {
    name?: string;
    companies?: string[];
    ctcRange?: { min: string; max: string };
  }
): PlacementRecord[] {
  return data.filter((record) => {
    if (filters.name && !record.Name.toLowerCase().includes(filters.name.toLowerCase())) {
      return false;
    }

    if (filters.companies?.length && !filters.companies.includes(record.FinalOffer)) {
      return false;
    }

    if (filters.ctcRange?.min || filters.ctcRange?.max) {
      const ctc = parseFloat(record["CTC (LPA)"]);
      if (filters.ctcRange.min && ctc < parseFloat(filters.ctcRange.min)) {
        return false;
      }
      if (filters.ctcRange.max && ctc > parseFloat(filters.ctcRange.max)) {
        return false;
      }
    }

    return true;
  });
}