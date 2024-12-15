import { useEffect, useRef, useState } from "react";
import { useQuizContext } from "../provider/QuizProvider";
import useGetQuestions from "../hooks/useGetQuestions";
import { Question } from "../types/Question";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Card, Progress } from "antd";
import { useNavigate } from "react-router-dom";
import Timer from "../components/Timer";

const QuizPage: React.FC = () => {
  const [started, setStarted] = useState<boolean>(false);
  const [username] = useState<string>(
    localStorage.getItem("username") || ""
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [questionsWithShuffledAnswers, setQuestionsWithShuffledAnswers] =
    useState<Question[]>([]);
  const hasFetched = useRef(false);
  const { setQuestions, setResult, questions } = useQuizContext();
  const navigate = useNavigate();
  const getQuestions = useGetQuestions();
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const onSuccess = (data: Question[]) => {
    setQuestions(data);
    // Acak jawaban hanya sekali saat data pertama kali dimuat
    const shuffledQuestions = data.map((question) => ({
      ...question,
      answers: [...question.incorrect_answers, question.correct_answer].sort(
        () => Math.random() - 0.5
      ),
    }));
    setQuestionsWithShuffledAnswers(shuffledQuestions);
    setIsLoading(false);
    setTimeLeft(30); // Waktu dimulai pada 30 detik
  };

  const handleAnswer = (answer: string) => {
    const currentQuestion =
      questionsWithShuffledAnswers?.[currentQuestionIndex];

    if (!currentQuestion) {
      console.error("No question available.");
      return;
    }

    // Check if the answer is correct
    const isCorrect = currentQuestion.correct_answer === answer;

    setResult((prevResult) => {
      if (!prevResult) return prevResult;

      return {
        ...prevResult,
        correctAnswers: prevResult.correctAnswers + (isCorrect ? 1 : 0),
        incorrectAnswers: prevResult.incorrectAnswers + (!isCorrect ? 1 : 0),
        answeredQuestions: prevResult.answeredQuestions + 1,
      };
    });

    if (currentQuestionIndex === questionsWithShuffledAnswers.length - 1) {
      navigate("/result"); // Navigate to results after the last question is answered
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  useEffect(() => {
    console.log(questions);
    console.log(started);
    if (!isLoading && !questions && !hasFetched.current && started) {
      hasFetched.current = true;
      setIsLoading(true);
      getQuestions(onSuccess, () => setIsLoading(false));
    }
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [started]);

  useEffect(() => {
    if (timeLeft <= 0 && started && questionsWithShuffledAnswers) {
      // Saat waktu habis, tandai soal yang belum terjawab sebagai jawaban salah
      setResult((prevResult) => {
        if (!prevResult) return prevResult;
        const unansweredQuestions =
          questionsWithShuffledAnswers.length - prevResult.answeredQuestions;
        return {
          ...prevResult,
          incorrectAnswers: prevResult.incorrectAnswers + unansweredQuestions,
        };
      });

      navigate("/result"); // Navigasi ke halaman hasil
    }
  }, [timeLeft, questionsWithShuffledAnswers]);

  if (!started) {
    return (
      <div className="quiz-container min-h-screen flex flex-col justify-center items-center bg-gradient-to-t from-black to-gray-600 p-6">
        <div className="quiz-content">
          <Card className="quiz-card bg-white rounded-lg p-6 shadow-lg">
            <h3 className="quiz-question-number text-xl font-semibold mt-4">
              Welcome to the Quiz {username} !
            </h3>
            <p className="quiz-question text-lg my-4">
              You will have 30 seconds to answer each question.
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => setStarted(true)}
                className="quiz-option px-6 py-3 border bg-gray-50 text-black rounded-lg shadow-md hover:bg-gray-800 hover:text-white focus:outline-none transition duration-300"
              >
                Start
              </button>
              <button
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                }}
                className="px-6 py-3 border bg-gray-50 text-black rounded-lg shadow-md hover:bg-gray-800 hover:text-white focus:outline-none transition duration-300"
              >
                logout
              </button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container min-h-screen flex flex-col justify-center items-center bg-gradient-to-t from-black to-gray-600 p-6">
      {isLoading ? (
        <div className="loading-spinner">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </div>
      ) : (
        <div className="quiz-content">
          {questionsWithShuffledAnswers &&
          questionsWithShuffledAnswers.length > 0 ? (
            <Card className="quiz-card bg-white rounded-lg p-6 shadow-lg">
              <Progress
                percent={
                  (currentQuestionIndex / questionsWithShuffledAnswers.length) *
                  100
                }
                showInfo={false}
                strokeColor="black"
              />
              <Timer
                timeLeft={timeLeft}
                onTimeout={() => navigate("/result", { state: { questions } })}
              />

              <h3 className="quiz-question-number text-xl font-semibold mt-4">
                Question {currentQuestionIndex + 1}/
                {questionsWithShuffledAnswers.length}
              </h3>
              <p className="quiz-question text-lg my-4">
                {questionsWithShuffledAnswers[currentQuestionIndex].question}
              </p>

              <div className="quiz-options flex flex-col gap-4">
                {questionsWithShuffledAnswers[currentQuestionIndex].answers.map(
                  (option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      className="quiz-option px-6 py-3 border bg-gray-50 text-black rounded-lg shadow-md hover:bg-gray-800 hover:text-white focus:outline-none transition duration-300"
                    >
                      {option}
                    </button>
                  )
                )}
              </div>
            </Card>
          ) : (
            <p className="text-white">No questions available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizPage;
