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

    return (
        <main className="login__main">
            <div className="login-container">
                <div className="login-box">
                    <h1>Login</h1>
                    <form onSubmit={doLogin}>
                        <div className="input-group">
                            <label>User Name</label>
                            <input
                                value={formData.userName}
                                onChange={(e) => setFormData({ userName: e.target.value })}
                                type="text"
                                required // Make field required
                            />
                        </div>
                        <div className="input-group">
                            <label>Email</label>
                            <input
                                value={formData.email}
                                onChange={(e) => setFormData({ email: e.target.value })}
                                type="email" // Change type to email for validation
                                required // Make field required
                            />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <div className="password-group">
                                <input
                                    value={formData.password}
                                    onChange={(e) => setFormData({ password: e.target.value })}
                                    type="password"
                                    required // Make field required
                                />
                                <a href="#" className="reset-password">Reset Password</a>
                            </div>
                        </div>
                        <button type="submit" className="login-button">Login</button>
                        <p className="signup-text">
                            Don’t have an account? <a href="/signup" className="signup-link">Sign Up</a>
                        </p>
                        {errorMessage && <div className="error">{errorMessage}</div>} {/* Show error message if exists */}
                    </form>
                </div>
            </div>
        </main>
    );
};
