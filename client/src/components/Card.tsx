type FlashcardProps = {
  flashcard: {
    _id: string;
    question: string;
    answer: string;
    category: string;
  };
};

const Card = ({ flashcard }: FlashcardProps) => {
  return (
    <div className="flashcard">
      <h3>{flashcard.question}</h3>
      <p><strong>Answer:</strong> {flashcard.answer}</p>
      <p><em>Category:</em> {flashcard.category}</p>
    </div>
  );
};

export default Card;