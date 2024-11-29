import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AuthWrapper } from './auth/AuthWrapper';
import { RenderHeader, RenderRoutes } from './components/structure/RenderNavigation';
import Cart from './components/Cart';
import CustomCursor from './components/CustomCursor';
import { CursorProvider } from './components/CursorWrapper';


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
         <CursorProvider>
          <AuthWrapper>
         
          <CustomCursor/>
          <RenderHeader />
          <RenderRoutes />
          <Cart />
          
        </AuthWrapper>
        </CursorProvider>
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
