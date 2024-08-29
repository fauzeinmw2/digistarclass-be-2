const http = require('http');
const https = require('https');

const PORT = 3000;

// Data Local
let pokemons = [
    { name: "Bulbasaur", type: "Grass/Poison" }
];

const requestListener = (req, res) => {
    const { method, url } = req;

    // Ngambil data dari PokeAPI
    if (url.startsWith('/pokemon-pokeapi') && method === 'GET') {
        const id = url.split('/')[2];
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;

        https.get(apiUrl, (apiRes) => {
            let data = '';

            apiRes.on('data', (chunk) => {
                data += chunk;
            });

            apiRes.on('end', () => {
                res.writeHead(apiRes.statusCode, { 'Content-Type': 'application/json' });
                res.end(data);
            });
        }).on('error', (err) => {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Error fetching data from PokeAPI', details: err.message }));
        });

    // Ngambil data dari Array Local
    } else if (url.startsWith('/pokemon') && method === 'GET') {
        const index = url.split('/')[2];

        if (index !== undefined) {
            const pokemon = pokemons[parseInt(index)];
            if (pokemon) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(pokemon));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Pokemon not found' }));
            }
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(pokemons));
        }

    // Tambah data ke array local
    } else if (url === '/pokemon' && method === 'POST') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            const pokemon = JSON.parse(body);
            pokemons.push(pokemon);

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(pokemon));
        });

    // Ubah data ke array local
    } else if (url.startsWith('/pokemon') && method === 'PUT') {
        const index = url.split('/')[2];

        if (index !== undefined) {
            let body = '';

            req.on('data', (chunk) => {
                body += chunk;
            });

            req.on('end', () => {
                const updatedData = JSON.parse(body);

                if (pokemons[parseInt(index)]) {
                    pokemons[parseInt(index)] = updatedData;

                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(pokemons[parseInt(index)]));
                } else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Pokemon not found' }));
                }
            });
        }

    // Hapus data di array local
    } else if (url.startsWith('/pokemon') && method === 'DELETE') {
        const index = url.split('/')[2];

        if (index !== undefined) {
            if (pokemons[parseInt(index)]) {
                const deletedPokemon = pokemons.splice(parseInt(index), 1);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(deletedPokemon[0]));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Pokemon not found' }));
            }
        }

    // Response untuk HEAD, PATCH, OPTIONS
    } else if (['HEAD', 'PATCH', 'OPTIONS'].includes(method)) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: `This is a ${method} operation` }));

    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
};

const server = http.createServer(requestListener);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
