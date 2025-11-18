// src/pages/LoginPage.tsx
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

type LoginForm = { email: string; password: string };
type Props = { setLoggedIn: React.Dispatch<React.SetStateAction<boolean>> };

export default function LoginPage({ setLoggedIn }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    setError("");
    try {
      const res = await axios.post("/api/users/login", data, { withCredentials: true });
      if (res.data.user) {
        setLoggedIn(true);
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 via-white to-blue-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Iniciar Sesión</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-left font-semibold mb-1">Correo</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="ejemplo@email.com"
              {...register("email", { required: "El email es obligatorio" })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-left font-semibold mb-1">Contraseña</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="••••••••"
              {...register("password", { required: "La contraseña es obligatoria" })}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all"
          >
            Ingresar
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          ¿No tienes cuenta? <Link to="/register" className="text-blue-600 hover:underline">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}