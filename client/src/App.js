import './App.css';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
//import Main from './components/Main';
import { lightTheme, darkTheme } from './themes';
import { ThemeProvider } from '@emotion/react';
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import RegisterForm from './components/RegisterForm';
import { CssBaseline } from '@mui/material';

const Main = () => (
  <main>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<LoginForm />}/>
      <Route path="/register" element={<RegisterForm />}/>
    </Routes>
  </main>
)

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <Header />
      <Main />
    </ThemeProvider>
  );
}

export default App;
