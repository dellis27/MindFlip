// src/pages/Contact.tsx
import React from 'react';
function ContactInfo() {
    return (
      <div>
        <h1>Contact Us</h1>
        <p>You can reach us at: mindflip@example.com</p>
      </div>
    );
  }
  

const teamMembers = [
  {
    name: 'Luis Leon',
    github: 'https://github.com/leonluisf9',
  },
  {
    name: 'Cooper Ellis',
    github: 'https://github.com/dellis27',
  },
  {
    name: 'Javon Upson',
    github: 'https://github.com/jojocrunchy',
  },
  {
    name: 'Raven Hunter',
    github: 'https://github.com/rhunter27',
  },
];

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Meet the Team</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        {teamMembers.map((member) => (
          <div
            key={member.github}
            className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center transition hover:scale-105"
          >
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">{member.name}</h2>
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              View GitHub Profile →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
