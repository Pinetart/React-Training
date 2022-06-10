import { useState, useRef, useContext } from "react";
import AuthContext from "../../context/authContext";
import { useHistory } from "react-router-dom";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const history = useHistory();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  async function fetchData(url, enteredEmail, enteredPassword) {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: { "Content-Type": "application/json" },
      });
      setIsLoading(false);
      if (response.ok) {
        alert("Successful login");
        const data = await response.json();
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        login(data.idToken, expirationTime.toISOString());
        history.replace("/");
      } else {
        throw new Error("Authentication failed");
      }
    } catch (err) {
      alert(err.message);
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setIsLoading(true);

    //validation
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyALDEpKwjthdMLNHloMHoQvf0FNLKt-7Oo";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyALDEpKwjthdMLNHloMHoQvf0FNLKt-7Oo";
    }
    fetchData(url, enteredEmail, enteredPassword);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending Request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
