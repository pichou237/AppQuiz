import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { QuizQuestion } from '../types/quiz'

interface QuizState {
  name: string
  category: number
  questions: QuizQuestion[]
  currentQuestion: number
  score: number
  loading: boolean
  error: string | null
  lastApiCall: number
  setName: (name: string) => void
  setCategory: (category: number) => void
  setQuestions: (questions: QuizQuestion[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  answerQuestion: (isCorrect: boolean) => void
  reset: (options?: { keepName?: boolean }) => void
  updateApiTimestamp: () => void
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      name: '',
      category: 0,
      questions: [],
      currentQuestion: 0,
      score: 0,
      loading: false,
      error: null,
      lastApiCall: 0,
      setName: (name) => set({ name }),
      setCategory: (category) => set({ 
        category,
        questions: [],
        currentQuestion: 0,
        score: 0,
        error: null
      }),
      setQuestions: (questions) => set({ questions }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      answerQuestion: (isCorrect) => set((state) => ({
        score: isCorrect ? state.score + 1 : state.score,
        currentQuestion: state.currentQuestion + 1
      })),
      reset: (options = {}) => set((state) => ({
        name: options?.keepName ? state.name : '',
        category: 0,
        questions: [],
        currentQuestion: 0,
        score: 0,
        loading: false,
        error: null
      })),
      updateApiTimestamp: () => set({ lastApiCall: Date.now() })
    }),
    {
      name: 'quiz-storage',
      partialize: (state) => 
        Object.fromEntries(Object.entries(state).filter(
          ([key]) => !['questions', 'currentQuestion'].includes(key)
        )
  )}
  )
)