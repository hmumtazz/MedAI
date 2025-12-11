import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { DemoApp } from './components/DemoApp';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'demo'>('landing');

  return (
    <>
      {view === 'landing' ? (
        <LandingPage onStartDemo={() => setView('demo')} />
      ) : (
        <DemoApp onBack={() => setView('landing')} />
      )}
    </>
  );
};

export default App;