import { Link } from 'react-router'
import { useCallback, useEffect, useState } from 'react'
import Generos from '../components/Generos'

let generosCache = null;

async function getGeneros(tipoError = "", signal) {
    const endpoint = tipoError
        ? `/api/generos?error=${encodeURIComponent(tipoError)}`
        : "/api/generos";

    try {
        const respuesta = await fetch(endpoint, { signal });

        if (!respuesta.ok) {
            if (respuesta.status === 404) {
                throw new Error("No se han encontrado géneros");
            } else if (respuesta.status === 500) {
                throw new Error("El servidor no responde");
            }
            throw new Error("Error desconocido");
        }

        return await respuesta.json();
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error(
                "Error al cargar géneros, intente más tarde.",
                { cause: error }
            );
        }
        throw error;
    }
}

function Inicio() {
    const [generos, setGeneros] = useState(() => generosCache ?? []);
    const [cargando, setCargando] = useState(() => generosCache === null);
    const [error, setError] = useState("");

    const cargarGeneros = useCallback((tipoError = "") => {
        setCargando(true);
        setError("");

        getGeneros(tipoError)
            .then((data) => {
                if (!tipoError) {
                    generosCache = data;
                }
                setGeneros(data);
            })
            .catch((error) => setError(error.message))
            .finally(() => setCargando(false));
    }, []);

    useEffect(() => {
        if (generosCache !== null) {
            return;
        }

        const controller = new AbortController();

        getGeneros("", controller.signal)
            .then((data) => {
                generosCache = data;
                setGeneros(data);
            })
            .catch((error) => {
                if (error.name !== "AbortError") {
                    setError(error.message);
                }
            })
            .finally(() => {
                if (!controller.signal.aborted) {
                    setCargando(false);
                }
            });

        return () => controller.abort();
    }, []);

    return (
        <div>
            <header className="mt-4 mb-12">
                <div className="mx-auto mb-4 flex max-w-6xl flex-col items-center justify-center gap-6 px-4 md:flex-row">
                    <div className="w-full text-left md:mr-3">
                        <h1>Bienvenido a ExLibris</h1>
                        <p>¡La librería más grande de Chile!</p>
                    </div>
                    <article className="grid w-full max-w-[540px] overflow-hidden rounded border-2 border-gray-200 bg-white shadow-sm md:grid-cols-[1fr_2fr]">
                        <img
                            src={"https://picsum.photos/seed/portada/600/600"}
                            className="block h-[180px] w-full object-cover md:h-full md:min-h-[240px]"
                            alt="Imagen de frutas"
                        />
                        <div className="flex flex-col justify-center items-center bg-gray-50 p-5">
                            <h2 className="text-gray-900">Conoce nuestro catálogo</h2>
                            <p className="mb-3 text-gray-700">
                                Tenemos el catálogo más grande de Chile, con una amplia variedad de libros nacionales e importados.
                            </p>
                            <Link to="/catalogo" className="inline-flex w-fit items-center rounded bg-gray-700 px-3 py-2 text-white hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
                                Explorar libros
                            </Link>
                        </div>
                    </article>
                </div>
            </header>
            <section className="bg-gray-900 py-8">
                <h2 className="text-white mb-4">
                    Explora libros por género
                </h2>
                <Generos
                    generos={generos}
                    cargando={cargando}
                    error={error}
                    cargarGeneros={cargarGeneros}
                />
            </section>
        </div>
    )

}

export default Inicio