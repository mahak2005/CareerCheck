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


export interface BranchInternshipData {
  "S.no": string;  
  Name: string;  
  InternshipDetails: string; 
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


// export interface InternshipData {
//   Company: string;
//   Stipend: number;  // Assuming Stipend is a number, but if it's a string, change it accordingly.
//   TotalOffers: number;
// }

// export interface PlacementData {
//   Company: string;
//   CTC: number;  // Assuming CTC is in number format (lakhs).
//   FTEOffers: number;
// }

export interface AnalysisPlacementData {
  Company: string;
  CTC: number;
  FTEOffers: number;
}

export interface AnalysisInternshipData {
  Company: string;
  Stipend: number;
  TotalOffers: number;
}
