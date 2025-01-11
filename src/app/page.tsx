"use client"
import FeaturedProductsCarousel from '@/components/shared/FeaturedProductsCarousel'
import ProductGrid from '@/components/shared/ProductGrid'
import { Featured as FeaturedType, Product as ProductType } from '@/types'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Home = () => {

  const [featured, setFeatured] = useState<(FeaturedType & { product: ProductType })[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);

  const [loadingForFeatured, setLoadingForFeatured] = useState<boolean>(true);
  const [errorForFeatured, setErrorForFeatured] = useState<string | null>(null);

  const [loadingForProductGrid, setLoadingForProductGrid] = useState<boolean>(true);
  const [errorForProductGrid, setErrorForProductGrid] = useState<string | null>(null);


  useEffect(() => {

    const fetchFeatured = async () => {
      try {
        const response = await axios.get('/api/featured');
        setFeatured(response.data);
        setLoadingForFeatured(false);
      } catch (err) {
        console.log(err);
        setErrorForFeatured('Failed to load featured products.');
        setLoadingForFeatured(false);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
        setLoadingForProductGrid(false);
      } catch (err) {
        console.log(err);
        setErrorForProductGrid('Failed to load products.');
        setLoadingForProductGrid(false);
      }
    }

    fetchFeatured();
    fetchProducts();
  }, [])


  return (
    <>


      <h1 className="title-gradient pb-1 mb-4 ml-2">Home</h1>
      <h2 className='title-uppercase ml-2 mb-1'>Featured Products</h2>

      {loadingForFeatured ? (
        <p className='ml-2 text-gray-600'>Loading featured products...</p>
      ) : errorForFeatured ? (
        <p className="text-red-500 ml-2">{errorForFeatured}</p>
      ) : (
        <>
          <FeaturedProductsCarousel featured={featured} />
        </>
      )}

      <h2 className='title-uppercase ml-2 mt-4 mb-1'>New Arrivals</h2>

      {loadingForProductGrid ? (
        <p className='ml-2 text-gray-600'>Loading products...</p>
      ) : errorForProductGrid ? (
        <p className="text-red-500 ml-2">{errorForProductGrid}</p>
      ) : (
        <ProductGrid products={products} />
      )}

    </>
  )
}

export default Home