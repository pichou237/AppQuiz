import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "../../components/ui/button"
import { Card, CardHeader, CardContent } from "../../components/ui/card"
import { Progress } from "../../components/ui/progress"
import { useQuizStore } from "../../hooks/useQuizStore"
// import { QuizQuestion } from "@/types/quiz"
import { CheckCircle2, XCircle, Plus } from 'lucide-react'
import { decodeHtmlEntities } from '@/lib/StringUtils'

export default function QuestionCard() {
  const { questions, currentQuestion, answerQuestion } = useQuizStore()
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (currentQuestion >= 30) navigate('/results')
  }, [currentQuestion, navigate])

  useEffect(() => {
    if (questions[currentQuestion]) {
      const allAnswers = [
        ...questions[currentQuestion].incorrect_answers,
        questions[currentQuestion].correct_answer
      ]
      setShuffledAnswers(allAnswers.sort(() => Math.random() - 0.5))
    }
  }, [currentQuestion, questions])

  const handleAnswer = (answer: string) => {
    const correct = answer === questions[currentQuestion].correct_answer
    setSelectedAnswer(answer)
    setIsCorrect(correct)
    
    setTimeout(() => {
      answerQuestion(correct)
      setSelectedAnswer(null)
      setIsCorrect(null)
    }, 1500)
  }

  const getAnswerStyle = (answer: string) => {
    if (!selectedAnswer) return ''
    if (answer === questions[currentQuestion].correct_answer) 
      return 'bg-green-100 border-green-500 text-green-900'
    if (answer === selectedAnswer && !isCorrect) 
      return 'bg-red-100 border-red-500 text-red-900'
    return ''
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      <div className="w-full max-w-2xl px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Plus className="h-6 w-6 text-primary" />
          <Progress 
            value={(currentQuestion + 1) * (100 / 30)} 
            className="h-2 flex-1 bg-gray-200"
          />
          <span className="text-sm font-medium text-gray-600">
            Question {currentQuestion + 1}/30
          </span>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="pb-4">
            <h3 className="text-lg font-medium text-gray-900 leading-relaxed">
              {decodeHtmlEntities(questions[currentQuestion]?.question)}
            </h3>
          </CardHeader>
          
          <CardContent className="space-y-3">
            {shuffledAnswers.map((answer) => (
              <Button
                key={answer}
                variant="outline"
                onClick={() => !selectedAnswer && handleAnswer(answer)}
                className={`w-full justify-start text-left h-14 px-6 transition-all
                  ${getAnswerStyle(answer)}
                  ${!selectedAnswer ? 'hover:bg-gray-50' : 'cursor-default'}
                `}
                disabled={!!selectedAnswer}
              >
                <span className="text-base">
                  {decodeHtmlEntities(answer)}
                </span>
                
                {selectedAnswer && (
                  <span className="ml-auto">
                    {answer === questions[currentQuestion].correct_answer ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : answer === selectedAnswer ? (
                      <XCircle className="h-5 w-5 text-red-500" />
                    ) : null}
                  </span>
                )}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}