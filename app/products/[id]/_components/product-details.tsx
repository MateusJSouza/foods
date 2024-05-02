'use client'

import { DiscountBadge } from '@/app/_components/discountBadge'
import { ProductList } from '@/app/_components/product-list'
import { Button } from '@/app/_components/ui/button'
import { Card } from '@/app/_components/ui/card'
import {
  calculateProductTotalPrice,
  formatCurrency,
} from '@/app/_helpers/price'
import { Prisma } from '@prisma/client'
import {
  BikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TimerIcon,
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true
    }
  }>
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true
    }
  }>[]
}

export function ProductDetails({
  product,
  complementaryProducts,
}: ProductDetailsProps) {
  const [amount, setAmount] = useState(1)

  function handleIncreaseAmount() {
    setAmount((prevState) => prevState + 1)
  }

  function handleDecreaseAmount() {
    setAmount((prevState) => {
      if (prevState === 1) return 1

      return prevState - 1
    })
  }

  return (
    <div className="relative z-50 bg-white mt-[-1.5rem] py-5 rounded-tl-3xl rounded-tr-3xl">
      {/* RESTAURANTE */}
      <div className="flex items-center gap-[0.375rem] px-5">
        <div className="relative w-6 h-6">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            className="rounded-full object-cover"
            fill
          />
        </div>

        <span className="text-muted-foreground text-sm">
          {product.restaurant.name}
        </span>
      </div>

      {/* NOME DO PRODUTO */}
      <h1 className="mt-1 mb-3 px-5 font-semibold text-xl">{product.name}</h1>

      {/* PREÇO DO PRODUTO E QUANTIDADE */}
      <div className="flex justify-between items-center px-5">
        {/* PREÇO COM DESCONTO */}
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-xl">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h2>

            {product.discountPercentage > 0 && (
              <DiscountBadge product={product} />
            )}
          </div>

          {/* PREÇO ORIGINAL */}
          {product.discountPercentage > 0 && (
            <p className="text-muted-foreground text-sm">
              De: {formatCurrency(Number(product.price))}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 text-center">
          <Button
            size="icon"
            variant="ghost"
            className="border-muted-foreground border border-solid"
            onClick={handleDecreaseAmount}
          >
            <ChevronLeftIcon />
          </Button>
          <span className="w-4">{amount}</span>
          <Button size="icon" onClick={handleIncreaseAmount}>
            <ChevronRightIcon />
          </Button>
        </div>
      </div>

      {/* DADOS DA ENTREGA */}
      <div className="px-5">
        <Card className="flex justify-around mt-6 py-3">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-xs">Entrega</span>
              <BikeIcon size={14} />
            </div>

            {Number(product.restaurant.deliveryFee) > 0 ? (
              <p className="font-semibold text-xs">
                {formatCurrency(Number(product.restaurant.deliveryFee))}
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
              {product.restaurant.deliveryTimeMinutes} min
            </p>
          </div>
        </Card>
      </div>

      <div className="space-y-3 mt-6 px-5">
        <h3 className="font-semibold">Sobre</h3>
        <p className="text-muted-foreground text-sm">{product.description}</p>
      </div>

      <div className="space-y-3 mt-6">
        <h3 className="px-5 font-semibold">Sucos</h3>
        <ProductList products={complementaryProducts} />
      </div>

      <div className="mt-6 px-5">
        <Button className="w-full font-semibold">Adicionar à Sacola</Button>
      </div>
    </div>
  )
}
