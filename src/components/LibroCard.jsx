import { Link } from 'react-router'

function LibroCard({ libro }) {

    return (
        <div key={libro.id} className="h-full bg-gray-100">
            <article className="flex h-full flex-col rounded border-2 border-gray-400 p-2">
                <div className="flex justify-center">
                    <div className="flex h-40 w-40 items-center justify-center bg-gray-100">
                        <img
                            className="h-full w-full object-cover"
                            src={libro.url}
                            alt={libro.nombre}
                        />
                    </div>
                </div>

                <div className="flex flex-1 flex-col justify-between px-4 py-4">
                    <div>
                        <p className="mb-2 w-full rounded bg-gray-200 px-2 py-1 text-sm text-gray-800">
                            {libro.genero}
                        </p>
                        <p className="text-sm">{libro.editorial}</p>
                        <p className="mb-2 text-xl font-bold">{libro.nombre}</p>
                        <p className="mb-4 text-sm text-gray-700">{libro.autor}</p>
                    </div>
                    <div>
                        <p className="mb-2 text-sm text-gray-500">Stock: {libro.stock}</p>
                        <p className="text-lg font-semibold text-gray-700">
                            ${libro.precio}
                        </p>
                    </div>
                </div>

                <div className="mt-auto flex flex-col gap-2 px-4 pb-2">
                    <Link to={`/productos/${libro.id}`} className="rounded-full bg-black hover:bg-gray-700 px-3 py-2 text-sm font-semibold text-white">
                        Ver detalle
                    </Link>
                </div>
            </article>
        </div>
    )
}

export default LibroCard