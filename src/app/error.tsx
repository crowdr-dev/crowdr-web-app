'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
    console.log(error.digest,error.cause, error.message, error.name)
  }, [error])
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <h2>{error.message}</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
       &nbsp;Try again
      </button>
    </div>
  )
}