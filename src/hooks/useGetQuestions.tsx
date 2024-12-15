import { Question } from "../types/Question";
import axios from "axios";

export const useGetQuestions = () => {
  return async (onSuccess: (data: Question[]) => void, onError: () => void) => {
    try {
      const response = await axios.get(
        "https://opentdb.com/api.php?amount=10&category=23&difficulty=hard&type=multiple"
      );
      console.log("data", response.data.results);
      onSuccess(response.data.results);
    } catch (error) {
      console.log("error", error);
      onError();
    }
  };
};

export default useGetQuestions;
