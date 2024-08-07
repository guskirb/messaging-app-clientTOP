import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "../../hooks/useAuth";
import { logIn, setLocalStorage } from "../../api/user";
import "./auth.css";
import Loader from "../../components/loader/loader";

const schema = z.object({
  username: z.string().min(1, { message: "Username/Email is required" }),
  password: z
    .string()
    .min(5, { message: "Password must contain at least 5 characters" }),
});

export type FormFields = z.infer<typeof schema>;

export default function Login() {
  const { setAuth }: any = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const user = await logIn(data);
      if (!user.success) {
        throw new Error();
      }
      setLocalStorage(user);
      setAuth(user.user);
      window.location.href = "/";
    } catch (err) {
      setError("root", {
        message: "Incorrect Username/Password",
      });
    }
  };

  const onClickGuest = async () => {
    const user = await logIn({
      username: "guest",
      password: "password",
    });

    setLocalStorage(user);
    setAuth(user.user);
    window.location.href = "/";
  };

  if (isSubmitting) {
    return <Loader />;
  }

  return (
    <div className="auth__container">
      <div className="app-title">
        <div className="logo__icon"></div>
        <h1>Chat!</h1>
      </div>
      <form action="" method="POST" onSubmit={handleSubmit(onSubmit)}>
        <h2>Log In</h2>
        <div>
          <input
            {...register("username")}
            type="text"
            name="username"
            id="username"
            placeholder=" "
            className="form-input"
          />
          <label htmlFor="username" className="form-label">
            Username/Email
          </label>
          {errors.username && (
            <span className="error-message">{errors.username.message}</span>
          )}
        </div>
        <div>
          <input
            {...register("password")}
            type="password"
            name="password"
            id="password"
            placeholder=" "
            className="form-input"
          />
          <label htmlFor="password" className="form-label">
            Password
          </label>
          {errors.password && (
            <span className="error-message">{errors.password.message}</span>
          )}
        </div>
        <div className="button-wrapper">
          <button>Log In</button>
          <button type="button" onClick={onClickGuest}>
            Continue as Guest
          </button>
          {errors.root && (
            <span className="error-message">{errors.root.message}</span>
          )}
        </div>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}
