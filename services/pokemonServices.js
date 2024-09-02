const https = require('https');

let pokemons = [
    { name: "Bulbasaur", type: "Grass/Poison" }
];

const fetchPokemonFromPokeAPI = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (apiRes) => {
            let data = '';
            apiRes.on('data', (chunk) => {
                data += chunk;
            });
            apiRes.on('end', () => {
                if (apiRes.statusCode === 200) {
                    resolve(data);
                } else {
                    reject(new Error(`Failed to fetch: ${apiRes.statusCode}`));
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
};

const getAllPokemons = () => {
    return pokemons;
};

const getPokemonByIndex = (index) => {
    return pokemons[parseInt(index)];
};

const addPokemon = (pokemon) => {
    pokemons.push(pokemon);
    return pokemon;
};

const updatePokemon = (index, updatedData) => {
    if (pokemons[parseInt(index)]) {
        pokemons[parseInt(index)] = updatedData;
        return pokemons[parseInt(index)];
    }
    return null;
};

const deletePokemon = (index) => {
    if (pokemons[parseInt(index)]) {
        return pokemons.splice(parseInt(index), 1)[0];
    }
    return null;
};

module.exports = {
    fetchPokemonFromPokeAPI,
    getAllPokemons,
    getPokemonByIndex,
    addPokemon,
    updatePokemon,
    deletePokemon
};
