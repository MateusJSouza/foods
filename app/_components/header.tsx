import Image from 'next/image'
import { Button } from './ui/button'
import { MenuIcon } from 'lucide-react'

export function Header() {
  return (
    <div className="flex justify-between items-center px-5 pt-6">
      <Image src="/logo.png" height={30} width={100} alt="FSW Foods" />

      <Button
        variant="outline"
        size="icon"
        className="bg-transparent border-none"
      >
        <MenuIcon size={20} />
      </Button>
    </div>
  )
}
