import { Prisma } from '@prisma/client'
import Image from 'next/image'

import { formatCurrency, calculateProductTotalPrice } from '../_helpers/price'
import { ArrowDownIcon } from 'lucide-react'

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true
        }
      }
    }
  }>
}

export function ProductItem({ product }: ProductItemProps) {
  return (
    <div className="space-y-2 w-[150px] min-w-[150px]">
      <div className="relative w-full h-[150px]">
        <Image
          src={product.imageUrl}
          alt={product.name}
          className="shadow-md rounded-lg object-cover"
          fill
        />

        {product.discountPercentage && (
          <div className="top-2 left-2 absolute flex items-center gap-[2px] bg-primary px-2 py-[2px] rounded-full text-white">
            <ArrowDownIcon size={12} />
            <span className="font-semibold text-xs">
              {product.discountPercentage}%
            </span>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-sm truncate">{product.name}</h2>

        <div className="flex items-center gap-1">
          <h3 className="font-semibold">
            {formatCurrency(calculateProductTotalPrice(product))}
          </h3>

          {product.discountPercentage > 0 && (
            <span className="text-muted-foreground text-xs line-through">
              {formatCurrency(Number(product.price))}
            </span>
          )}
        </div>

        <span className="block text-muted-foreground text-xs">
          {product.restaurant.name}
        </span>
      </div>
    </div>
  )
}
