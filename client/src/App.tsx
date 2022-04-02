import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProtectedRoutes from './routes/ProtectedRoutes';
import Articles from './pages/Articles';
import ArticlesPlan from './pages/ArticlesPlan';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route
          path='/articles'
          element={
            <ProtectedRoutes>
              <Articles />
            </ProtectedRoutes>
          }
        />
        <Route path='/articles-plan' element={<ArticlesPlan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
