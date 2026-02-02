// src/components/Course.jsx
import React from 'react';

// Header component (renders course name)
const Header = ({ name }) => <h2>{name}</h2>;

// Part component (renders a single part)
const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

// Content component (renders all parts)
const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </div>
);

// Course component (Exercises 2.1–2.3, 2.5)
const Course = ({ course }) => {
  // Exercise 2.2 & 2.3: sum of exercises
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <strong>Total exercises: {total}</strong>
    </div>
  );
};

export default Course;
