import Image from 'next/image'

interface StudentCardProps {
  name: string
  year: number
  branch: string
  image: string
}

export default function StudentCard({ name, year, branch, image }: StudentCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="aspect-square relative">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-gray-600">Year: {year}</p>
        <p className="text-sm text-gray-600">Branch: {branch}</p>
      </div>
    </div>
  )
}

