import React from "react";
import { Button, Radio, Card } from "antd";

interface QuizCardProps {
  question: string;
  options: string[];
  onSelect: (option: string) => void;
  selectedAnswer: string | null;
  onNext: () => void;
  isLastQuestion: boolean;
}

const QuizCard: React.FC<QuizCardProps> = ({
  question,
  options,
  onSelect,
  selectedAnswer,
  onNext,
  isLastQuestion,
}) => {
  return (
    <Card className="quiz-card">
      <p className="quiz-question">{question}</p>
      <Radio.Group
        onChange={(e) => onSelect(e.target.value)}
        value={selectedAnswer}
        className="quiz-options"
      >
        {options.map((option, index) => (
          <Radio key={index} value={option}>
            {option}
          </Radio>
        ))}
      </Radio.Group>
      <div className="quiz-actions">
        <Button
          type="primary"
          onClick={onNext}
          disabled={selectedAnswer === null}
        >
          {isLastQuestion ? "Finish" : "Next"}
        </Button>
      </div>
    </Card>
  );
};

export default QuizCard;
