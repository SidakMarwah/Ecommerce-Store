'use client'

import * as React from 'react'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Featured as FeaturedType, Product as ProductType } from "@/types"; // Import the type
import TruncatedText from './TruncatedText'
import Link from 'next/link'
import { CartContext } from './CartContext'


type FeaturedProductsCarouselProps = {
  featured: (FeaturedType & { product: ProductType })[];
};

export default function FeaturedProductsCarousel({ featured }: FeaturedProductsCarouselProps) {

  const cartContext = React.useContext(CartContext);

  // Handle cart context being undefined
  const addProduct = cartContext?.addProduct || (() => {
    console.warn('CartContext is not available. Add-to-cart functionality is disabled.');
  });

  const removeProduct = cartContext?.removeProduct || (() => {
    console.warn('CartContext is not available. Remove from cart functionality is disabled.');
  });

  const isProductInCart = (productId: string) => cartContext?.isProductInCart(productId);
  const productCountInCart = (productId: string) => cartContext?.productCountInCart(productId);



  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [isPaused, setIsPaused] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = React.useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index)
  }, [emblaApi])

  React.useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on('select', onSelect)
    onSelect()

    const interval = setInterval(() => {
      if (!isPaused) {
        emblaApi.scrollNext()
      }
    }, 5000) // Change slide every 5 seconds

    return () => {
      clearInterval(interval)
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, isPaused])

  const handleMouseEnter = () => setIsPaused(true)
  const handleMouseLeave = () => setIsPaused(false)

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {featured.map((fp, index) => {

              const productId = fp.product._id ? fp.product._id.toString() : ''; // Convert to string or use empty string if undefined

              const isInCart = isProductInCart(productId);
              const quantity = isInCart ? productCountInCart(productId) : 0;


              return <div key={index} className="flex-[0_0_100%] min-w-0">
                <Card className="h-full">
                  <CardContent className="p-6 h-full">
                    <div className="flex flex-col md:flex-row md:items-start md:gap-6 h-full">
                      <div className="w-full md:w-1/2 mb-4 md:mb-0">
                        <Image
                          src={fp?.product?.images[0]}
                          alt={fp?.product?.title}
                          width={400}
                          height={400}
                          className="w-full h-auto object-cover rounded-md"
                        />
                      </div>
                      <div className="flex flex-col justify-between md:w-1/2 h-full">
                        <div>
                          <h3 className="truncate-lines-1 font-semibold text-2xl mb-2">
                            {fp?.product?.title}
                          </h3>
                          <p className="text-primary text-xl mb-4">₹{fp?.product?.price}</p>
                          <TruncatedText lines={3} className='text-muted-foreground mb-6'>
                            {fp?.product?.description !== "" ? fp?.product?.description : "This product has no description."}
                          </TruncatedText>
                        </div>
                        <div className="flex gap-4">
                          <Link href={`/products/${fp?.product?._id}`} className="flex-1">
                            <Button variant="outline" className='w-full'>Read More</Button>
                          </Link>

                          {isInCart ? (
                            <div className='flex-1 flex justify-center items-center
                            '>
                              <Button
                                variant="outline"
                                className='flex-1'
                                onClick={() => removeProduct(productId)} // Decrease quantity
                              >
                                -
                              </Button>
                              <span className="flex flex-1 items-center justify-center w-12 text-lg">
                                {quantity && quantity < 100 ? quantity : '99+'}
                              </span>
                              <Button
                                variant="outline"
                                className='flex-1'
                                onClick={() => addProduct(productId)} // Increase quantity
                              >
                                +
                              </Button>
                            </div>
                          ) : (
                            <div className="flex-1">
                              <Button
                                className='w-full'
                                onClick={() => addProduct(productId)}
                              >
                                Add to Cart
                              </Button>
                            </div>
                          )}


                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={scrollPrev}
          className="flex items-center gap-2"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only md:not-sr-only">Previous</span>
        </Button>
        <div className="flex justify-center gap-2">
          {featured.map((_, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className={`w-3 h-3 p-0 rounded-full ${selectedIndex === index ? 'bg-primary' : ''}`}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={scrollNext}
          className="flex items-center gap-2"
          aria-label="Next slide"
        >
          <span className="sr-only md:not-sr-only">Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}