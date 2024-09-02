const router = require("express").Router();
const pokemonController = require('../controllers/pokemonControllers');

router.get('/pokeapi/:id?', pokemonController.getPokemonFromPokeAPI);
router.get('/:index?', pokemonController.getPokemons);
router.post('/', pokemonController.addPokemon);
router.put('/:index', pokemonController.updatePokemon);
router.delete('/:index', pokemonController.deletePokemon);
router.head('/', pokemonController.handleRequestMethod);
router.patch('/', pokemonController.handleRequestMethod);
router.options('/', pokemonController.handleRequestMethod);

module.exports = router;
