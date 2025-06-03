import { useQuery, useMutation } from '@apollo/client';
import { GET_FLASHCARDS, UPDATE_FLASHCARD, DELETE_FLASHCARD } from '../utils/graphql';
import { useState } from 'react';

const List = () => {
  const { data, loading } = useQuery(GET_FLASHCARDS);
  const [updateFlashcard] = useMutation(UPDATE_FLASHCARD);
  const [deleteFlashcard] = useMutation(DELETE_FLASHCARD);
  const [editId, setEditId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({});

  const handleUpdate = (id: string) => {
    updateFlashcard({ variables: { id, ...editValues } });
    setEditId(null);
  };

  const handleDelete = (id: string) => {
    deleteFlashcard({ variables: { id } });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>All Flashcards</h1>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Question</th>
            <th>Answer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.flashcards.map((card: any) => (
            <tr key={card._id}>
              {editId === card._id ? (
                <>
                  <td><input defaultValue={card.category} onChange={(e) => setEditValues(v => ({ ...v, category: e.target.value }))} /></td>
                  <td><input defaultValue={card.question} onChange={(e) => setEditValues(v => ({ ...v, question: e.target.value }))} /></td>
                  <td><input defaultValue={card.answer} onChange={(e) => setEditValues(v => ({ ...v, answer: e.target.value }))} /></td>
                  <td><button onClick={() => handleUpdate(card._id)}>Save</button></td>
                </>
              ) : (
                <>
                  <td>{card.category}</td>
                  <td>{card.question}</td>
                  <td>{card.answer}</td>
                  <td>
                    <button onClick={() => setEditId(card._id)}>Edit</button>
                    <button onClick={() => handleDelete(card._id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => alert('Add New Flashcard Flow')}>Add Flashcard</button>
    </div>
  );
};

export default List;
