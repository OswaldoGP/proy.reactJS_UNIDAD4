import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Error from './pages/Error';
import Usuario from './pages/Usuario';
import Personajes from './pages/Personajes';
import PersonajeDetalle from './pages/PersonajeDetalle';
import RutasPrivadas from './routes/RutasPrivadas';
import RutasPublicas from './routes/RutasPublicas';


const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Navbar />
      <Routes>
        <Route path='/' element={<RutasPrivadas><Home /></RutasPrivadas>} />
        <Route path='/login' element={<RutasPublicas><Login /></RutasPublicas>} />
        <Route path='/registro' element={<RutasPublicas><Registro /></RutasPublicas>} />
        <Route path='/usuario/:nombre' element={<RutasPrivadas><Usuario /></RutasPrivadas>} />
        <Route path='/personajes' element={<RutasPrivadas><Personajes /></RutasPrivadas>} />
        <Route path='/personaje/:id' element={<RutasPrivadas><PersonajeDetalle /></RutasPrivadas>} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
