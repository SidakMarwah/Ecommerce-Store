import ProductCard from "./ProductCard"
import { Product } from "@/types"

interface ProductGridProps {
    products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
    return (
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center sm:place-items-stretch">
            {products?.length === 0 && (
                <p className="m-3">No products to display.</p>
            )}
            {products.map((product, index) => (
                <ProductCard key={index} {...product} />
            ))}
        </div>
    )
}
