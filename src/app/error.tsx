'use client'

import ErrorPage from "@/components/shared/ErrorPage"


export default function Error({
  error,
  // reset,
}: {
  error: Error & { digest?: string }
  // reset: () => void
}) {
  return (
    <ErrorPage
      statusCode={500}
      title="Unexpected Error"
      message="We apologize for the inconvenience. Our team has been notified and is working on resolving the issue."
      error={error}
    />
  )
}

