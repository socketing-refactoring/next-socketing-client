import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="hidden pl-10 mt-1 lg:flex md:w-[30%] lg:w-[40%] justify-center">
      <div className="relative w-full max-w-lg">
        <input
          type="text"
          placeholder="공연 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full py-2 pl-5 pr-12 text-sm text-gray-700 rounded-full shadow-lg bg-white outline-none placeholder-gray-400 focus:ring-2 focus:ring-gray-400"
        />
      </div>
    </div>
  );
};

export default SearchBar;
