'use client'

import { Button } from "@/components/ui/button"
import { HomeIcon, ChevronDownIcon, ChevronUpIcon, ArrowLeftIcon } from 'lucide-react'
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface ErrorPageProps {
  statusCode?: number
  title?: string
  message?: string
  error?: Error
}

export default function ErrorPage({
  statusCode = 500,
  title = "Oops! Something went wrong",
  message = "We're sorry, but we're having trouble processing your request. Please try again later.",
  error
}: ErrorPageProps) {
  const [showErrorDetails, setShowErrorDetails] = useState(false)
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center bg-background text-foreground mt-20 p-4">
      <div className="text-center space-y-4 max-w-md">
        <h1 className="text-4xl font-bold text-primary">{statusCode}</h1>
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="text-muted-foreground">{message}</p>
        {error && (
          <div className="mt-4">
            <Button
              variant="outline"
              onClick={() => setShowErrorDetails(!showErrorDetails)}
              className="flex items-center space-x-2 mx-auto"
            >
              {showErrorDetails ? (
                <>
                  <ChevronUpIcon className="w-4 h-4" />
                  <span>Hide Error Details</span>
                </>
              ) : (
                <>
                  <ChevronDownIcon className="w-4 h-4" />
                  <span>Show Error Details</span>
                </>
              )}
            </Button>
            {showErrorDetails && (
              <pre className="mt-2 p-4 bg-muted text-muted-foreground text-left text-sm overflow-auto rounded-md">
                {error.stack || error.message}
              </pre>
            )}
          </div>
        )}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
          <Button asChild>
            <Link href="/" className="inline-flex items-center space-x-2">
              <HomeIcon className="w-4 h-4" />
              <span>Return to Home</span>
            </Link>
          </Button>
          <Button variant="outline" onClick={() => router.back()} className="inline-flex items-center space-x-2">
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Go Back</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

