import React from 'react';
import { Link } from 'react-router-dom';

const subjects = [
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
];

const SubjectList = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Subjects & Categories</h1>
      {subjects.map((subject) => (
        <div key={subject.name} style={{ marginBottom: '2rem' }}>
          <h2>{subject.name}</h2>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {subject.categories.map((category) => (
              <li key={category} style={{ marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: '600', marginRight: '1rem' }}>{category}</span>
                <Link
                  to={`/flashcards/${encodeURIComponent(subject.name)}/${encodeURIComponent(category)}`}
                  style={{
                    marginRight: '1rem',
                    color: '#007bff',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  Flashcards
                </Link>
                <Link
                  to={`/quiz/${encodeURIComponent(subject.name)}/${encodeURIComponent(category)}`}
                  style={{
                    color: '#28a745',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  Quiz
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SubjectList;
