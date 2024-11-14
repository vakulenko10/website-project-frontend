import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthData } from "../../../auth/AuthWrapper";
import './Login.css';

export const Login = () => {
    const navigate = useNavigate();
    const { handleLogin } = AuthData();
    const [formData, setFormData] = useReducer((formData, newItem) => {
        return { ...formData, ...newItem };
    }, { userName: "", password: "", email: "" });

    const [errorMessage, setErrorMessage] = useState(null);

    const doLogin = async (event) => {
        event.preventDefault(); // Prevent default form submission

        try {
            await handleLogin(formData.userName, formData.password, formData.email); // Await the login function
            navigate("/profile"); // Navigate to the profile page
        } catch (error) {
            setErrorMessage("Login failed: " + error.message); // Set error message if login fails
        }
    };
    const redirectToHomepage = () => {
        navigate("/shop"); // This will redirect to the homepage ("/")
    };
    return (
        <main className="login__main px-3 bg-color7">
            <button 
                        
                        className=" absolute left-0 top-0 text-text1 p-2 bg-text3 opacity-50 hover:opacity-100 transition" 
                        onClick={redirectToHomepage}
                    >
                        go back
                    </button>
            <div className="login-wrapper">
                <div className="login-left">
                    <h1>Welcome back!</h1>
                    <form onSubmit={doLogin}>
                        <div className="input-group">
                            <input
                                value={formData.userName}
                                onChange={(e) => setFormData({ userName: e.target.value })}
                                type="text"
                                placeholder="username"
                                required
                            />
                        </div>
                        <div className="input-group">
                            {/* <label>Email</label> */}
                            <input
                                value={formData.email}
                                onChange={(e) => setFormData({ email: e.target.value })}
                                type="email" // Change type to email for validation
                                required // Make field required
                                placeholder="email"
                            />
                        </div>
                        <div className="input-group">
                            <input
                                value={formData.password}
                                onChange={(e) => setFormData({ password: e.target.value })}
                                type="password"
                                placeholder="password"
                                required
                            />
                        </div>
                        <button type="submit" className="login-button">Log in</button>
                        <p className="signup-text">
                            not a member? <a href="/signup" className="signup-link">Sign up now</a>
                        </p>
                        {errorMessage && <div className="error">{errorMessage}</div>}
                    </form>
                </div>
                <div className="login-right hidden md:flex">
                    <img src="https://res.cloudinary.com/dujdz2jbl/image/upload/v1731537067/frontend/uso5cjwmao189so9lutr.png" alt="Illustration" className="illustration hidden md:block" />
                </div>
            </div>
        </main>
    );
};
