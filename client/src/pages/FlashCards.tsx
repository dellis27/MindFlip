import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const subjectsData = [
  {
    name: 'Science',
    categories: ['Physics', 'Chemistry', 'Biology', 'Astronomy'],
  },
  {
    name: 'History',
    categories: ['Ancient', 'Medieval', 'Modern', 'World Wars'],
  },
  {
    name: 'Programming',
    categories: ['JavaScript', 'Python', 'Java', 'C++', 'Web Development'],
  },
  {
    name: 'Language',
    categories: ['English', 'Spanish', 'French', 'German', 'Chinese'],
  },
  {
    name: 'Math',
    categories: ['Algebra', 'Geometry'],
  },
  {
    name: 'Computer Science',
    categories: ['Programming', 'Databases'],
  },
];

export const preMadeFlashcards = [
    // JavaScript
  {
    subject: 'Programming',
    category: 'JavaScript',
    question: 'What is a closure in JavaScript?',
    answer:
      'A closure is a function that remembers its outer variables and can access them even after the outer function has finished execution.',
  },
  {
    subject: 'Programming',
    category: 'JavaScript',
    question: 'What is the difference between == and === in JavaScript?',
    answer: '== compares values after type coercion, while === compares both value and type strictly.',
  },

  // Python
  {
    subject: 'Programming',
    category: 'Python',
    question: 'What is a Python list comprehension?',
    answer:
      'A concise way to create lists using a single line of code, consisting of an expression followed by a for clause and optional conditions.',
  },
  {
    subject: 'Programming',
    category: 'Python',
    question: 'How do you handle exceptions in Python?',
    answer: 'Using try-except blocks to catch and handle exceptions.',
  },

  // Java
  {
    subject: 'Programming',
    category: 'Java',
    question: 'What is the purpose of the `final` keyword in Java?',
    answer:
      'It is used to declare constants, prevent method overriding, and inheritance of classes.',
  },
  {
    subject: 'Programming',
    category: 'Java',
    question: 'What is the difference between JDK and JRE?',
    answer: 'JDK includes tools for development; JRE is for running Java applications.',
  },

  // C++
  {
    subject: 'Programming',
    category: 'C++',
    question: 'What is a pointer in C++?',
    answer: 'A variable that stores the memory address of another variable.',
  },
  {
    subject: 'Programming',
    category: 'C++',
    question: 'What is the difference between struct and class in C++?',
    answer:
      'By default, members of a struct are public; members of a class are private.',
  },

  // Web Development
  {
    subject: 'Programming',
    category: 'Web Development',
    question: 'What does HTML stand for?',
    answer: 'HyperText Markup Language.',
  },
  {
    subject: 'Programming',
    category: 'Web Development',
    question: 'What is the purpose of CSS?',
    answer: 'To style and layout web pages.',
  },
    // Math: Algebra
    {
      subject: 'Math',
      category: 'Algebra',
      question: 'What is the quadratic formula?',
      answer: 'x = (-b ± √(b²-4ac)) / 2a',
    },
    {
      subject: 'Math',
      category: 'Algebra',
      question: 'What is the value of x if 2x + 5 = 13?',
      answer: 'x = 4',
    },
    {
      subject: 'Math',
      category: 'Geometry',
      question: 'What is the sum of the interior angles of a triangle?',
      answer: '180 degrees',
    },
    {
      subject: 'Math',
      category: 'Geometry',
      question: 'What is the formula for the area of a circle?',
      answer: 'A = πr²',
    },
  
    // Science: Biology & Physics
    {
      subject: 'Science',
      category: 'Biology',
      question: 'What is the basic unit of life?',
      answer: 'The cell',
    },
    {
      subject: 'Science',
      category: 'Biology',
      question: 'What process do plants use to make food?',
      answer: 'Photosynthesis',
    },
    {
      subject: 'Science',
      category: 'Physics',
      question: 'What is Newton’s first law of motion?',
      answer: 'An object in motion stays in motion unless acted upon by a force.',
    },
    {
      subject: 'Science',
      category: 'Physics',
      question: 'What is Newton’s second law of motion?',
      answer: 'Force = mass × acceleration (F = ma)',
    },
    {
      subject: 'Science',
      category: 'Physics',
      question: 'What is the speed of light in vacuum?',
      answer: 'Approximately 299,792 km/s',
    },
  
    // Your new Physics question added here:
    {
      subject: 'Science',
      category: 'Physics',
      question: 'What is Newton’s First Law?',
      answer: 'An object in motion stays in motion unless acted upon by a force.',
    },
  
    // History
    {
      subject: 'History',
      category: 'Ancient',
      question: 'What ancient civilization built the pyramids?',
      answer: 'The ancient Egyptians',
    },
    {
      subject: 'History',
      category: 'World Wars',
      question: 'Who was the leader of Germany during World War II?',
      answer: 'Adolf Hitler',
    },
    {
      subject: 'History',
      category: 'Modern',
      question: 'Who was the first President of the United States?',
      answer: 'George Washington',
    },
    {
      subject: 'History',
      category: 'Modern',
      question: 'What year did the American Civil War begin?',
      answer: '1861',
    },
  
    // Computer Science
    {
      subject: 'Computer Science',
      category: 'Programming',
      question: 'What does HTML stand for?',
      answer: 'HyperText Markup Language',
    },
    {
      subject: 'Computer Science',
      category: 'Programming',
      question: 'What does CSS stand for?',
      answer: 'Cascading Style Sheets',
    },
    {
      subject: 'Computer Science',
      category: 'Databases',
      question: 'What is a primary key in a database?',
      answer: 'A unique identifier for each record in a table',
    },
    {
      subject: 'Computer Science',
      category: 'Databases',
      question: 'What does SQL stand for?',
      answer: 'Structured Query Language',
    },
    // English
  {
    subject: 'Language',
    category: 'English',
    question: 'What is a synonym for "happy"?',
    answer: 'Joyful',
  },
  {
    subject: 'Language',
    category: 'English',
    question: 'What part of speech is the word "quickly"?',
    answer: 'Adverb',
  },

  // Spanish
  {
    subject: 'Language',
    category: 'Spanish',
    question: 'How do you say "Hello" in Spanish?',
    answer: 'Hola',
  },
  {
    subject: 'Language',
    category: 'Spanish',
    question: 'What is the Spanish word for "thank you"?',
    answer: 'Gracias',
  },

  // French
  {
    subject: 'Language',
    category: 'French',
    question: 'What does "Bonjour" mean?',
    answer: 'Good morning / Hello',
  },
  {
    subject: 'Language',
    category: 'French',
    question: 'How do you say "Goodbye" in French?',
    answer: 'Au revoir',
  },

  // German
  {
    subject: 'Language',
    category: 'German',
    question: 'What is the German word for "please"?',
    answer: 'Bitte',
  },
  {
    subject: 'Language',
    category: 'German',
    question: 'How do you say "Thank you" in German?',
    answer: 'Danke',
  },

  // Chinese
  {
    subject: 'Language',
    category: 'Chinese',
    question: 'How do you say "Hello" in Mandarin Chinese?',
    answer: 'Nǐ hǎo (你好)',
  },
  {
    subject: 'Language',
    category: 'Chinese',
    question: 'What does "Xièxiè" (谢谢) mean?',
    answer: 'Thank you',
  },
  {
    subject: 'History',
    category: 'Medieval',
    question: 'What was the system of land ownership and duties in medieval Europe called?',
    answer: 'Feudalism',
  },
  {
    subject: 'History',
    category: 'Medieval',
    question: 'Who led the Norman conquest of England in 1066?',
    answer: 'William the Conqueror',
  },
  {
    subject: 'History',
    category: 'Medieval',
    question: 'What was the name of the deadly pandemic that swept through Europe in the 14th century?',
    answer: 'The Black Death',
  },
  {
    subject: 'History',
    category: 'Medieval',
    question: 'What were medieval European warriors called who served their lords in battle?',
    answer: 'Knights',
  },
  {
    subject: 'History',
    category: 'Medieval',
    question: 'Which war between England and France lasted over 100 years?',
    answer: 'The Hundred Years’ War',
  },
  {
    subject: 'History',
    category: 'Medieval',
    question: 'What was the primary language of the educated and the Church in medieval Europe?',
    answer: 'Latin',
  },
  {
    subject: 'History',
    category: 'Medieval',
    question: 'Who was crowned Holy Roman Emperor in the year 800?',
    answer: 'Charlemagne',
  },
  {
    subject: 'History',
    category: 'Medieval',
    question: 'What were large, fortified homes for nobility in the medieval period called?',
    answer: 'Castles',
  },
  {
    subject: 'History',
    category: 'World Wars',
    question: 'What event is widely considered the spark that started World War I?',
    answer: 'The assassination of Archduke Franz Ferdinand',
  },
  {
    subject: 'History',
    category: 'World Wars',
    question: 'In what year did World War II begin?',
    answer: '1939',
  },
  {
    subject: 'History',
    category: 'World Wars',
    question: 'Who was the Prime Minister of the United Kingdom during most of World War II?',
    answer: 'Winston Churchill',
  },
  {
    subject: 'History',
    category: 'World Wars',
    question: 'What battle marked a major turning point against Nazi Germany on the Eastern Front?',
    answer: 'The Battle of Stalingrad',
  },
  {
    subject: 'History',
    category: 'World Wars',
    question: 'What global organization was formed after World War II to promote international peace?',
    answer: 'The United Nations',
  },
  {
    subject: 'History',
    category: 'World Wars',
    question: 'Which two cities were hit with atomic bombs in 1945?',
    answer: 'Hiroshima and Nagasaki',
  },
  {
    subject: 'History',
    category: 'World Wars',
    question: 'What was the name of the Allied invasion of Normandy in 1944?',
    answer: 'D-Day',
  },
  {
    subject: 'History',
    category: 'World Wars',
    question: 'Which country was invaded by Germany to start World War II?',
    answer: 'Poland',
  },
  ];
  

const Flashcard = ({ question, answer }: { question: string; answer: string }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      onClick={() => setFlipped(!flipped)}
      style={{
        width: '320px',
        height: '200px',
        border: '2px solid #444',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        margin: '1rem auto',
        padding: '1.5rem',
        cursor: 'pointer',
        backgroundColor: flipped ? '#d9eaff' : '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.3rem',
        fontWeight: '600',
        textAlign: 'center',
        userSelect: 'none',
        transition: 'background-color 0.3s',
      }}
      title="Click to flip"
    >
      {flipped ? answer : question}
    </div>
  );
};

const FlashCards = () => {
  const [selectedSubject, setSelectedSubject] = useState(subjectsData[0].name);
  const [selectedCategory, setSelectedCategory] = useState(subjectsData[0].categories[0]);
  const [userFlashcards, setUserFlashcards] = useState<
    { question: string; answer: string; subject: string; category: string }[]
  >([]);
  const [savedFlashcards, setSavedFlashcards] = useState<
    { question: string; answer: string }[]
  >([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  useEffect(() => {
    const subject = subjectsData.find((s) => s.name === selectedSubject);
    if (subject) setSelectedCategory(subject.categories[0]);
    setCurrentIndex(0);
  }, [selectedSubject]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  useEffect(() => {
    const stored = localStorage.getItem('savedFlashcards');
    if (stored) {
      setSavedFlashcards(JSON.parse(stored));
    }
  }, []);

  const filteredFlashcards = [
    ...preMadeFlashcards.filter((f) => f.subject === selectedSubject && f.category === selectedCategory),
    ...userFlashcards.filter((f) => f.subject === selectedSubject && f.category === selectedCategory),
  ];

  const handleAddFlashcard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newAnswer.trim()) {
      alert('Please fill both question and answer.');
      return;
    }
    const newCard = {
      question: newQuestion.trim(),
      answer: newAnswer.trim(),
      subject: selectedSubject,
      category: selectedCategory,
    };
    setUserFlashcards((prev) => [...prev, newCard]);
    setNewQuestion('');
    setNewAnswer('');
    setCurrentIndex(filteredFlashcards.length); // show the new card
  };

  const handleNext = () => {
    if (filteredFlashcards.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % filteredFlashcards.length);
  };

  const handleSaveFlashcard = () => {
    if (filteredFlashcards.length === 0) return;
    const currentCard = filteredFlashcards[currentIndex];
    const exists = savedFlashcards.some(
      (f) => f.question === currentCard.question && f.answer === currentCard.answer
    );
    if (!exists) {
      const updatedSaved = [...savedFlashcards, currentCard];
      setSavedFlashcards(updatedSaved);
      localStorage.setItem('savedFlashcards', JSON.stringify(updatedSaved));
      alert('Flashcard saved for studying!');
    } else {
      alert('Already saved!');
    }
  };

  return (
    <div style={{ padding: '1.5rem', maxWidth: '900px', margin: 'auto', textAlign: 'center' }}>
      <h2>Flashcards</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          Subject:{' '}
          <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
            {subjectsData.map((subject) => (
              <option key={subject.name} value={subject.name}>
                {subject.name}
              </option>
            ))}
          </select>
        </label>

        <label style={{ marginLeft: '1.5rem' }}>
          Category:{' '}
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {subjectsData.find((s) => s.name === selectedSubject)!.categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filteredFlashcards.length > 0 ? (
        <>
          <Flashcard
            key={`${filteredFlashcards[currentIndex].question}-${currentIndex}`}
            question={filteredFlashcards[currentIndex].question}
            answer={filteredFlashcards[currentIndex].answer}
          />
          <div>
            <button onClick={handleNext} style={{ marginRight: '1rem' }}>
              Next
            </button>
            <button onClick={handleSaveFlashcard}>Save</button>
          </div>
        </>
      ) : (
        <p>No flashcards found for this subject and category.</p>
      )}

      <hr style={{ margin: '2rem 0' }} />

      <h3>Add New Flashcard</h3>
      <form onSubmit={handleAddFlashcard}>
        <div>
          <input
            type="text"
            placeholder="Question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            style={{ width: '70%', padding: '0.5rem', marginBottom: '0.5rem' }}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Answer"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            style={{ width: '70%', padding: '0.5rem', marginBottom: '0.5rem' }}
          />
        </div>
        <button type="submit">Add Flashcard</button>
      </form>

      <hr style={{ margin: '2rem 0' }} />

      <h3>Saved Flashcards</h3>
      {savedFlashcards.length > 0 ? (
        <ul style={{ textAlign: 'left', maxWidth: '600px', margin: 'auto' }}>
          {savedFlashcards.map((f, i) => (
            <li key={`${f.question}-${i}`} style={{ marginBottom: '0.5rem' }}>
              <strong>Q:</strong> {f.question} <br />
              <strong>A:</strong> {f.answer}
            </li>
          ))}
        </ul>
      ) : (
        <p>No saved flashcards yet.</p>
      )}

      <div style={{ marginTop: '2rem' }}>
        <Link to="/quiz">Go to Quiz</Link>
      </div>
    </div>
  );
};

export default FlashCards;
