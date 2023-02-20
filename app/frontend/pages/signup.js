import React, {useState} from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';
import cx from 'classnames'
import styles from 'styles/Login.module.css'
import Link from 'next/link';
import Image from 'next/image';

const Signup = () => {
  const [signupError, setSignupError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    //Right now it calls /api/auth.js 
    //NEED TO CALL OUR NODE API 
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data && data.error) {
          setSignupError(data.message);
        }
        if (data && data.token) {
          //set cookie
          cookie.set('token', data.token, {expires: 2});
          //This line should call the users dashboard
          //Router.push('/');
        }
      });
  }
  //form onSubmit should call addUser
  return (
    <main className={cx(styles["form-signin"],"text-center","mt-5")}>
        <Image
          src="/studioustransparent.png"
          width={300}
          height={150}
        />
        <br />
        <br />
        <br />
      <form onSubmit={handleSubmit}>
        <div className="form-floating">
          <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">Create Account</button>
      </form>
      <p>Return to Login? <Link href="/"> Click here</Link></p>
    </main>
  );
};

export default Signup;