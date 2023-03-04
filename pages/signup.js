import React, {useState} from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';
import cx from 'classnames'
import styles from 'styles/Login.module.css'
import Link from 'next/link';
import Image from 'next/image';

const Signup = () => {
    const addUser = async (event) => {
    event.preventDefault();

    const data = {
        email: event.target.email.value,
        password: event.target.password.value,
        first_name: event.target.first_name.value
    };

    const JSONdata = JSON.stringify(data);
    const endpoint = '/api/users';

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/JSON',
        },
        body: JSONdata,
    }

    const response = await fetch(endpoint, options);
    const result = await response.json();

    // check if the post was successful
    if (result.success) {
      // set the localsession variable
      localStorage.setItem('email', event.target.email.value);
      localStorage.setItem('first_name', event.target.first_name.value);

      // redirect the user back to the home page
      window.location.href = '/';
    }
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
      <form onSubmit={addUser}>
        <div className="form-floating">
          <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com" />
          <label htmlFor="email">Email address</label>
        </div>
        <div className="form-floating">
          <input type="text" className="form-control" id="first_name" name="first_name" placeholder="Name" />
          <label htmlFor="first_name">First name</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control" id="password" name="password" placeholder="Password" />
          <label htmlFor="password">Password</label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">Create Account</button>
      </form>
      <p>Return to Login? <Link href="/"> Click here</Link></p>
    </main>
  );
};

export default Signup;