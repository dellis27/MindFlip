export const getflashcardIds = () => {
  const savedflashcardIds = localStorage.getItem('saved_flashcards')
    ? JSON.parse(localStorage.getItem('saved_flashcards')!)
    : [];

  return savedflashcardIds;
};

export const saveflashcardIds = (flashcardIdArr: string[]) => {
  if (flashcardIdArr.length) {
    localStorage.setItem('saved_flashcards', JSON.stringify(flashcardIdArr));
  } else {
    localStorage.removeItem('saved_flashcards');
  }
};

export const removeflashcardId = (flashcardId: string) => {
  const savedflashcardIds = localStorage.getItem('saved_flashcards')
    ? JSON.parse(localStorage.getItem('saved_flashcards')!)
    : null;

  if (!savedflashcardIds) {
    return false;
  }

  const updatedSavedflashcardIds = savedflashcardIds?.filter((savedflashcardId: string) => savedflashcardId !== flashcardId);
  localStorage.setItem('saved_flashcards', JSON.stringify(updatedSavedflashcardIds));

  return true;
};
