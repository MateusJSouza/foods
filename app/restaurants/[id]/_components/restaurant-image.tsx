'use client'

import { Button } from '@/app/_components/ui/button'
import { Restaurant } from '@prisma/client'
import { ChevronLeftIcon, HeartIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, 'name' | 'imageUrl'>
}

export function RestaurantImage({ restaurant }: RestaurantImageProps) {
  const router = useRouter()

  function handleBackClick() {
    router.back()
  }

  return (
    <div className="relative w-full h-[250px]">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        className="object-cover"
        fill
      />

      <Button
        className="top-4 left-4 absolute bg-white rounded-full text-foreground hover:text-white"
        size="icon"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        size="icon"
        className="top-4 right-4 absolute bg-gray-700 rounded-full"
      >
        <HeartIcon className="fill-white" size={20} />
      </Button>
    </div>
  )
}
