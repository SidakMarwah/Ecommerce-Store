"use client"

import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { Product as ProductType } from "@/types"
import { CartContext } from "@/components/shared/CartContext"
import TruncatedText from "@/components/shared/TruncatedText"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { OrderSuccessDialog } from "@/components/shared/OrderSuccessDialog"
import { ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Cart() {

  const cartContext = useContext(CartContext);
  const router = useRouter();

  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
    products: string[];
  }>({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
    products: []
  });
  const [checkoutResult, setCheckoutResult] = useState<{
    _id?: string | undefined; customerInfo?: { name: string; email: string; } | undefined; itemsOrdered?: { title: string; quantity: number; }[] | undefined; totalAmount?: number | undefined; createdAt?: string | undefined;
  }>({});
  const [successOverlay, setSuccessOverlay] = useState<boolean>(false);
  function handleClose() {
    setSuccessOverlay(false);
  }

  const cartProducts = cartContext?.cartProducts || [];

  useEffect(() => {
    // console.log(cartProducts);

    const fetchCartProducts = async () => {
      try {
        const response = await axios.post('/api/cart', { productIds: cartProducts });
        setProducts(response.data);
      } catch (err) {
        console.log(err)
        setError('Failed to load cart products.');
      }
    };

    if (cartProducts.length > 0) {
      fetchCartProducts();
      setLoading(false);
    }


    setFormData({ ...formData, products: cartProducts })

  }, [cartProducts])

  // useEffect(() => {
  //   console.log(formData);

  // }, [formData])

  let total = 0;
  for (const productId of cartProducts) {
    const price = Number(products.find(p => p._id === productId)?.price) || 0;
    total += price;
  }

  async function placeOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // console.log(formData);

    try {
      const response = await axios.post('/api/checkout', formData);
      const data = response.data;
      // console.log(data);

      if (data.orderInfo) {
        setSuccessOverlay(true);
        setCheckoutResult(data.orderInfo);
        cartContext?.clearCart(); // Clear the cart
        setProducts([]);          // Reset the products state
      }
    } catch (error: unknown) {
      // console.log(error);
      console.log('Some error occured while checkout.');
    }


  }

  return (
    <>
      <h1 className="title-gradient pb-1 mb-4 ml-2">Shopping cart</h1>
      {!cartProducts?.length && (
        <>
          <p className='ml-2'>Your cart is empty</p>
          <Button onClick={() => router.push('/')} variant={"outline"} type="button" className="ml-2 mt-4">Shop now <ShoppingCart /></Button>
        </>
      )}

      {cartProducts?.length > 0 && (
        <>
          {loading ? (
            <p className=' ml-2'>Loading cart products...</p>
          ) : error ? (
            <p className="text-red-500 ml-2">{error}</p>
          ) : (

            <div className="flex flex-col lg:flex-row gap-6">

              {/* Left Column: Products */}
              <div className="w-full lg:w-2/3">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Review your items and proceed to checkout when ready.
                </p>

                {/* Products Table */}
                <Card className="overflow-x-auto">
                  <CardHeader className="pbb-0">
                    <CardTitle>
                      <h2 className="text-xl font-semibold">Cart Items</h2>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table className="border-b">
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {products.map((product, index) => (
                          <TableRow key={index}>
                            <TableCell className="flex flex-col mt-2">
                              <Image
                                src={product.images[0]}
                                alt={product.title}
                                width={100}
                                height={100}
                                className="border rounded-md"
                              />
                              <TruncatedText
                                lines={1}
                                className="mt-2"
                              >
                                {product.title}
                              </TruncatedText>
                            </TableCell>
                            <TableCell>₹{product.price}</TableCell>
                            <TableCell className="text-nowrap">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1"
                                onClick={() => cartContext?.removeProduct(product._id ? product._id.toString() : '')} // Decrease quantity
                              >
                                -
                              </Button>
                              <span className="flex-1 text-center mx-1">{cartProducts.filter(id => id === product._id).length}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1"
                                onClick={() => cartContext?.addProduct(product._id ? product._id.toString() : '')} // Increase quantity
                              >
                                +
                              </Button>
                            </TableCell>
                            <TableCell>₹{cartProducts.filter(id => id === product._id).length * Number(product.price)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter>
                    <div className="text-right w-full">
                      <p className="text-lg font-semibold"><span className="text-base">Total:</span> ₹{total}</p>
                    </div>
                  </CardFooter>
                </Card>
              </div>

              {/* Right Column: Checkout Form */}
              <Card className="w-full md:w-2/3 lg:w-1/3 mx-auto space-y-4">
                <CardHeader className="pb-0">
                  <CardTitle>
                    <h2 className="text-xl font-semibold">Order Info</h2>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={placeOrder}>

                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        required
                        onChange={ev => setFormData({ ...formData, name: ev.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        onChange={ev => setFormData({ ...formData, email: ev.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        placeholder="123 Main St"
                        required
                        onChange={ev => setFormData({ ...formData, address: ev.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="New York"
                        required
                        onChange={ev => setFormData({ ...formData, city: ev.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        placeholder="10001"
                        required
                        onChange={ev => setFormData({ ...formData, postalCode: ev.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Select
                        required
                        onValueChange={ev => setFormData({ ...formData, country: ev })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="in">India</SelectItem>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          {/* Add more countries as needed */}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        required
                        onChange={ev => setFormData({ ...formData, phone: ev.target.value })}
                      />
                    </div>

                    <Button type="submit" className="w-full mt-3">Continue Payment</Button>
                  </form>
                </CardContent>
              </Card>
            </div>

          )}
        </>
      )}

      {successOverlay &&
        <OrderSuccessDialog order={checkoutResult} onClose={handleClose} />
      }

    </>
  )
}
