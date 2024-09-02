const pokemonService = require('../services/pokemonServices');
const BaseResponse = require('../dto/BaseResponse');

const getPokemonFromPokeAPI = async (req, res) => {
    const id = req.params.id;
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

    if (id) {
        apiUrl += id;
    }

    try {
        const data = await pokemonService.fetchPokemonFromPokeAPI(apiUrl);
        res.status(200).json(JSON.parse(data));
    } catch (err) {
        res.status(500).json(new BaseResponse(false, 'Error fetching data from PokeAPI', { error: err.message }));
    }
};

const getPokemons = (req, res) => {
    const index = req.params.index;
    const pokemons = pokemonService.getAllPokemons();

    if (index !== undefined) {
        const pokemon = pokemonService.getPokemonByIndex(index);
        if (pokemon) {
            res.status(200).json(new BaseResponse(true, 'Pokemon fetched successfully', pokemon));
        } else {
            res.status(404).json(new BaseResponse(false, 'Pokemon not found', []));
        }
    } else {
        res.status(200).json(new BaseResponse(true, 'Pokemons fetched successfully', pokemons));
    }
};

const addPokemon = (req, res) => {
    const pokemon = pokemonService.addPokemon(req.body);
    res.status(201).json(new BaseResponse(true, 'Pokemon added successfully', pokemon));
};

const updatePokemon = (req, res) => {
    const updatedPokemon = pokemonService.updatePokemon(req.params.index, req.body);
    if (updatedPokemon) {
        res.status(200).json(new BaseResponse(true, 'Pokemon updated successfully', updatedPokemon));
    } else {
        res.status(404).json(new BaseResponse(false, 'Pokemon not found', []));
    }
};

const deletePokemon = (req, res) => {
    const deletedPokemon = pokemonService.deletePokemon(req.params.index);
    if (deletedPokemon) {
        res.status(200).json(new BaseResponse(true, 'Pokemon deleted successfully', []));
    } else {
        res.status(404).json(new BaseResponse(false, 'Pokemon not found', []));
    }
};

const handleRequestMethod = (req, res) => {
    res.status(200).json(new BaseResponse(true, `This is a ${req.method} operation`, []));
};

module.exports = {
    getPokemonFromPokeAPI,
    getPokemons,
    addPokemon,
    updatePokemon,
    deletePokemon,
    handleRequestMethod
};
