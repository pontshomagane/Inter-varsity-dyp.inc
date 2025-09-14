import React from 'react';
import ReactDOM from 'react-dom/client';

const TestComponent = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: 'red', color: 'white' }}>
      <h1>TEST COMPONENT - If you see this, React is working!</h1>
      <p>This is a test to verify React is rendering correctly.</p>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<TestComponent />);
} else {
  console.error('Root element not found');
}
