import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// No idea why type script complains if this dosn't say as something
root.render(<App /> as React.ReactNode);
