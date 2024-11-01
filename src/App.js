import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AuthWrapper } from './auth/AuthWrapper';
import { RenderHeader, RenderRoutes } from './components/structure/RenderNavigation';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthWrapper>
          <RenderHeader />
          <RenderRoutes />
        </AuthWrapper>
      </BrowserRouter>      
    </div>
  );
}

export default App;



//import React from 'react';
// import Header from './components/Header';
// import Form from './components/Form';

// function App() {
//   return (
//     <div className="app-container">
//       <Header />
//       <Form />
//     </div>
//   );
// }

// export default App;
