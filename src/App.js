import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './Auth';
import { Router } from './Router/Router';
import {ClubProvider} from "./Context/ClubProvider";
import './App.css';

function App() {


  
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
            <ClubProvider>
                <Router />
            </ClubProvider>
        </AuthProvider>
      </BrowserRouter>
    
    </>
  );
}

export default App;
