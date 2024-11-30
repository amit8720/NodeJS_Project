
import { useState, useEffect } from 'react';

const useFetchCategories = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/categories');
                if (!response.ok) {
                    const errorText = await response.text(); // Get response text for debugging
                    throw new Error(`Error ${response.status}: ${errorText}`);
                }
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Failed to fetch categories:', error);
                throw error; // Re-throw the error to handle it where you call this function
            }
        };
        

        fetchCategories();
    }, []);

    return { categories, error };
};

export default useFetchCategories;
