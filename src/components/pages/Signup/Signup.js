import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthData } from "../../../auth/AuthWrapper";
import './Signup.css';
import { validateForm } from "../../../services/Validation";

export const Signup = () => {
    const navigate = useNavigate();
    const { handleSignup } = AuthData();
    const [formData, setFormData] = useReducer((formData, newItem) => ({
        ...formData, ...newItem
    }), { username: "", email: "", password: ""});

    const [errorMessage, setErrorMessage] = useState(null);
    const [formErrors, setFormErrors] = useState({});

    // Real-time validation for individual fields
    const validateField = (name, value) => {
        const newErrors = { ...formErrors };
        const tempFormData = { ...formData, [name]: value }; // Temporary form data for validation
        const errors = validateForm(tempFormData);

        if (errors[name]) {
            newErrors[name] = errors[name];
        } else {
            delete newErrors[name];
        }
        setFormErrors(newErrors);
    };

    const doSignup = async (event) => {
        event.preventDefault();

        // Validate the form before submission
        const errors = validateForm(formData);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            await handleSignup(formData.username, formData.email, formData.password);
            navigate("/login");
        } catch (error) {
            setErrorMessage("Signup failed: " + error.message);
        }
    };

    const redirectToHomepage = () => {
        navigate("/shop");
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
                    <h1>Create new account</h1>
                    <form onSubmit={doSignup}>
                        <div className="input-group">
                            <input
                                value={formData.username}
                                onChange={(e) => {
                                    setFormData({ username: e.target.value });
                                    validateField("username", e.target.value);
                                }}
                                type="text"
                                placeholder="username"
                                required
                            />
                            {formErrors.username && <div className="error">{formErrors.username}</div>}
                        </div>
                        <div className="input-group">
                            <input
                                value={formData.email}
                                onChange={(e) => {
                                    setFormData({ email: e.target.value });
                                    validateField("email", e.target.value);
                                }}
                                type="email"
                                placeholder="email"
                                required
                            />
                            {formErrors.email && <div className="error">{formErrors.email}</div>}
                        </div>
                        <div className="input-group">
                            <input
                                value={formData.password}
                                onChange={(e) => {
                                    setFormData({ password: e.target.value });
                                    validateField("password", e.target.value);
                                }}
                                type="password"
                                placeholder="password"
                                required
                            />
                            {formErrors.password && <div className="error">{formErrors.password}</div>}
                        </div>
                        <button type="submit" className="login-button">Sign up</button>
                        <p className="signup-text">
                            not a member? <a href="/login" className="signup-link">Login</a>
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
