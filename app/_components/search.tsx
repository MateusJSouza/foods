'use client'

import { SearchIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { ChangeEvent, FormEventHandler, useState } from 'react'
import { useRouter } from 'next/navigation'

export function Search() {
  const router = useRouter()
  const [search, setSearch] = useState('')

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    if (!search) {
      return
    }

    router.push(`/restaurants?search=${search}`)
  }

  return (
    <form className="flex items-center gap-2" onSubmit={handleSearchSubmit}>
      <Input
        placeholder="Buscar Restaurantes"
        className="border-none"
        onChange={handleChangeInput}
        value={search}
      />

      <Button size="icon" type="submit">
        <SearchIcon size={20} />
      </Button>
    </form>
  )
}
