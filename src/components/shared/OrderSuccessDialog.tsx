'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle } from 'lucide-react'
import TruncatedText from './TruncatedText'

interface OrderSuccessDialog {
    order?: {
        _id?: string | undefined; customerInfo?: { name: string; email: string; } | undefined; itemsOrdered?: { title: string; quantity: number; }[] | undefined; totalAmount?: number | undefined; createdAt?: string | undefined | Date;
    };
    onClose: () => void;
}

export function OrderSuccessDialog({ order, onClose }: OrderSuccessDialog) {

    if (!order) {
        return null; // Don’t render the dialog if `order` is undefined
    }

    const [isOpen, setIsOpen] = useState(true)

    const handleClose = () => {
        setIsOpen(false)
        onClose()
    }

    const handleTrackOrder = () => {
        // Implement your track order logic here
        console.log('Tracking order:', order._id)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent aria-describedby='Order Successful' className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-center">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-2" />
                        Order Placed Successfully!
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="text-sm font-medium col-span-1">Order ID:</span>
                        <span className="col-span-3">{order._id}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="text-sm font-medium col-span-1">Customer:</span>
                        <span className="col-span-3">{order.customerInfo?.name}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="text-sm font-medium col-span-1">Email:</span>
                        <span className="col-span-3">{order.customerInfo?.email}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="text-sm font-medium col-span-1">Items:</span>
                        <span className="col-span-3">
                            {order.itemsOrdered?.map((item, index) => (
                                <div key={index}>
                                    <TruncatedText lines={1}>{item.title}</TruncatedText> (x{item.quantity})
                                </div>
                            ))}
                        </span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="text-sm font-medium col-span-1">Total:</span>
                        <span className="col-span-3">₹{order.totalAmount?.toFixed(2)}</span>
                    </div>
                </div>
                <DialogFooter className="sm:justify-start gap-2 sm:gap-0">
                    <Button type="button" variant="secondary" onClick={handleTrackOrder}>
                        Track Order
                    </Button>
                    <Button type="button" onClick={handleClose}>
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

