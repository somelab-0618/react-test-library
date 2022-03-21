import React from 'react';

const Render = () => {
  return (
    <div>
      <h1>React Testing Library Lesson</h1>
      <input type='text' />
      <button>Click 1</button>
      <button>Click 2</button>
      <p>React Rendering Test</p>
      <span data-testid='copyright'>@React</span>
    </div>
  );
};

export default Render;
