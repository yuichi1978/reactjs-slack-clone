import { useState } from "react";
import { Link } from "react-router-dom";
import { authRepository } from "../../modules/auth/auth.repository";
import { useCurrentUserStore } from "../../modules/auth/current-user.state";
import { Navigate } from "react-router-dom";
import "./auth.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser, setCurrentUser } = useCurrentUserStore();

  const signup = async () => {
    if (name === "" || email === "" || password === "") return;

    const { user, token } = await authRepository.signup(name, email, password);
    localStorage.setItem("token", token)
    setCurrentUser(user);
  };

  if (currentUser != null) return <Navigate to="/" />;

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h1 className="signup-title">Sign up to continue</h1>
        <p className="signup-subtitle">
          Use your email or another service to continue
        </p>

        <div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="continue-button"
            disabled={name === "" || email === "" || password === ""}
            onClick={signup}
          >
            Continue
          </button>
        </div>
        <p className="signin-link">
          ログインは <Link to="/signin">こちら</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
