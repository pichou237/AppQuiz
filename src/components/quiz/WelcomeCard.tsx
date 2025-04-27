import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { useQuizStore } from '../../hooks/useQuizStore';
import { Logo } from './Icons';

export default function WelcomeCard() {
  const [localName, setLocalName] = useState('');
  const { setName } = useQuizStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setName(localName);
    navigate('/categories');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4 shadow-lg border-0">
        <CardHeader className="items-center space-y-4">
          <Logo />
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Knowledge Assessment
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-600">
                Enter your full name
              </label>
              <Input
                required
                value={localName}
                onChange={(e) => setLocalName(e.target.value)}
                className="focus-visible:ring-primary h-12 text-base"
                placeholder="John Doe"
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full h-12 text-base bg-primary hover:bg-primary/90"
            >
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}