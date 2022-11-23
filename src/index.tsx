import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ITodo } from './types/todo.interface';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
     <App />
);

reportWebVitals();
