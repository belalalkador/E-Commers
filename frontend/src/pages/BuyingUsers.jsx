import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';

const BuyingUsers = () => {
    const [buyingData, setBuyingData] = useState([]); 
    const [filteredData, setFilteredData] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [search, setSearch] = useState(''); 

    // Fetch buying data
    useEffect(() => {
        const fetchBuyingData = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/v1/buy/users', {
                    withCredentials: true
                });
                if (res.data.success) {
                    setBuyingData(res.data.buyingRecords || []);
                    setFilteredData(res.data.buyingRecords || []); // Initialize filtered data
                } else {
                    setError('Failed to load buying data.');
                }
            } catch (error) {
                console.error("Error fetching buying data:", error);
                setError('Failed to load buying data.');
            } finally {
                setLoading(false);
            }
        };

        fetchBuyingData();
    }, []);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        filterData(e.target.value);
    };

    // Filter the data based on the search input
    const filterData = (query) => {
        const filtered = buyingData.filter(item =>
            item.userEmail && item.userEmail.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(filtered);
    };

    // Function to delete a buying entry
    const deleteBuyingEntry = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:8080/api/v1/buy/user/${id}`, {
                withCredentials: true
            });
            if (res.data.success) {
                const updatedData = filteredData.filter(item => item.id !== id);
                setFilteredData(updatedData);
                setBuyingData(buyingData.filter(item => item.id !== id));
            } else {
                alert('Failed to delete the buying entry.');
            }
        } catch (error) {
            console.error("Error deleting buying entry:", error);
            alert('An error occurred while deleting the buying entry.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl mx-4 sm:mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Buying Users</h1>
                
                {/* Search Input */}
                <div className="mb-4">
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearchChange}
                        placeholder="Search by email"
                        className="px-4 py-2 border rounded-lg w-full"
                    />
                </div>

                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700 text-left">
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Product Title</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-4">No records found.</td>
                            </tr>
                        ) : (
                            filteredData.map((item) => (
                                <tr key={item.id} className="border-t">
                                    <td className="px-4 py-2">{item.userEmail || 'N/A'}</td>
                                    <td className="px-4 py-2">{item.title || 'N/A'}</td>
                                    <td className="px-4 py-2">${item.price || 'N/A'}</td>
                                    <td className="px-4 py-2">{new Date(item.date).toLocaleDateString() || 'N/A'}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => deleteBuyingEntry(item.id)}
                                            className="text-red-500 hover:text-red-700 transition-colors duration-300"
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BuyingUsers;
