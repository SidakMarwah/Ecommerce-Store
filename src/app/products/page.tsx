"use client"

import ProductGrid from '@/components/shared/ProductGrid'
import { Product as ProductType } from '@/types'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Products: React.FC = () => {

    const [products, setProducts] = useState<ProductType[]>([]);

    const fetchProducts = async () => {
        const response = await axios.get('/api/products');
        const data = response.data;
        setProducts(data);

    }

    useEffect(() => {
        fetchProducts();
    }, [])

    return (
        <>


            <h1 className="title-gradient pb-1 mb-4 ml-2">Products</h1>

            <ProductGrid products={products} />


        </>
    )
}

export default Products