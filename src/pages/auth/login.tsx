import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "../../hooks/useAuth";
import "./auth.css";

import useGetUser from "../../hooks/useGetUser";

const schema = z.object({
  username: z.string().min(1, { message: "Username/Email is required" }),
  password: z
    .string()
    .min(5, { message: "Password must contain at least 5 characters" }),
});

type FormFields = z.infer<typeof schema>;

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
    
  };

  return (
    <div className="auth__container">
      <form action="" method="POST" onSubmit={handleSubmit(onSubmit)}>
        <h2>Log In</h2>
        <div>
          <input
            {...register("username")}
            type="text"
            name="username"
            id="username"
            placeholder="Enter username/email"
          />
          {errors.username && (
            <span className="error-message">{errors.username.message}</span>
          )}
        </div>
        <div>
          <input
            {...register("password")}
            type="text"
            name="password"
            id="password"
            placeholder="Enter password"
          />
          {errors.password && (
            <span className="error-message">{errors.password.message}</span>
          )}
        </div>
        <button>Log In</button>
        <p>Don't have an account?</p>
      </form>
    </div>
  );
}
