import Image, { ImageProps } from 'next/image'

export function PromoBanner(props: ImageProps) {
  return (
    <Image
      height={0}
      width={0}
      className="w-full h-auto object-contain"
      sizes="100vw"
      quality={100}
      {...props}
    />
  )
}
