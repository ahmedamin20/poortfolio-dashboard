import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import './css/style.css';
import './css/satoshi.css';
import 'jsvectormap/dist/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>

    <App />
    </Provider>
  </BrowserRouter>
)
