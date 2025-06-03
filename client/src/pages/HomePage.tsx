import CategoryList from '../components/CategoryList';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to MindFlip</h1>
      <div className="card-grid">
        <button onClick={() => navigate('/flashcards')}>Flashcards</button>
        <button onClick={() => navigate('/quiz')}>Quiz</button>
        <button onClick={() => navigate('/category')}>Categories</button>
        <button onClick={() => navigate('/list')}>List</button>
      </div>
      <CategoryList />
    </div>
  );
};

export default HomePage;
