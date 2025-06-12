import { useState } from "react";
import { Link } from "react-router-dom";
import { authRepository } from "../../modules/auth/auth.repository";
import { useCurrentUserStore } from "../../modules/auth/current-user.state";
import { Navigate } from "react-router-dom";
import "../Signup/auth.css";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser, setCurrentUser } = useCurrentUserStore();

  const signin = async () => {
    if (email === "" || password === "") return;

    const { user, token } = await authRepository.signin(email, password);
    localStorage.setItem("token", token);
    setCurrentUser(user);
  };

  if (currentUser != null) return <Navigate to="/" />;

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h1 className="signup-title">Sign in</h1>
        <p className="signup-subtitle">メールアドレスでログインしてください</p>

        <div>
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
            disabled={email === "" || password === ""}
            onClick={signin}
          >
            Continue
          </button>
        </div>
        <p className="signin-link">
          ユーザー登録は<Link to="/signup">こちら</Link>
        </p>
      </div>
    </div>
  );
}

export default Signin;
