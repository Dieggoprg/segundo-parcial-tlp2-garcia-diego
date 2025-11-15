import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";

export const HomePage = () => {

  const [userName, setUserName] = useState("");
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reloading, setReloading] = useState(false); 
  const [error, setError] = useState(null);


  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost/api/profile", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Error al obtener el perfil");

      const data = await res.json();
      setUserName(data.username || "Usuario");
    } catch (err) {
      console.error(err);
      setUserName("Usuario");
    }
  };

  const fetchHeroes = async () => {
    try {
      const res = await fetch("http://localhost/api/superheroes", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Error al obtener superhéroes");

      const data = await res.json();
      setHeroes(data || []);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los superhéroes");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchProfile();
        await fetchHeroes();
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleReload = async () => {
    setReloading(true);
    setError(null);

    try {
      await fetchHeroes();
    } finally {
      setReloading(false);
    }
  };

  if (loading) return <Loading />;

  if (error)
    return (
      <div>{error}</div>
    );

  if (heroes.length === 0)
    return (
      <div>
        No hay superhéroes disponibles.
      </div>
    );

  return (
    <div className="container mx-auto px-4 pb-8">
      <h1 className="text-4xl font-bold text-center mt-8 mb-2 text-gray-800">
        ¡Bienvenido/a, {userName}!
      </h1>

      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
        Galería de Superhéroes
      </h2>

      <div className="flex justify-center mb-8">
        <button
          onClick={handleReload}
          disabled={reloading}
          
        >
          {reloading ? "Cargando..." : "Recargar"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {heroes.map((hero) => (
          <div
            key={hero.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <img
              src={hero.image}
              alt={hero.superhero}
              className="h-64 object-cover w-full"
            />

            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {hero.superhero}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};











