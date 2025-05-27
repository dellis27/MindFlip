import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { Container, Col, Form, Button, Card, Row } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { SAVE_FLASHCARD } from './graphql';
import Auth from './auth';
import { saveflashcardIds, getflashcardIds } from '../utils/localStorage';
import type { flashcard } from '../models/Flashcard';
import type { GoogleAPIBook } from '../models/GoogleAPIBook';

const SearchFlashCards = () => {
  const [searchedflashcards, setSearchedflashcards] = useState<flashcard[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [savedflashcardIds, setSavedflashcardIds] = useState(getflashcardIds());

  const [saveFlashCard] = useMutation(SAVE_FLASHCARD);

  useEffect(() => {
    return () => saveflashcardIds(savedflashcardIds);
});

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchInput) {
      return;
    }

    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}`);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const { items } = await response.json();

      const flashcardData = items.map((flashcard: GoogleAPIBook) => ({
        flashcardId: flashcard.id,
        question: flashcard.volumeInfo.authors || ['No author to display'],
        answer: flashcard.volumeInfo.title,
        category: flashcard.volumeInfo.description,
        image: flashcard.volumeInfo.imageLinks?.thumbnail || '',
      }));

      setSearchedflashcards(flashcardData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveFlashcard = async (flashcardId: string) => {
    const flashcardToSave = searchedflashcards.find((flashcard) => flashcard.flashcardId === flashcardId);
    if (!flashcardToSave) return;

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      console.error('No token found. User must be logged in.');
      return;
    }

    try {
      const { data } = await saveFlashCard({
        variables: { input: flashcardToSave },
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      });

      if (!data) {
        throw new Error('No data received from saveFlashCard mutation');
      }

      setSavedflashcardIds([...savedflashcardIds, flashcardToSave.flashcardId]);
    } catch (err) {
      console.error('Error saving flashcard:', err);
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Flashcard!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a Flashcard"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className="pt-5">
          {searchedflashcards.length ? `Viewing ${searchedflashcards.length} results:` : 'Search for a flashcard to begin'}
        </h2>
        <Row>
          {searchedflashcards.map((flashcard) => (
            <Col md="4" key={flashcard.flashcardId}>
              <Card border="dark">
                {flashcard.image && <Card.Img src={flashcard.image} alt={`Cover`} variant="top" />}
                <Card.Body>
                  <Card.Title>{flashcard.question}</Card.Title>
                  <p className="small">Answer: {flashcard.answer.join(', ')}</p>
                  <Card.Text>{flashcard.category}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedflashcardIds.includes(flashcard.flashcardId)}
                      className="btn-block btn-info"
                      onClick={() => handleSaveFlashcard(flashcard.flashcardId)}
                    >
                      {savedflashcardIds.includes(flashcard.flashcardId) ? 'This flashcard has already been saved!' : 'Save this Flashcard!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SearchFlashCards;
