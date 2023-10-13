import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AddJob from './pages/AddJob';
import JobList from './pages/JobList';
import Header from './components/Header';


function App() {


  return (
    <>
  <BrowserRouter>
  <Header/>
  <Routes>
    
    <Route path='/' element={<JobList/>}/>
    <Route path='/add-job' element={<AddJob/>}/>
  
  
  </Routes>
  </BrowserRouter>
    </>
  )
}

export default App
