import { BikeIcon, TimerIcon } from 'lucide-react'
import { Card } from './ui/card'
import { formatCurrency } from '../_helpers/price'
import { Restaurant } from '@prisma/client'

interface DeliveryInfoProps {
  restaurant: Pick<Restaurant, 'deliveryFee' | 'deliveryTimeMinutes'>
}

const DeliveryInfo = ({ restaurant }: DeliveryInfoProps) => {
  return (
    <>
      <Card className="flex justify-around mt-6 py-3">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-xs">Entrega</span>
            <BikeIcon size={14} />
          </div>

          {Number(restaurant.deliveryFee) > 0 ? (
            <p className="font-semibold text-xs">
              {formatCurrency(Number(restaurant.deliveryFee))}
            </p>
          ) : (
            <p className="font-semibold text-xs">Grátis</p>
          )}
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-xs">Entrega</span>
            <TimerIcon size={14} />
          </div>

          <p className="font-semibold text-xs">
            {restaurant.deliveryTimeMinutes} min
          </p>
        </div>
      </Card>
    </>
  )
}

export default DeliveryInfo
