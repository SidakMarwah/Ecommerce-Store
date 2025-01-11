import ErrorPage from "@/components/shared/ErrorPage";

export default function NotFound() {
  return (
    <ErrorPage
      statusCode={404}
      title="Page Not Found"
      message="We're sorry, but the page you're looking for doesn't exist."
    />
  )
}

