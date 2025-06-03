import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// Define question type
type Question = {
  question: string;
  choices: string[];
  correctChoice: number;
};

// Quiz data structure
const quizData: Record<string, Record<string, Question[]>> = {
  Science: {
    Physics: [
      { question: 'What is the unit of force?', choices: ['Newton', 'Joule', 'Watt'], correctChoice: 0 },
      { question: 'Speed of light in vacuum?', choices: ['3x10^8 m/s', '1.5x10^8 m/s', '3x10^6 m/s'], correctChoice: 0 },
      { question: 'What is the formula for acceleration?', choices: ['a = F/m', 'a = m/F', 'a = F*m'], correctChoice: 0 },
    ],
    Chemistry: [
      { question: 'Chemical symbol for water?', choices: ['O2', 'H2O', 'CO2'], correctChoice: 1 },
      { question: 'pH of pure water?', choices: ['7', '14', '0'], correctChoice: 0 },
      { question: 'What is the atomic number of Carbon?', choices: ['6', '12', '14'], correctChoice: 0 },
    ],
  },
  History: {
    Ancient: [
      { question: 'Who built the pyramids?', choices: ['Romans', 'Egyptians', 'Greeks'], correctChoice: 1 },
      { question: 'What writing system did Ancient Mesopotamians use?', choices: ['Cuneiform', 'Hieroglyphics', 'Latin'], correctChoice: 0 },
    ],
    Modern: [
      { question: 'When did World War I start?', choices: ['1914', '1920', '1945'], correctChoice: 0 },
      { question: 'Who was the first President of the United States?', choices: ['George Washington', 'Abraham Lincoln', 'Thomas Jefferson'], correctChoice: 0 },
    ],
  },
  Programming: {
    General: [
      { question: 'What does HTML stand for?', choices: ['HyperText Markup Language', 'HighText Machine Language', 'HyperText Marking Language'], correctChoice: 0 },
      { question: 'Which language is used for web development?', choices: ['Python', 'JavaScript', 'C++'], correctChoice: 1 },
      { question: 'What does CSS stand for?', choices: ['Cascading Style Sheets', 'Computer Style Sheets', 'Creative Style Sheets'], correctChoice: 0 },
    ],
  },
};

const Quiz: React.FC = () => {
  const { subject, category } = useParams<{ subject: string; category: string }>();

  const validSubject = subject && quizData[subject] ? subject : Object.keys(quizData)[0];
  const validCategory =
    category && quizData[validSubject][category] ? category : Object.keys(quizData[validSubject])[0];

  const questions = quizData[validSubject][validCategory];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleChoiceClick = (index: number) => {
    setSelectedChoice(index);
  };

  const handleNext = () => {
    if (selectedChoice === currentQuestion.correctChoice) {
      setScore((prevScore) => prevScore + 1);
    }
    setSelectedChoice(null);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedChoice(null);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div style={{ maxWidth: 700, margin: 'auto', padding: '1rem' }}>
      <h1>
        Quiz: {validSubject} / {validCategory}
      </h1>

      {!quizFinished ? (
        <>
          <p>
            Question {currentIndex + 1} of {questions.length}
          </p>

          <h3>{currentQuestion.question}</h3>

          <ul style={{ listStyle: 'none', padding: 0 }}>
            {currentQuestion.choices.map((choice, idx) => (
              <li key={idx} style={{ marginBottom: 12 }}>
                <button
                  onClick={() => handleChoiceClick(idx)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 8,
                    border: '2px solid #007BFF',
                    backgroundColor: selectedChoice === idx ? '#d0e7ff' : 'white',
                    cursor: 'pointer',
                    fontWeight: selectedChoice === idx ? '600' : '400',
                    textAlign: 'left',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      width: 24,
                      fontWeight: '700',
                      marginRight: 12,
                      color: '#007BFF',
                      userSelect: 'none',
                    }}
                  >
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  {choice}
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={handleNext}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '1rem',
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '1rem',
            }}
          >
            {currentIndex + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}
          </button>
        </>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <h2>Quiz Complete!</h2>
          <p>
            Your Score: {score} / {questions.length} ({((score / questions.length) * 100).toFixed(0)}%)
          </p>
          <button
            onClick={handleRestart}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '1rem',
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;