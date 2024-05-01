import { Prisma } from '@prisma/client'
import { ProductItem } from './product-item'

interface ProductListProps {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true
        }
      }
    }
  }>[]
}

export function ProductList({ products }: ProductListProps) {
  return (
    <div className="flex gap-4 [&::-webkit-scrollbar]:hidden px-5 overflow-x-scroll">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  )
}
