"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Category as CategoryType } from '@/types';
import Link from 'next/link'; // Ensure you import Link from Next.js
import CategoryGrid from '@/components/shared/CategoryGrid';

const Categories: React.FC = () => {
    const [categories, setCategories] = useState<(CategoryType & { parent: CategoryType })[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch categories from the API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/categories');
                setCategories(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load categories.');
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <>

            <h1 className="title-gradient pb-1 mb-4 ml-2">Categories</h1>

            {loading ? (
                <p className=' ml-2'>Loading categories...</p>
            ) : error ? (
                <p className="text-red-500 ml-2">{error}</p>
            ) : (
                <CategoryGrid categories={categories} />
            )}

        </>
    );
};

export default Categories;
