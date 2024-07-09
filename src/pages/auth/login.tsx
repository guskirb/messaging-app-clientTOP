import "./auth.css"

export default function Login() {
  return (
    <div className="auth__container">
      <form action="" method="POST">
        <h2>Log In</h2>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter username/email"
        />
        <input
          type="text"
          name="password"
          id="password"
          placeholder="Enter password"
        />
        <button>Log In</button>
        <p>Don't have an account?</p>
      </form>
    </div>
  );
}
