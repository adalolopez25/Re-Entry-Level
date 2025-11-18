// src/pages/DashboardPage.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type User = { id: number; name: string; email: string };
type Props = { setLoggedIn: React.Dispatch<React.SetStateAction<boolean>> };

export default function DashboardPage({ setLoggedIn }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/users/profile", { withCredentials: true });
        setUser(res.data);
        setName(res.data.name);
        setEmail(res.data.email);
      } catch {
        setLoggedIn(false);
        navigate("/login");
      }
    };
    fetchProfile();
  }, [navigate, setLoggedIn]);

  const handleUpdate = async () => {
    setMessage("");
    try {
      const body: any = { name, email };
      if (newPassword) {
        body.currentPassword = currentPassword;
        body.newPassword = newPassword;
      }
      const res = await axios.put("/api/users/profile", body, { withCredentials: true });
      setUser(res.data.user);
      setMessage("Perfil actualizado");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Error al actualizar");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/users/logout", {}, { withCredentials: true });
      setLoggedIn(false);
      navigate("/login");
    } catch {
      console.error("Error al cerrar sesión");
    }
  };

  if (!user) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 via-white to-blue-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-lg p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Bienvenido, <span className="text-blue-800">{user.name.split(" ")[0]}</span>
        </h1>

        <div className="space-y-5">
          <input
            type="text"
            className="w-full p-3 border rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
          />
          <input
            type="email"
            className="w-full p-3 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            className="w-full p-3 border rounded-lg"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Contraseña actual"
          />
          <input
            type="password"
            className="w-full p-3 border rounded-lg"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nueva contraseña"
          />

          {message && <p className={`text-center font-semibold ${message.includes("actualizado") ? "text-green-600" : "text-red-600"}`}>{message}</p>}

          <div className="flex gap-3">
            <button onClick={handleUpdate} className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
              Guardar
            </button>
            <button onClick={handleLogout} className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}