import { Header } from '@/app/_components/header'
import { RestaurantItem } from '../../_components/restaurant-item'
import { db } from '../../_lib/prisma'

const RecommendedRestaurants = async () => {
  const restaurants = await db.restaurant.findMany({})

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 font-semibold text-lg">
          Restaurantes Recomendados
        </h2>
        <div className="flex flex-col gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="min-w-full max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default RecommendedRestaurants
