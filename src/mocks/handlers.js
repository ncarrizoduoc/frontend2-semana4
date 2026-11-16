import { http, HttpResponse, delay } from 'msw';
import librosJson from '../data/libros.json'

export const handlers = [
    // Endpoint para obtener solo los nombre e imágenes de géneros de libros
    http.get('/api/generos', async ({ request }) => {
        await delay(1000);
        const url = new URL(request.url);
        const error = url.searchParams.get('error');

        if (error === "404"){
            return HttpResponse.json({message: "Not found"}, {status: 404})

        } else if (error === "500"){
            return HttpResponse.json({message: "Internal Server Error"}, {status: 500})
        }

        const generos = librosJson.map(({ genero, img }) => ({ genero, img }));

        return HttpResponse.json(generos);
    }),

    // Endpoint para obtener los libros por género (o todos los libros si no se especifica una)
    http.get('/api/libros', async ({ request }) => {
        await delay(1000);

        const url = new URL(request.url)
        const genero = url.searchParams.get('genero');
        const error = url.searchParams.get('error');

        if (error === "404"){
            return HttpResponse.json({message: "Not found"}, {status: 404})

        } else if (error === "500"){
            return HttpResponse.json({message: "Internal Server Error"}, {status: 500})
        }

        let categorias = librosJson;

        if (genero) {
            const categoria = librosJson.find((item) => item.genero === genero);

            if (!categoria) {
                return HttpResponse.json({}, {
                    status: 404,
                    message: `No se encontraron libros para el género "${genero}"`,
                });
            }

            categorias = [categoria];
        }

        const libros = categorias.flatMap(({ genero: generoCategoria, productos }) =>
            productos.map((libro) => ({ ...libro, genero: generoCategoria }))
        );

        return HttpResponse.json(libros);
    })
]