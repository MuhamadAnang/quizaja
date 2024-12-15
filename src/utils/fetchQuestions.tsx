import axios from 'axios';

const fetchQuestions = async (amount: number) => {
  const response = await axios.get(`https://opentdb.com/api.php?amount=${amount}&type=multiple`);
  return response.data.results;
};

export default fetchQuestions;
