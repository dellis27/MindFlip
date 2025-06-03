import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { SAVE_FLASHCARD, GET_FLASHCARDS } from '../utils/graphql';
import { useNavigate } from 'react-router-dom';

const AddFlashcard = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: '',
  });

  const [saveFlashcard, { error }] = useMutation(SAVE_FLASHCARD, {
    refetchQueries: [{ query: GET_FLASHCARDS }],
    onCompleted: () => navigate('/flashcards'),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
      ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await saveFlashcard({
        variables: {
          input: formData,
        },
      });
    } catch (err) {
      console.error('Error saving flashcard:', err);
    }
  };

  const CATEGORIES = [
    'General',
      'Science - Physics',
      'Science - Chemistry',
      'Science - Biology',
      'Science - Astronomy',
      'History - Ancient',
      'History - Medieval',
      'History - Modern',
      'History - World Wars',
      'Programming - JavaScript',
      'Programming - Python',
      'Programming - Java',
      'Programming - C++',
      'Programming - Web Development',
      'Language - English',
      'Language - Spanish',
      'Language - French',
      'Language - German',
      'Language - Chinese',
  ]

  return (
    <div>
      <h2>Add New Flashcard</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Question:
          <input
            type="text"
            name="question"
            value={formData.question}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Answer:
          <textarea
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Category:
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
          <option value="" disabled>Select a category</option>
                {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                {cat}
          </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Save Flashcard</button>
      </form>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default AddFlashcard;
