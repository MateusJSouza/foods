import { db } from '../_lib/prisma'
import { ProductItem } from './product-item'

export async function ProductList() {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  })

  return (
    <div className="flex gap-4 [&::-webkit-scrollbar]:hidden px-5 overflow-x-scroll">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  )
}
