import { Button } from "../../components/ui/button"
import { useQuizStore } from "../../hooks/useQuizStore"
import { useNavigate } from 'react-router-dom'

export default function ErrorPage() {
  const { error } = useQuizStore()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md p-6 space-y-4">
        <h2 className="text-2xl font-bold text-red-600">Error</h2>
        <p className="text-gray-600">{error || 'An error occurred'}</p>
        <Button 
          onClick={() => navigate('/categories')}
          className="bg-primary hover:bg-primary/90"
        >
          Return to Categories
        </Button>
      </div>
    </div>
  )
}