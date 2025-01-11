"use client"

import Link from 'next/link'
import React, { useContext } from 'react'
import { MobileNavSheet } from './MobileNavSheet';
import { ThemeModeToggle } from './ThemeModeToggle';
import { CircleUser, House, Logs, PackageSearch, ShoppingCart, Store } from 'lucide-react';
import { CartContext } from './CartContext';

const Header = () => {

	const cartContext = useContext(CartContext);
	const cartProducts = cartContext?.cartProducts || [];

	return (
		<header className='bg-gray-100 dark:bg-inherit border-b sticky top-0 z-10'>
			<nav className='flex justify-between items-center pl-8 pr-8 py-3 md:py-5'>
				<Link className='sm:text-2xl text-lg font-semibold flex gap-1 items-center justify-center' href={'/'}><Store strokeWidth={1} absoluteStrokeWidth /> Ecommerce</Link>
				<div className='md:hidden flex gap-2 items-center'>
					<ThemeModeToggle />
					<MobileNavSheet>
						<div className={`w-full flex flex-col mt-2 justify-center items-start gap-3 pb-6 pr-8`}>
							<Link className={'cursor-pointer hover:underline flex gap-1'} href={'/'}>Home <House /></Link>
							<Link className={'cursor-pointer hover:underline flex gap-1'} href={'/products'}>Products <PackageSearch /></Link>
							<Link className={'cursor-pointer hover:underline flex gap-1'} href={'/categories'}>Categories <Logs /></Link>
							<Link className={'cursor-pointer hover:underline flex gap-1'} href={'/account'}>Account <CircleUser /></Link>
							<Link className={'cursor-pointer hover:underline flex gap-1'} href={'/cart'}>Cart <ShoppingCart />({cartProducts.length < 100 ? cartProducts.length : '99+'})</Link>
						</div>
					</MobileNavSheet>
				</div>


				<div className='h-full hidden gap-4 md:flex md:justify-center md:items-center'>
					<Link className='cursor-pointer hover:underline' href={'/'}>Home</Link>
					<Link className='cursor-pointer hover:underline' href={'/products'}>Products</Link>
					<Link className='cursor-pointer hover:underline' href={'/categories'}>Categories</Link>
					<Link className='cursor-pointer hover:underline' href={'/account'}>Account</Link>
					<Link className='cursor-pointer hover:underline' href={'/cart'}>Cart({cartProducts.length < 100 ? cartProducts.length : '99+'})</Link>
					<ThemeModeToggle />
				</div>
			</nav>
		</header>
	)
}

export default Header