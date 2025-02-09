import { useEffect, useState } from "react";

interface SearchResultsProps {
  searchQuery: string;
  openDetails: (id: number) => void;
}

interface Result {
  id: number;
  firstname: string;
  lastname: string;
  contact_no: string;
  address: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchQuery, openDetails }) => {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!searchQuery) return; // Avoid API calls with an empty query

    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:3000/students?firstname=${searchQuery}`);
        if (!response.ok) throw new Error("Failed to fetch results");

        const data: Result[] = await response.json();
        setResults(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchQuery]);

  return (
    <div className="p-4">
      {loading && <p>Loading results...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && results.length > 0 && (
        <table className="min-w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">FistName</th>
              <th className="border border-gray-300 px-4 py-2">LastName</th>
              <th className="border border-gray-300 px-4 py-2">Contact No</th>
              <th className="border border-gray-300 px-4 py-2">Address</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item) => (
              <tr key={item.id} className="border border-gray-300">
                <td className="border border-gray-300 px-4 py-2"><a onClick={() => openDetails(item.id)}> {item.id} </a></td>
                <td className="border border-gray-300 px-4 py-2">{item.firstname}</td>
                <td className="border border-gray-300 px-4 py-2">{item.lastname}</td>
                <td className="border border-gray-300 px-4 py-2">{item.contact_no}</td>
                <td className="border border-gray-300 px-4 py-2">{item.address}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!loading && !error && results.length === 0 && searchQuery && <p>No results found.</p>}
    </div>
  );
};

export default SearchResults;
