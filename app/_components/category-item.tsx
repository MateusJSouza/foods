import { Category } from '@prisma/client'
import Image from 'next/image'

interface CategoryItemProps {
  category: Category
}

export function CategoryItem({ category }: CategoryItemProps) {
  return (
    <div className="flex justify-center items-center gap-3 bg-white shadow-md px-4 py-3 rounded-full">
      <Image
        src={category.imageUrl}
        alt={category.name}
        width={30}
        height={30}
      />

      <span className="font-semibold text-sm">{category.name}</span>
    </div>
  )
}
