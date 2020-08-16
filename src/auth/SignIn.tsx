import React, { useState } from "react";
import { Link, RouteComponentProps } from "@reach/router";
import { auth } from "../firebase";

const SignIn = (props: RouteComponentProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<null | string>(null);
  const signInWithEmailAndPasswordHandler = (
    event: any,
    email: string,
    password: string
  ) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch((error: any) => {
      setError("Error signing in with password and email!");
      console.error("Error signing in with password and email", error);
    });
  };

  const onChangeHandler = (event: any) => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <div>
        {error !== null && <div>{error}</div>}
        <form>
          <label htmlFor="userEmail">Email:</label>
          <input
            type="email"
            name="userEmail"
            value={email}
            placeholder="E.g: faruq123@gmail.com"
            id="userEmail"
            onChange={(event) => onChangeHandler(event)}
          />
          <label htmlFor="userPassword">Password:</label>
          <input
            type="password"
            name="userPassword"
            value={password}
            placeholder="Your Password"
            id="userPassword"
            onChange={(event) => onChangeHandler(event)}
          />
          <button
            onClick={(event) => {
              signInWithEmailAndPasswordHandler(event, email, password);
            }}
          >
            Sign in
          </button>
        </form>
        <p>or</p>
        <button>Sign in with Google</button>
        <p>
          Don't have an account? <Link to="signUp">Sign up here</Link> <br />{" "}
          <Link to="passwordReset">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
};
export default SignIn;