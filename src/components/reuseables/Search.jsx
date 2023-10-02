import {useState} from 'react'
import { IconSearch } from "@tabler/icons-react";

function Search() {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
    };
  
    const handleChange = (event) => {
      setQuery(event.target.value);
    };
  
    return (

          <div className="flex w-full flex-1 items-center">
            <input
              type="text"
              placeholder="Kirjoita hakusanasi"
              value={query}
              onChange={handleChange}
              className="flex-grow px-2 py-2 text-gray-700 border border-gray-300 rounded-sm focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              onClick={handleSearch}
              className="flex gap-2 ml-2 px-4 py-2 text-white bg-blue-500 rounded-sm hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Hae <IconSearch />
            </button>
          </div>


    );
}

export default Search