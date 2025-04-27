import { Button } from "../../components/ui/button";
import { Card, CardHeader, CardContent } from "../../components/ui/card";
import { useQuizStore } from "../../hooks/useQuizStore";
import { useNavigate } from 'react-router-dom';
import { Logo } from './Icons';

export default function ResultsCard() {
  const { score, reset } = useQuizStore();
  const navigate = useNavigate();

  const handleNewCategory = () => {
    reset({ keepName: true });
    navigate('/categories');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4 shadow-lg border-0">
        <CardHeader className="items-center space-y-4">
          <Logo />
          <h2 className="text-2xl font-semibold text-gray-800">
            Assessment Complete
          </h2>
        </CardHeader>
        
        <CardContent className="text-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">{score}</p>
              <p className="text-gray-600">Correct Answers</p>
              <p className="text-sm text-gray-500">Total questions: 30</p>
            </div>
            
            <div className="flex flex-col gap-3">
              <Button 
                onClick={handleNewCategory}
                variant="outline"
                className="w-full h-12 text-base bg-white hover:bg-gray-50"
              >
                Choose Another Category
              </Button>
              <Button 
                onClick={() => reset()}
                className="w-full h-12 text-base bg-primary hover:bg-primary/90"
              >
                Retake Assessment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}