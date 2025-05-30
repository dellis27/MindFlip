import React from 'react';

const subjects = [
    {
        name: 'Science',
        items: ['Physics', 'Chemistry', 'Biology', 'Astronomy'],
    },
    {
        name: 'History',
        items: ['Ancient', 'Medieval', 'Modern', 'World Wars'],
    },
    {
        name: 'Programming',
        items: ['JavaScript', 'Python', 'Java', 'C++', 'Web Development'],
    },
    {
        name: 'Language',
        items: ['English', 'Spanish', 'French', 'German', 'Chinese'],
    },
];

const Category: React.FC = () => {
    return (
        <div className="category-container">
            <h1>Categories</h1>
            {subjects.map((subject, index) => (
                <div key={index} className="category">
                    <h2>{subject.name}</h2>
                    <ul>
                        {subject.items.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Category;