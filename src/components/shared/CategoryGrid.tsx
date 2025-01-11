import { Category as CategoryType } from '@/types'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { FolderIcon, TagIcon } from 'lucide-react'

const CategoryGrid = ({ categories, className }: { categories: (CategoryType & { parent: CategoryType; })[], className?: string }) => {
    return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 ${className}`}>
            {categories.map((category, index) => (
                <Link href={`/categories/${category._id}`} key={index} className="block group">
                    <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out transform hover:shadow-lg hover:-translate-y-1">
                        <CardHeader className="bg-primary/10 pb-2">
                            <CardTitle className="flex items-center justify-center space-x-2 text-lg font-bold text-primary group-hover:scale-105 transition-transform duration-300">
                                {category.parent ? (
                                    <TagIcon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                                ) : (
                                    <FolderIcon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                                )}
                                <span>{category.name}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4 group-hover:bg-secondary/5 transition-colors duration-300">
                            {category.parent && (
                                <CardDescription className="text-center">
                                    <Badge
                                        variant="outline"
                                        className="mt-2 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
                                    >
                                        {category.parent.name}
                                    </Badge>
                                </CardDescription>
                            )}
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    )
}

export default CategoryGrid

