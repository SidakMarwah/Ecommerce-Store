import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-800 dark:bg-inherit border-t dark:text-gray-200">
            <div className="max-w-6xl mx-auto px-4 py-10 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                    {/* Website Name */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Ecommerce</h2>
                        <p className="text-gray-600 dark:text-gray-400">Your go-to place for amazing products. Developed by <Link href={'https://www.linkedin.com/in/sidakmarwah/'} className='cursor-pointer hover:text-blue-800 hover:dark:text-blue-500 underline'>Sidak Marwah</Link></p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Home</Link></li>
                            <li><Link href="/products" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Products</Link></li>
                            <li><Link href="/categories" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Categories</Link></li>
                            <li><Link href="/account" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Account</Link></li>
                        </ul>
                    </div>

                    {/* Social Media Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                                <Facebook size={24} />
                                <span className="sr-only">Facebook</span>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-400 dark:text-gray-400 dark:hover:text-blue-300 transition-colors">
                                <Twitter size={24} />
                                <span className="sr-only">Twitter</span>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400 transition-colors">
                                <Instagram size={24} />
                                <span className="sr-only">Instagram</span>
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-500 transition-colors">
                                <Linkedin size={24} />
                                <span className="sr-only">LinkedIn</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright Information */}
                <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-sm text-center text-gray-600 dark:text-gray-400">
                    <p>
                        &copy; 2024 Ecommerce. All rights reserved.
                        {' | '}
                        Developed by <Link href={'https://www.linkedin.com/in/sidakmarwah/'} className='cursor-pointer text-blue-800 dark:text-blue-500 underline'>Sidak Marwah</Link>
                    </p>
                    <p className="mt-2">
                        <Link href="/privacy-policy" className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors">Privacy Policy</Link>
                        {' | '}
                        <Link href="/terms-of-service" className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors">Terms of Service</Link>
                    </p>
                </div>
            </div>
        </footer>
    )
}

