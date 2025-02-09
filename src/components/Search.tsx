import { useState } from 'react'
import '../App.css'

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search = ({ onSearch }: SearchProps) => {
  const [inputValue, setInputValue] = useState('')

  const handleSearchclick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onSearch(inputValue) 
   
  }

  return (
    <div>
        <input 
          className='underline text-2xl' 
          placeholder="Search" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
        /> 
        <button 
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' 
          onClick={handleSearchclick}>Search</button>
    </div>
  )
}

export default Search
