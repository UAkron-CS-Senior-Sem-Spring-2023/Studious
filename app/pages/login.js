import cx from 'classnames'
import Link from 'next/link'
import styles from 'styles/Login.module.css'


const LoginSignupForm = () => {
  function handleSubmit(e) {
    e.preventDefault();
    //Right now it calls /api/auth.js 
    //NEED TO CALL OUR NODE API 
    fetch('/api/auth', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((r) => {
        return r.json();
      })
      .then((data) => {
        if (data && data.error) {
          setLoginError(data.message);
        }
        if (data && data.token) {
          //set cookie
          cookie.set('token', data.token, {expires: 2});
          //we passed everything. now to the users dashboard
          //Router.push('/');
        }
      });
  }

  return (
    <>
    <main className={cx(styles["form-signin"],"text-center","mt-5")}>
      <form onSubmit={handleSubmit}>
        <div className="form-floating">
          <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
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
