import { parse } from 'csv-parse/sync'
import fs from 'fs/promises'

export interface PlacementRecord {
  RollNumber: string
  Name: string
  FinalOffer: string
  "CTC (Lakh)": string
}

export async function readCSVFile(year: string, branch: string): Promise<PlacementRecord[]> {
  try {
    const filePath = `data/${year}/${branch.toLowerCase()}.csv`
    const fileContent = await fs.readFile(filePath, 'utf-8')
    return parse(fileContent, {
      columns: true,
      skip_empty_lines: true
    }) as PlacementRecord[]
  } catch (error) {
    console.error(`Error reading CSV file: ${error}`)
    return []
  }
}

export function filterPlacementData(
  data: PlacementRecord[],
  filters: {
    rollNumber?: string
    companies?: string[]
    ctcRange?: { min: string; max: string }
  }
): PlacementRecord[] {
  return data.filter((record) => {
    // Roll number filter
    if (filters.rollNumber && !record.RollNumber.includes(filters.rollNumber)) {
      return false
    }

    // Companies filter
    if (
      filters.companies?.length &&
      !filters.companies.includes(record.FinalOffer)
    ) {
      return false
    }

    // CTC range filter
    if (filters.ctcRange?.min || filters.ctcRange?.max) {
      const ctc = parseFloat(record["CTC (Lakh)"])
      if (
        filters.ctcRange.min &&
        ctc < parseFloat(filters.ctcRange.min)
      ) {
        return false
      }
      if (
        filters.ctcRange.max &&
        ctc > parseFloat(filters.ctcRange.max)
      ) {
        return false
      }
    }

    return true
  })
}

