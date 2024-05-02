import Image from 'next/image'
import { Button } from './ui/button'
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'

export function Header() {
  return (
    <div className="flex justify-between items-center px-5 pt-6">
      <div className="relative w-[100px] h-[30px]">
        <Link href="/">
          <Image
            src="/logo.png"
            fill
            className="object-cover"
            alt="FSW Foods"
          />
        </Link>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="bg-transparent border-none"
      >
        <MenuIcon />
      </Button>
    </div>
  )
}
