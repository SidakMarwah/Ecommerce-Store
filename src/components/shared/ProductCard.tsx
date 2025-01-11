import * as React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Product } from "@/types"
import TruncatedText from "./TruncatedText"
import Link from "next/link"
import { CartContext } from "./CartContext"

export default function ProductCard(product: Product) {
    const cartContext = React.useContext(CartContext)

    // Handle cart context being undefined
    const addProduct = cartContext?.addProduct || (() => {
        console.warn('CartContext is not available. Add-to-cart functionality is disabled.')
    })
    const removeProduct = cartContext?.removeProduct || (() => {
        console.warn('CartContext is not available. Remove from cart functionality is disabled.')
    })
    const isProductInCart = (productId: string) => cartContext?.isProductInCart(productId)
    const productCountInCart = (productId: string) => cartContext?.productCountInCart(productId)

    const productId = product._id ? product._id.toString() : ''
    const isInCart = isProductInCart(productId)
    const quantity = isInCart ? productCountInCart(productId) : 0

    return (
        <Card className="w-full max-w-xs rounded-xl border width flex flex-col h-full">
            <div className="grid gap-4 p-4 flex-grow">
                <Link href={`/products/${product._id}`}>
                    <img
                        src={product.images[0]}
                        alt="Product image"
                        className="h-60 object-contain border w-full rounded-xl bg-white"
                    />
                </Link>
                <div className="grid gap-1.5">
                    <Link href={`/products/${product._id}`}>
                        <TruncatedText lines={1} className="hover:underline font-semibold text-sm md:text-base">
                            {product.title}
                        </TruncatedText>
                    </Link>
                    <p className="font-semibold text-sm md:text-base">₹{product.price}</p>
                    <TruncatedText lines={2} className="title-italic-spaced">
                        {product.description !== "" ? product.description : "This product has no description."}
                    </TruncatedText>
                </div>

                <div className="grid mt-auto">
                    {/* Show quantity controls or Add to Cart button */}
                    {isInCart ? (
                        <div className="flex justify-center items-center">
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
                        >
                            Add to Cart
                        </Button>
                    )}
                </div>
            </div>
        </Card>
    )
}
