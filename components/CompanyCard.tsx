import Image from 'next/image';
import Link from 'next/link';

interface CompanyCardProps {
  id: string;
  name: string;
  logo: string;
}

export default function CompanyCard({ id, name, logo }: CompanyCardProps) {
  return (
    <Link href={`/internships/${id}`}>
      <div
        className="relative flex items-center border rounded-lg p-6 transition-transform duration-300 transform hover:-translate-y-2 w-[50%] h-40 bg-[#edede9] text-[#003049] mx-auto shadow-[0px_4px_10px_rgba(3,4,94,0.6)] hover:shadow-[0px_8px_20px_rgba(3,4,94,0.8)]"
      >
        <div className="w-50 h-50 flex-shrink-0">
          <Image
            src={logo}
            alt={`${name} logo`}
            width={120}
            height={120}
            className="object-contain"
          />
        </div>
        <div className="flex-grow ml-4">
          <h2 className="text-2xl font-semibold">{name}</h2> {/* Increased text size */}
        </div>
      </div>
    </Link>
  );
}
