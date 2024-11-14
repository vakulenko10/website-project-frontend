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
        <main className="login__main px-3 bg-color7">
            <div className="login-wrapper">
                <div className="login-left">
                    <h1>Welcome back!</h1>
                    <form onSubmit={doSignup}>
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
