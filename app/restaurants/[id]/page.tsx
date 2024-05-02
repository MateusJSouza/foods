import { db } from '@/app/_lib/prisma'
import { notFound } from 'next/navigation'
import { RestaurantImage } from './_components/restaurant-image'
import Image from 'next/image'
import { StarIcon } from 'lucide-react'
import DeliveryInfo from '@/app/_components/delivery-info'
import { ProductList } from '@/app/_components/product-list'

interface RestaurantPageProps {
  params: {
    id: string
  }
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          products: {
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        where: {
          restaurantId: id,
        },
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  })

  if (!restaurant) {
    notFound()
  }

  return (
    <div>
      <RestaurantImage restaurant={restaurant} />

      <div className="relative z-50 flex justify-between items-center bg-white mt-[-1.5rem] px-5 py-5 pt-5 rounded-tl-3xl rounded-tr-3xl">
        <div className="flex items-center gap-[0.375rem]">
          <div className="relative w-6 h-6">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>

          <h1 className="font-semibold text-xl">{restaurant.name}</h1>
        </div>

        <div className="flex items-center gap-[3px] bg-foreground px-2 py-[2px] rounded-full text-white">
          <StarIcon className="fill-yellow-400 text-yellow-400" size={12} />
          <span className="font-semibold text-xs">5.0</span>
        </div>
      </div>

      <div className="px-5">
        <DeliveryInfo restaurant={restaurant} />
      </div>

      <div className="flex gap-4 [&::-webkit-scrollbar]:hidden mt-3 px-5 overflow-x-scroll">
        {restaurant.categories.map((category) => (
          <div
            key={category.id}
            className="bg-[#F4F4F4] rounded-lg min-w-[167px] text-center"
          >
            <span className="text-muted-foreground text-xs">
              {category.name}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-4 mt-6">
        <h2 className="px-5 font-semibold">Mais pedidos</h2>

        <ProductList products={restaurant.products} />
      </div>

      {restaurant.categories.map((category) => (
        <div className="space-y-4 mt-6" key={category.id}>
          <h2 className="px-5 font-semibold">{category.name}</h2>

          <ProductList products={category.products} />
        </div>
      ))}
    </div>
  )
}

export default RestaurantPage
