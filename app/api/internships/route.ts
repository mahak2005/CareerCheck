import { NextResponse } from 'next/server';
import { fetchInternshipData, filterInternshipData } from '@/utils/csv-parser';
import { InternshipRecord } from '@/utils/types'; // Import InternshipRecord

export async function POST(request: Request) {
    try {
        const { year, branch, name, companies } = await request.json();

        // Fetch the internship data based on year and branch
        let data: InternshipRecord[] = await fetchInternshipData(year, branch);

        // Apply filters (no CTC range for internships)
        data = filterInternshipData(data, { name, companies });

        return NextResponse.json({ data });
    } catch (error) {
        console.error('Error processing internship data:', error);
        return NextResponse.json(
            { error: 'Failed to process internship data' },
            { status: 500 }
        );
    }
}
