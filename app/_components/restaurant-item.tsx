import { Restaurant } from '@prisma/client'
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from 'lucide-react'
import Image from 'next/image'
import { formatCurrency } from '../_helpers/price'
import { Button } from './ui/button'

interface RestaurantItemProps {
  restaurant: Restaurant
}

export function RestaurantItem({ restaurant }: RestaurantItemProps) {
  return (
    <div className="space-y-3 min-w-[266px] max-w-[266px]">
      <div className="relative w-full h-[136px]">
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
          className="rounded-lg object-cover"
          fill
        />

        <div className="top-2 left-2 absolute flex items-center gap-[2px] bg-primary bg-white px-2 py-[2px] rounded-full">
          <StarIcon className="fill-yellow-500 text-yellow-400" size={12} />
          <span className="font-semibold text-xs">5.0</span>
        </div>

        <Button
          size="icon"
          className="top-2 right-2 absolute bg-gray-700 rounded-full h-7"
        >
          <HeartIcon className="fill-white" size={16} />
        </Button>
      </div>

      <div>
        <h3 className="font-semibold text-sm">{restaurant.name}</h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <BikeIcon size={14} className="text-primary" />
            <span className="text-muted-foreground text-xs">
              {Number(restaurant.deliveryFee) === 0
                ? 'Entrega grátis'
                : formatCurrency(Number(restaurant.deliveryFee))}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <TimerIcon size={14} className="text-primary" />
            <span className="text-muted-foreground text-xs">
              {restaurant.deliveryTimeMinutes} min
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
