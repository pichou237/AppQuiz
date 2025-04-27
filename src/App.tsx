import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { useQuizStore } from './hooks/useQuizStore'
import { fetchQuestions } from './services/api'
import WelcomeCard from './components/quiz/WelcomeCard'
import CategorySelect from './components/quiz/CategorySelect'
import QuestionCard from './components/quiz/QuestionCard'
import ResultsCard from './components/quiz/ResultsCard'
import ErrorPage from './components/quiz/ErrorPage'
import Loading from './components/quiz/Loading'

function AppRouter() {
  const { 
    category,
    setQuestions,
    setLoading,
    setError,
    loading,
    updateApiTimestamp
  } = useQuizStore()
  const navigate = useNavigate()

  useEffect(() => {
    const controller = new AbortController()
    
    const loadData = async () => {
      if (category !== 0) {
        try {
          setLoading(true)
          updateApiTimestamp()
          
          const questions = await fetchQuestions(category)
          if (controller.signal.aborted) return
          
          setQuestions(questions)
          navigate('/quiz')
        } catch (error) {
          if (!controller.signal.aborted) {
            setError(error instanceof Error ? error.message : 'Unknown error')
            navigate('/error')
          }
        } finally {
          if (!controller.signal.aborted) setLoading(false)
        }
      }
    }

    const timer = setTimeout(loadData, 500)

    return () => {
      controller.abort()
      clearTimeout(timer)
    }
  }, [category, navigate, setError, setLoading, setQuestions, updateApiTimestamp])

  if (loading) return <Loading />

  return (
    <Routes>
      <Route path="/" element={<WelcomeCard />} />
      <Route path="/categories" element={<CategorySelect />} />
      <Route path="/quiz" element={<QuestionCard />} />
      <Route path="/results" element={<ResultsCard />} />
      <Route path="/error" element={<ErrorPage />} />
    </Routes>
  )
}

export default function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  )
}