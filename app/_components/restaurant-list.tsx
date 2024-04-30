import { db } from '../_lib/prisma'
import { RestaurantItem } from './restaurant-item'

export async function RestaurantList() {
  const restaurants = await db.restaurant.findMany({ take: 10 })

  return (
    <div className="flex gap-4 [&::-webkit-scrollbar]:hidden px-5 overflow-x-scroll">
      {restaurants.map((restaurant) => (
        <RestaurantItem key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  )
}
