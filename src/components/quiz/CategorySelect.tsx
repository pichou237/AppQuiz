/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "../../components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card"
import { useQuizStore } from "../../hooks/useQuizStore"
import { Category } from "../../types/quiz"
import { ChevronRight, Loader2 } from 'lucide-react'

export default function CategorySelect() {
  const [categories, setCategories] = useState<Category[]>([])
  const { name, setCategory, loading } = useQuizStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!name) navigate('/')
    
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://opentdb.com/api_category.php')
        const data = await response.json()
        setCategories(data.trivia_categories)
      } catch (error) {
        navigate('/error')
      }
    }
    
    fetchCategories()
  }, [name, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4 shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-center text-gray-800">
            Select Category
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="outline"
              onClick={() => setCategory(category.id)}
              disabled={loading}
              className="w-full justify-between h-14 px-6 text-gray-700 hover:border-primary hover:text-primary"
            >
              <span className="text-sm">{category.name}</span>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}