import { ChangeEvent } from "react";

interface SearchProps {
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function Search({ handleSearch }: SearchProps) {
  return (
    <form>
      <input
        type="text"
        placeholder="Buscar nota..."
        aria-placeholder="Buscar nota..."
        className="w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none"
        onChange={handleSearch}
      />
    </form>
  );
}
