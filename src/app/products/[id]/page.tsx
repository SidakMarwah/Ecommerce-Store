"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProductImageCarousel } from "@/components/shared/ProductImageCarousel";
import { Product } from "@/types";
import { CartContext } from "@/components/shared/CartContext";

const ProductPage = ({ params }: { params: Promise<{ id: string }> }) => {

    const cartContext = React.useContext(CartContext)
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Handle cart context being undefined
    const addProduct = cartContext?.addProduct || (() => {
        console.warn('CartContext is not available. Add-to-cart functionality is disabled.')
    })
    const removeProduct = cartContext?.removeProduct || (() => {
        console.warn('CartContext is not available. Remove from cart functionality is disabled.')
    })
    const isProductInCart = (productId: string) => cartContext?.isProductInCart(productId)
    const productCountInCart = (productId: string) => cartContext?.productCountInCart(productId)

    const productId = product?._id ? product?._id.toString() : ''
    const isInCart = isProductInCart(productId)
    const quantity = isInCart ? productCountInCart(productId) : 0


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/api/products/${(await params).id}`);
                setProduct(response.data);
                setError(null);
            } catch (err) {
                setError("Failed to fetch product. Please try again later.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!product) return <div>Product not found.</div>;

    const productImages = product.images.map((src) => ({ src, alt: product.title }));

    return (
        <div className="container mx-auto px-4 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image Carousel */}
                <ProductImageCarousel images={productImages} />

                {/* Product Details */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold">{product.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-semibold mb-4">₹{product.price}</p>
                        <p className="text-gray-600 mb-6">
                            {product.description !== "" ? product.description : "This product has no description."}
                        </p>
                        <Separator className="my-4" />
                        {product.properties && (
                            <div className="space-y-2">
                                {Object.entries(product.properties).map(([key, value]) => (
                                    <p key={key}>
                                        <strong>{key}:</strong> {value}
                                    </p>
                                ))}
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="w-full flex items-center justify-between space-x-4 mt-4">
                        {/* Show quantity controls or Add to Cart button */}
                        {isInCart ? (
                            <div className="flex items-center space-x-4 w-full justify-between">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1"
                                    onClick={() => removeProduct(productId)} // Decrease quantity
                                >
                                    -
                                </Button>
                                <span className="flex-1 text-center">{quantity && quantity < 100 ? quantity : '99+'}</span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1"
                                    onClick={() => addProduct(productId)} // Increase quantity
                                >
                                    +
                                </Button>
                            </div>
                        ) : (
                            <Button
                                size="sm"
                                onClick={() => addProduct(productId)}
                                className="w-full"
                            >
                                Add to Cart
                            </Button>
                        )}
                    </CardFooter>

                </Card>
            </div>
        </div>
    );
}

export default ProductPage;