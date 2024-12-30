import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import type { CompanyInternshipData, CompanyPlacementData } from '@/utils/types';
import { calculateCTCRanges } from '@/utils/csv-parser';

interface CompanyAnalysisChartProps {
  data: (CompanyInternshipData | CompanyPlacementData)[];
  dataType: 'internships' | 'placements';
  selectedYear: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function CompanyAnalysisChart({ data, dataType, selectedYear }: CompanyAnalysisChartProps) {
  const topCompanies = data
    .sort((a, b) => (b as any)[dataType === 'internships' ? 'TotalOffers' : 'FTEOffers'] - (a as any)[dataType === 'internships' ? 'TotalOffers' : 'FTEOffers'])
    .slice(0, 10);

  const topSalaries = data
    .sort((a, b) => (b as any)[dataType === 'internships' ? 'Stipend' : 'CTC'] - (a as any)[dataType === 'internships' ? 'Stipend' : 'CTC'])
    .slice(0, 10);

  const commonCompanies = data.filter(company => 
    data.some(c => c.Company === company.Company && 'FTEOffers' in c && 'TotalOffers' in c)
  );

  const lineChartData = selectedYear === 'all'
    ? data.reduce((acc, item) => {
        const year = (item as any).Year || selectedYear;
        const existingYear = acc.find(d => d.Year === year);
        if (existingYear) {
          existingYear[dataType === 'internships' ? 'TotalOffers' : 'FTEOffers'] += 
            (item as any)[dataType === 'internships' ? 'TotalOffers' : 'FTEOffers'];
        } else {
          acc.push({
            Year: year,
            [dataType === 'internships' ? 'TotalOffers' : 'FTEOffers']: 
              (item as any)[dataType === 'internships' ? 'TotalOffers' : 'FTEOffers']
          });
        }
        return acc;
      }, [] as any[])
    : [];

  const ctcRanges = dataType === 'placements' ? calculateCTCRanges(data as CompanyPlacementData[]) : [];

  return (
    <div className="space-y-8">
      <div className="h-96">
        <h3 className="text-xl font-semibold mb-4">Top Companies by {dataType === 'internships' ? 'Internship Offers' : 'FTE Offers'}</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={topCompanies}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Company" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={dataType === 'internships' ? 'TotalOffers' : 'FTEOffers'} fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="h-96">
        <h3 className="text-xl font-semibold mb-4">Top Companies by {dataType === 'internships' ? 'Stipend' : 'CTC'}</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={topSalaries}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Company" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={dataType === 'internships' ? 'Stipend' : 'CTC'} fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {commonCompanies.length > 0 && (
        <div className="h-96">
          <h3 className="text-xl font-semibold mb-4">Companies with both Internship and FTE Offers</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={commonCompanies}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Company" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="FTEOffers" fill="#8884d8" />
              <Bar dataKey="TotalOffers" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {dataType === 'placements' && (
        <div className="h-96">
          <h3 className="text-xl font-semibold mb-4">CTC Distribution</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={ctcRanges}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {ctcRanges.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {selectedYear === 'all' && (
        <div className="h-96">
          <h3 className="text-xl font-semibold mb-4">{dataType === 'internships' ? 'Internship' : 'FTE'} Offers Over Years</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={dataType === 'internships' ? 'TotalOffers' : 'FTEOffers'} stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

