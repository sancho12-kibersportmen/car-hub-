"use client"

import { SearchManufacture } from "./"
import { useState } from "react";

interface SearchBarProps {
  setManufacturer: (value: string) => void;
}

const SearchBar = ({ setManufacturer }: SearchBarProps) => {
  const [manufacturer, setManufacturerLocal] = useState("")
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setManufacturer(manufacturer);
  }

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacture 
          manufacturer={manufacturer}
          setManufacturer={setManufacturerLocal}
        />
      </div>
    </form>
  )
}

export default SearchBar