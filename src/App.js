import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CrudAdd from './components/CrudAdd';
function App() {

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CrudAdd />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
