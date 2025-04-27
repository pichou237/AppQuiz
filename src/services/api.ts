import { QuizQuestion } from '../types/quiz'

const API_CACHE = new Map<number, {
  data: QuizQuestion[]
  timestamp: number
}>()

const REQUEST_DELAY = 1500 // 1.5 secondes entre les requêtes
let lastCallTime = 0

export const fetchQuestions = async (category: number): Promise<QuizQuestion[]> => {
  // Vérifier le cache
  const cached = API_CACHE.get(category)
  if (cached && Date.now() - cached.timestamp < 60 * 60 * 1000) {
    return cached.data
  }

  // Gestion du rate-limiting
  const now = Date.now()
  const timeSinceLastCall = now - lastCallTime
  if (timeSinceLastCall < REQUEST_DELAY) {
    await new Promise(resolve => 
      setTimeout(resolve, REQUEST_DELAY - timeSinceLastCall)
  )}
  try {
    lastCallTime = Date.now()
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    const response = await fetch(
      `https://opentdb.com/api.php?amount=30&category=${category}`, 
      { signal: controller.signal }
    )

    clearTimeout(timeoutId)

    if (response.status === 429) {
      await new Promise(resolve => setTimeout(resolve, 5000))
      return fetchQuestions(category)
    }

    const data = await response.json()
    
    if (data.response_code !== 0) throw new Error('API Error')

    API_CACHE.set(category, {
      data: data.results,
      timestamp: Date.now()
    })

    return data.results
  } catch (error) {
    console.error('API Error:', error)
    if (cached) return cached.data
    throw error
  }
}