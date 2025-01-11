"use client"

import ProductGrid from '@/components/shared/ProductGrid'
import { Category, Product as ProductType } from '@/types'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const CategorySpecific: React.FC<{ params: Promise<{ id: string }> }> = ({ params }: { params: Promise<{ id: string }> }) => {

    const [products, setProducts] = useState<ProductType[]>([]);
    const [category, setCategory] = useState<Category>();

    const fetchProducts = async () => {
        const response = await axios.get(`/api/products?category=${(await params).id}`);
        const data = response.data;
        setProducts(data.products);
        setCategory(data.category);

    }

    useEffect(() => {
        fetchProducts();
    }, [])

    return (
        <>


            <h1 className="title-gradient pb-1 mb-4 ml-2"><Link href={"/categories"}>Categories</Link> / {category?.name}</h1>

            <ProductGrid products={products} />


        </>
    )
}

export default CategorySpecific