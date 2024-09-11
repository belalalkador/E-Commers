import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Layout from "../component/Layout";
import Spinner from "../component/Spinner"; // Assume you have a spinner component for loading states
import ProductCard from "../component/ProductCard"; // Assume you have a product card component for displaying products

const Search = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/v1/product/search?q=${query}`);
                if (res.data.products.length === 0) {
                    setNoResults(true);
                } else {
                    setProducts(res.data.products);
                }
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch search results');
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [query]);

    if (loading) return <Spinner />;
    if (error) return <Layout><p className="text-red-600 min-h-[75vh]">{error}</p>;</Layout>

    return (
        <Layout>
            <div className="min-h-[75vh]">
                {noResults ? (
                    <p className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-500 text-xl mt-10">No results found for "{query}".</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                        {products.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default Search;
