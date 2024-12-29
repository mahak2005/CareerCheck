export interface PlacementRecord {
  RollNumber: string;
  Name: string;
  FinalOffer: string;
  "CTC (LPA)": string;
}

export interface CompanyPlacementData {
  Company: string;
  "CTC (LPA)": number;
  "FTE Offers": number;
}

export interface CompanyInternshipData {
  "company Name": string;
  "Stipend (INR per month)": number;
  "Internship Offers": number;
}

export interface BranchPlacementData {
  Branch: string;
  "Total Students": number;
  "Placed Students": number;
  "6 Month Interns": number;
  "Highest CTC (LPA)": number;
  "Highest CTC Company": string;
  "Highest Stipend (LPM)": number;
  "Highest Stipend Company": string;
}

export interface BranchInternshipData {
  Branch: string;
  "Total Students": number;
  "Interned Students": number;
  "Highest Stipend (LPM)": number;
  "Highest Stipend Company": string;
}

export interface CTCRange {
  range: string;
  count: number;
}

