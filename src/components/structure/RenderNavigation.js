import { Link, Route, Routes, useLocation } from "react-router-dom";
import { AuthData } from "../../auth/AuthWrapper";
import { nav } from "./navigation";
import Container from "../Container";

// Component to render routes based on authentication
export const RenderRoutes = () => {
    const { user } = AuthData();

    return (
        <Routes>
            {nav.map((r, i) => {
                if (r.isPrivate && user.isAuthenticated) {
                    return <Route key={i} path={r.path} element={r.element} />;
                } else if (!r.isPrivate) {
                    return <Route key={i} path={r.path} element={r.element} />;
                }
                return null; // Avoid returning `false`
            })}
        </Routes>
    );
};

// Component to render header conditionally
export const RenderHeader = () => {
    const location = useLocation();
    const showHeader = location.pathname !== '/';
    const { user, logout } = AuthData();

    const HeaderItem = ({ r }) => (
        <div className="headerItem">
            <Link to={r.path}>{r.name}</Link>
        </div>
    );

    return showHeader ? (
        <header className="header menu">
            <Container>
                <div className="header_inner">
                    {nav.map((r, i) => {
                        if (!r.isPrivate && r.isMenu) {
                            return <HeaderItem key={i} r={r} />;
                        } else if (user.isAuthenticated && r.isMenu) {
                            return <HeaderItem key={i} r={r} />;
                        }
                        return null; // Avoid returning `false`
                    })}
                    {user.isAuthenticated ? (
                        <div className="headerItem">
                            <Link to="#" onClick={logout}>Log out</Link>
                        </div>
                    ) : (
                        <div className="headerItem">
                            <Link to="login">Log in</Link>
                        </div>
                    )}
                </div>
            </Container>
        </header>
    ) : null;
};
