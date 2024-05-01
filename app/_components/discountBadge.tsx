import { Product } from '@prisma/client'
import { ArrowDownIcon } from 'lucide-react'

interface DiscountBadgeProps {
  product: Pick<Product, 'discountPercentage'>
}

export function DiscountBadge({ product }: DiscountBadgeProps) {
  return (
    <div className="flex items-center gap-[2px] bg-primary px-2 py-[2px] rounded-full text-white">
      <ArrowDownIcon size={12} />
      <span className="font-semibold text-xs">
        {product.discountPercentage}%
      </span>
    </div>
  )
}
