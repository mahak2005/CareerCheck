export interface PlacementRecord {
  RollNumber: string;
  Name: string;
  FinalOffer: string;
  "CTC (LPA)": string;
}

export async function fetchPlacementData(year: string, branch: string): Promise<PlacementRecord[]> {
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';

    if (branch === 'cumulative') {
      const branches = ['cse', 'it', 'ece', 'mae'];
      if (year === '2023') {
        branches.push('barch');
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

export function filterPlacementData(
  data: PlacementRecord[],
  filters: {
    name?: string;
    companies?: string[];
    ctcRange?: { min: string; max: string };
  }
): PlacementRecord[] {
  return data.filter((record) => {
    // Name filter
    if (filters.name && !record.Name.toLowerCase().includes(filters.name.toLowerCase())) {
      return false;
    }

    // Companies filter
    if (filters.companies?.length && !filters.companies.includes(record.FinalOffer)) {
      return false;
    }

    // CTC range filter
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

