import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../api/user";

const schema = z
  .object({
    username: z.string().min(1, { message: "User is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(5, { message: "Password must contain at least 5 characters" }),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export type FormFields = z.infer<typeof schema>;

export default function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
    try {
      delete data.confirm;
      let user = await registerUser(data);
      if (!user.success) {
        throw new Error();
      } else {
        navigate("/login", { replace: true });
      }
    } catch (err) {
      setError("root", {
        message: "Username/Email already registered",
      });
    }
  };

  return (
    <div className="auth__container">
      <form action="" method="POST" onSubmit={handleSubmit(onSubmit)}>
        <h2>Sign Up</h2>
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
            Username
          </label>
          {errors.username && (
            <span className="error-message">{errors.username.message}</span>
          )}
        </div>
        <div>
          <input
            {...register("email")}
            type="email"
            name="email"
            id="email"
            placeholder=" "
            className="form-input"
          />
          <label htmlFor="email" className="form-label">
            Email
          </label>
          {errors.email && (
            <span className="error-message">{errors.email.message}</span>
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
        <div>
          <input
            {...register("confirm")}
            type="password"
            name="confirm"
            id="confirm"
            placeholder=" "
            className="form-input"
          />
          <label htmlFor="confirm" className="form-label">
            Confirm Password
          </label>
          {errors.confirm && (
            <span className="error-message">{errors.confirm.message}</span>
          )}
        </div>
        <div className="button-wrapper">
          <button>Create Account</button>
          {errors.root && (
            <span className="error-message">{errors.root.message}</span>
          )}
        </div>
        <p>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </form>
    </div>
  );
}
