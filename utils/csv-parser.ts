import type { PlacementRecord as ImportedPlacementRecord, CompanyPlacementData, CompanyInternshipData, BranchPlacementData, BranchInternshipData } from './types';

export interface PlacementRecord {
  RollNumber: string;
  Name: string;
  FinalOffer: string;
  "CTC (LPA)": string;
}

// const baseUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : 'http://localhost:3000';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

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