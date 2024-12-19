import { BrowserRouter, Route, Routes } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Application from './components/Applications';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={< Application />} />
        <Route path='/applications' element={< Application />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
