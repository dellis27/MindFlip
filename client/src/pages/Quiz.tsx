import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../utils/graphql';

const Quiz = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { data } = useQuery(GET_CATEGORIES);

  const startQuiz = () => {
    alert(`Starting quiz in category: ${selectedCategory}`);
    // navigate to /quiz-session or render quiz questions here
  };

  return (
    <div>
      <h1>Start a Quiz</h1>
      <select onChange={e => setSelectedCategory(e.target.value)}>
        <option value="All">All Categories</option>
        {data?.categories.map((cat: string) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <button onClick={startQuiz}>Start Quiz</button>
    </div>
  );
};

export default Quiz;
