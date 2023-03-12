import cx from 'classnames'
import Link from 'next/link'
import styles from '../styles/Login.module.css'
import Image from 'next/image'
import { setToken, getSession } from 'next-auth/react';
// import jwt from 'jsonwebtoken'
import cookie from 'js-cookie'

// login form
const LoginSignupForm = () => {
  const verifyUser = async (event) => {
    event.preventDefault();

    const data = {
        email: event.target.email.value,
        password: event.target.password.value
    };
    
    const JSONdata = JSON.stringify(data);
    const endpoint = '/api/login';

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/JSON',
        },
        body: JSONdata,
    }

    const response = await fetch(endpoint, options);
    const result = await response.json();

    // check if the result from the API is valid
    if (result.exists) {
      // login is valid, set the localStorage field for email and first name
      localStorage.setItem('email', event.target.email.value);
      localStorage.setItem('first_name', result.first_name)

      // redirect the user back to the home page
      window.location.href = '/';
      
    } else {
      alert("Invalid username and password");
    }
  }

  return (
    <>
    <main className={cx(styles["form-signin"],"text-center","mt-5")}>
    <Image
          src="/studioustransparent.png"
          width={300}
          height={150}
        />
        <br />
        <br />
        <br />
      <form onSubmit={verifyUser}>
        <div className="form-floating">
          <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com" />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control" id="password" name="password" placeholder="Password" />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <div className={cx(styles.checkbox,"mb-3")}>
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
      </form>
      <p>New User? <Link href="/signup"> Create Here</Link></p>
    </main>

  </>
  )
}

export default LoginSignupForm