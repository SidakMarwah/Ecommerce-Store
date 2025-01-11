'use client'

import * as React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

interface ProductImage {
    src: string
    alt: string
}

interface ProductImageCarouselProps {
    images: ProductImage[]
}

export function ProductImageCarousel({ images }: ProductImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = React.useState(0)

    return (
        <div className="space-y-4">
            <Card className="overflow-hidden">
                <CardContent className="p-0">
                    <img
                        src={images[currentIndex].src}
                        alt={images[currentIndex].alt}
                        fetchPriority="low"
                        loading="lazy"
                        decoding="async"
                        className="object-contain w-full aspect-square"
                    />
                </CardContent>
            </Card>
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-10/12 mx-auto"
            >
                <CarouselContent className="my-1 -ml-1 mr-1">
                    {images.map((image, index) => (
                        <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/4 lg:basis-1/5 flex items-center">
                            <div
                                className={cn(
                                    "relative overflow-hidden rounded-lg cursor-pointer",
                                    currentIndex === index && "ring-2 ring-primary"
                                )}
                                onClick={() => setCurrentIndex(index)}
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    fetchPriority="low"
                                    loading="lazy"
                                    decoding="async"
                                    className="object-contain"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

