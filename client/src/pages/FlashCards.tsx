import { useQuery } from '@apollo/client';
import { GET_FLASHCARDS } from '../utils/graphql';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';

interface FlashcardType {
  _id: string;
  question: string;
  answer: string;
  category: string;
  createdBy: string;
  createdAt: string;
  lastReviewed?: string;
}

const FlashCards = () => {
  const { loading, data, error } = useQuery<{ flashcards: FlashcardType[]}>(GET_FLASHCARDS);
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading flashcards.</p>;

  return (
    <div>
      <h1>Your Flashcards</h1>
      <div>
        <button onClick={() => alert("Start reviewing flashcards!")}>Start Review</button>
        <button onClick={() => navigate('/add-flashcard')}>Add Flashcard</button>
      </div>
      <div>
        {data?.flashcards?.length ? (
          data.flashcards.map((card: FlashcardType) => (
            <Card key={card._id} flashcard={card} />
          ))
          ) : (
            <p>No flashcards available.</p>
          )}


      </div>
    </div>
  );
};

export default FlashCards;
