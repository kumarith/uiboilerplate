import { useState } from 'react'
import './App.css'
import Search from './components/search'
import SearchResults from './components/SearchResults';
import DetailsPage from './components/DetailsPage';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDetails, setSelectedDetails] = useState('');
  const openDetils = (id: number) => {
    alert("ID"+id);
     setSelectedDetails(id+"");
  } 

  return (
    <>
    <Search onSearch={(query: string) => setSearchQuery(query)}/>
    <p>Search Query: {searchQuery}</p>
    <SearchResults searchQuery={searchQuery}  openDetails={(id: number) => openDetils(id)}/>
    <DetailsPage id={selectedDetails}/>

    </> 
  )
}

export default App
