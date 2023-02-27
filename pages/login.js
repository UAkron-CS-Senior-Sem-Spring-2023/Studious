import cx from 'classnames'
import Link from 'next/link'
import styles from '../styles/Login.module.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'


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

    // right now, just displaying if the user exists. In the future, this will log the user in and redirect them to the home page
    alert(result.exists);
  }

  return (
    <>
    <main className={cx(styles["form-signin"],"text-center","mt-5")}>
      <form onSubmit={verifyUser}>
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