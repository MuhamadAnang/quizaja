import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { Question } from "../types/Question";
import { QuizResult } from "../types/QuizResult";

interface QuizContextType {
  questions: Question[] | null;
  setQuestions: React.Dispatch<React.SetStateAction<Question[] | null>>;
  setResult: React.Dispatch<React.SetStateAction<QuizResult | null>>;
  result: QuizResult | null;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);


export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);
  
  useEffect(() => {
    if(questions) {
      setResult({
        totalQuestions: questions.length,
        correctAnswers: 0,
        incorrectAnswers: 0,
        answeredQuestions: 0,
      });
    }
  }, [questions]);

  return (
    <QuizContext.Provider
      value={{ questions, setQuestions, setResult, result }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuizContext must be used within a QuizProvider");
  }
  return context;
};
