import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthData } from "../../../auth/AuthWrapper";
import './Signup.css';

export const Signup = () => {
    const navigate = useNavigate();
    const { handleSignup } = AuthData();
    const [formData, setFormData] = useReducer((formData, newItem) => ({
        ...formData, ...newItem
    }), { username: "", email: "", password: "", role: "user" });

    const [errorMessage, setErrorMessage] = useState(null);

    const doSignup = async (event) => {
        event.preventDefault();

        try {
            await handleSignup(formData.username, formData.email, formData.password, formData.role);
            navigate("/login");
        } catch (error) {
            setErrorMessage("Signup failed: " + error.message);
        }
    };

    return (
        <main className="signup__main">
            <div className="signup-container">
                <div className="signup-box">
                    <h1>Sign Up</h1>
                    <form onSubmit={doSignup}>
                        <div className="input-group">
                            <label>Username</label>
                            <input
                                value={formData.username}
                                onChange={(e) => setFormData({ username: e.target.value })}
                                type="text"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>Email</label>
                            <input
                                value={formData.email}
                                onChange={(e) => setFormData({ email: e.target.value })}
                                type="email"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <input
                                value={formData.password}
                                onChange={(e) => setFormData({ password: e.target.value })}
                                type="password"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>Role</label>
                            <input
                                value={formData.role}
                                onChange={(e) => setFormData({ role: e.target.value })}
                                type="text"
                                placeholder="user" // Default to 'user'
                            />
                        </div>
                        <button type="submit" className="signup-button">Sign Up</button>
                        <p className="login-text">
                            Already have an account? <a href="/login" className="login-link">Login</a>
                        </p>
                        {errorMessage && <div className="error">{errorMessage}</div>}
                    </form>
                </div>
            </div>
        </main>
    );
};
