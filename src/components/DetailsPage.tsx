import { useEffect, useState } from "react";

interface Record {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface DetailsPageProps {
  id: string;
}

const DetailsPage: React.FC<DetailsPageProps> = ({ id }) => {
  const [record, setRecord] = useState<Record | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Record | null>(null);

  useEffect(() => {
    const fetchRecord = async () => {
      setLoading(true);
      setError(null);
      try {
        alert("Feathing deails form id"+id);
        const response = await fetch(`http://localhost:3000/students?id=${id}`);
        if (!response.ok) throw new Error("Failed to fetch record");
        const data: Record = await response.json();
        setRecord(data);
        setFormData(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecord();
  }, [id]);

  const handleEdit = () => setIsEditing(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSave = async () => {
    if (!formData) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3000/students?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update record");

      const updatedData: Record = await response.json();
      setRecord(updatedData);
      setIsEditing(false);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!record) return <p>No record found.</p>;

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">Record Details</h2>
      <form className="space-y-3">
        <label className="block">
          <span className="text-gray-700">Name:</span>
          <input
            type="text"
            name="name"
            value={formData?.name || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className="block w-full mt-1 p-2 border rounded"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Email:</span>
          <input
            type="email"
            name="email"
            value={formData?.email || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className="block w-full mt-1 p-2 border rounded"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Phone:</span>
          <input
            type="text"
            name="phone"
            value={formData?.phone || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className="block w-full mt-1 p-2 border rounded"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Address:</span>
          <input
            type="text"
            name="address"
            value={formData?.address || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className="block w-full mt-1 p-2 border rounded"
          />
        </label>

        <div className="flex gap-4 mt-4">
          {!isEditing ? (
            <button
              type="button"
              onClick={handleEdit}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default DetailsPage;
