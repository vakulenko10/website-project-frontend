import { Link, Route, Routes } from "react-router-dom";
import { AuthData } from "../../auth/AuthWrapper";
import { nav } from "./navigation";
import Container from "../Container"

export const RenderRoutes = () => {

        const { user } = AuthData();
        
        return (
             <Routes>
             { nav.map((r, i) => {
                  
                  if (r.isPrivate && user.isAuthenticated) {
                       return <Route key={i} path={r.path} element={r.element}/>
                  } else if (!r.isPrivate) {
                       return <Route key={i} path={r.path} element={r.element}/>
                  } else return false
             })}
             
             </Routes>
        )
   }
   
   export const RenderHeader = () => {
   
        const { user, logout } = AuthData()
   
        const HeaderItem = ({r}) => {
             return (
                  <div className="headerItem"><Link to={r.path}>{r.name}</Link></div>
             )
        }
        return (
             <header className="header menu">
                <Container>
                    <div className="header_inner "> 

                    
                  { nav.map((r, i) => {
   
                       if (!r.isPrivate && r.isMenu) {
                            return (
                                 <HeaderItem key={i} r={r}/>
                            )
                       } else if (user.isAuthenticated && r.isMenu) {
                            return (
                                 <HeaderItem key={i} r={r}/>
                            )
                       } else return false
                  } )}
   
                  { user.isAuthenticated ?
                  <div className="headerItem"><Link to={'#'} onClick={logout}>Log out</Link></div>
                  :
                  <div className="headerItem"><Link to={'login'}>Log in</Link></div> }
                  </div>
                  </Container>
             </header>
        )
   }