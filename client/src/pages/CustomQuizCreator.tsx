import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Question } from '../pages/Quiz'; // Ensure 'Question' is correctly imported from the module where it is defined

type CustomQuiz = {
  title: string;
  questions: Question[];
};

const CustomQuizCreator: React.FC = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionText, setQuestionText] = useState('');
  const [choices, setChoices] = useState(['', '', '']);
  const [correctChoice, setCorrectChoice] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleAddChoice = () => {
    setChoices([...choices, '']);
  };

  const handleChoiceChange = (index: number, value: string) => {
    const newChoices = [...choices];
    newChoices[index] = value;
    setChoices(newChoices);
  };

  const handleAddQuestion = () => {
    if (!questionText.trim() || correctChoice === null) {
      alert('Please fill in the question and select the correct answer.');
      return;
    }
    if (choices.some((choice) => choice.trim() === '')) {
      alert('All choices must be filled.');
      return;
    }
    const newQuestion: Question = {
      question: questionText,
      choices,
      correctChoice,
    };
    setQuestions([...questions, newQuestion]);
    setQuestionText('');
    setChoices(['', '', '']);
    setCorrectChoice(null);
  };

  const handleSaveQuiz = () => {
    if (!title.trim()) {
      alert('Please enter a quiz title.');
      return;
    }
    if (questions.length === 0) {
      alert('Add at least one question.');
      return;
    }

    // Save to localStorage or send to backend
    localStorage.setItem('customQuiz', JSON.stringify({ title, questions }));
    alert('Quiz saved! Now you can take your custom quiz.');
    navigate('/custom-quiz');
  };

  return (
    <div style={{ maxWidth: 700, margin: 'auto', padding: '1rem' }}>
      <h1>Create Your Custom Quiz</h1>
      <div style={{ marginBottom: '1rem' }}>
        <label>Quiz Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Question:</label>
        <input
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Choices:</label>
        {choices.map((choice, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
            <input
              type="text"
              value={choice}
              onChange={(e) => handleChoiceChange(index, e.target.value)}
              style={{ flex: 1, padding: '0.5rem', fontSize: '1rem' }}
            />
          </div>
        ))}
        <button onClick={handleAddChoice} style={{ padding: '0.5rem', fontSize: '1rem' }}>
          Add Choice
        </button>
      </div>
