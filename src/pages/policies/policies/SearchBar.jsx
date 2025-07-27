import { Search } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export default function SearchBar({ onResults }) {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:3000/search?q=${query}`);
      onResults(res.data); // callback to handle search result
      toast.success("Search complete");
    } catch (err) {
      console.error("Search error", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="relative flex gap-2 items-center">
      <div className="relative flex-1">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-1.5 border rounded-md text-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        />
        <Search
          size={16}
          className="absolute left-3 top-2.5 text-gray-500"
        />
      </div>

      <button
        onClick={handleSearch}
        className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md bg-green-600 text-white hover:bg-green-700 transition-all duration-200 shadow-md"
      >
        <Search size={16} />
        <span>Search</span>
      </button>
    </div>
  );
}
