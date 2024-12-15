// menampilkan hello world
import React, { useEffect } from "react";
import { useQuizContext } from "../provider/QuizProvider";
import { useNavigate } from "react-router-dom";

const ResultPage: React.FC = () => {
  const { result, setResult ,setQuestions} = useQuizContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!result) {
      setQuestions(null);
        navigate("/quiz");
    } 
  }, [result]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-t from-black to-gray-600 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Hasil Quiz Anda
        </h1>

        <div className="space-y-4 ">
          <div className="">
            <p className="text-xl font-medium text-gray-700">Total Soal</p>
            <p className="text-2xl font-bold text-blue-600">
              {result?.totalQuestions}
            </p>
          </div>

          <div className="">
            <p className="text-xl font-medium text-gray-700">Jawaban Benar</p>
            <p className="text-2xl font-bold text-green-600">
              {result?.correctAnswers}
            </p>
          </div>

          <div className="">
            <p className="text-xl font-medium text-gray-700">Jawaban Salah</p>
            <p className="text-2xl font-bold text-red-600">
              {result?.incorrectAnswers}
            </p>
          </div>

          <div className="">
            <p className="text-xl font-medium text-gray-700">
              Soal yang Dijawab
            </p>
            <p className="text-2xl font-bold text-yellow-600">
              {result?.answeredQuestions}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <button
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-200 hover:text-black transition duration-300"
            onClick={() => {
              setResult(null);
              setQuestions(null);
              navigate("/quiz");
            }}
          >
            Kembali ke Menu Utama
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
