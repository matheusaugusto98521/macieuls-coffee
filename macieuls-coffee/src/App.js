import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Products from './components/view/Products';
import RegisterProduct from './components/view/RegisterProduct';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path='/register' element={<RegisterProduct />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
