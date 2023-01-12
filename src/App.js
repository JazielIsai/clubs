import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './Auth';
import { Router } from './Router/Router';
import './App.css';

function App() {


  
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </BrowserRouter>
    
    </>
  );
}

export default App;
