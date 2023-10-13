import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./style.scss"
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
  {/* buraya import ettik ki tüm sayfalarda görebilmek için */}
    <ToastContainer/>
    </Provider>
  
  </React.StrictMode>,
)
