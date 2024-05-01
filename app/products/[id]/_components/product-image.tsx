'use client'

import { Button } from '@/app/_components/ui/button'
import { Product } from '@prisma/client'
import { ChevronLeftIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface ProductImageProps {
  product: Pick<Product, 'name' | 'imageUrl'>
}

export function ProductImage({ product }: ProductImageProps) {
  const router = useRouter()

  function handleBackClick() {
    router.back()
  }

  return (
    <div className="relative w-full h-[360px]">
      <Image
        src={product.imageUrl}
        alt={product.name}
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
    </div>
  )
}
