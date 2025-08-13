import { MagnifyingGlass } from '@phosphor-icons/react'
import { ChangeEvent } from 'react'

interface SearchProps {
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}

export function Search({ handleSearch }: SearchProps) {
  return (
    <form>
      <div className="flex items-center gap-2 border-b border-b-slate-700 focus-within:border-b-lime-300 transition">
        <MagnifyingGlass weight="bold" className="text-slate-500 size-6" />
        <input
          type="text"
          placeholder="Buscar nota..."
          aria-placeholder="Buscar nota..."
          className="w-full bg-transparent text-xl lg:text-xl font-semibold tracking-tight placeholder:text-slate-500 py-2 outline-none"
          onChange={handleSearch}
        />
      </div>
    </form>
  )
}
