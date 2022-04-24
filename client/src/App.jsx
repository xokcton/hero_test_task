import Main from './pages/Main'
import Error from './pages/Error'
import AddHero from './pages/AddHero'
import EditHero from './pages/EditHero'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom"
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/addHero" element={<AddHero />} />
        <Route path="/editHero/:id" element={<EditHero />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
