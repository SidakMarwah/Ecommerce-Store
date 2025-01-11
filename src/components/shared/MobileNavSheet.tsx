// import { Button } from "@/components/ui/button"
import {
    Sheet,
    // SheetClose,
    SheetContent,
    // SheetDescription,
    // SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, Store } from "lucide-react";
import Link from "next/link";

export function MobileNavSheet({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className="p-1 border-2 hover:border-gray-800 border-gray-500 rounded-md dark:bg-gray-800 bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300">
                    <Menu />
                </div>

            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="align-middle">
                        <Link className='text-2xl font-semibold flex gap-1 items-center justify-center' href={'/'}><Store size={36} strokeWidth={3} absoluteStrokeWidth /> Ecommerce</Link>
                    </SheetTitle>
                    {/* <SheetDescription>
                            Make changes to your profile here. Click save when you're done.
                        </SheetDescription> */}
                </SheetHeader>
                {children}
                Developed by <Link className="cursor-pointer text-blue-900 dark:text-blue-500 underline" href={'https://www.linkedin.com/in/sidakmarwah/'}>Sidak Marwah</Link>✨
                {/* <SheetFooter>
                    <SheetClose asChild>
                            <Button type="submit">Save changes</Button>
                        </SheetClose>
                </SheetFooter> */}
            </SheetContent>
        </Sheet>
    )
}
