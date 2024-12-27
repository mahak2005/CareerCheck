import Image from 'next/image'
import Link from 'next/link'

interface CompanyCardProps {
  id: string
  name: string
  logo: string
}

export default function CompanyCard({ id, name, logo }: CompanyCardProps) {
  return (
    <Link href={`/internships/${id}`}>
      <div className="flex border rounded-lg p-4 hover:shadow-lg transition-shadow h-24">
        <div className="flex-grow flex items-center">
          <h2 className="text-xl font-semibold">{name}</h2>
        </div>
        <div className="w-16 h-16 flex-shrink-0">
          <Image
            src={logo}
            alt={`${name} logo`}
            width={64}
            height={64}
            className="object-contain"
          />
        </div>
      </div>
    </Link>
  )
}

