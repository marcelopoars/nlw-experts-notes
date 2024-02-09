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
        className="w-full bg-transparent text-xl lg:text-2xl font-semibold tracking-tight placeholder:text-slate-500 py-2 outline-none border-b border-b-slate-700"
        onChange={handleSearch}
      />
    </form>
  );
}
