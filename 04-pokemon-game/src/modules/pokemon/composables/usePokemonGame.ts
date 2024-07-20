import { pokemonApi } from '@api/pokemonApi';
import { computed, onMounted, ref, type ComputedRef, type Ref } from 'vue';
import { GameStatus, type Pokemon, type PokemonListResponse, type Result } from '../interfaces';
import confetti from 'canvas-confetti';

export const usePokemonGame = () => {
  const gameStatus: Ref<GameStatus> = ref<GameStatus>(GameStatus.Playing);
  const pokemons: Ref<Pokemon[]> = ref<Pokemon[]>([]);
  const pokemonOptions: Ref<Pokemon[]> = ref<Pokemon[]>([]);

  const isLoading: ComputedRef<boolean> = computed(() => pokemons.value.length === 0);
  const randomPokemon: ComputedRef<Pokemon> = computed(() => {
    const randomIndex: number = Math.floor(Math.random() * pokemonOptions.value.length);
    return pokemonOptions.value[randomIndex];
  });

  const getPokemons = async (): Promise<Pokemon[]> => {
    const response = await pokemonApi.get<PokemonListResponse>('/pokemon?limit=151');
    const pokemonArray: Pokemon[] = response.data.results.map((pokemon: Result) => {
      const urlParts = pokemon.url.split('/');
      const id: number = Number(urlParts.at(-2)) ?? 0;
      return {
        name: pokemon.name,
        id,
      };
    });

    return pokemonArray.sort(() => Math.random() - 0.5);
  };

  const getNextRound = (howMany: number = 4): void => {
    gameStatus.value = GameStatus.Playing;
    pokemonOptions.value = pokemons.value.slice(0, howMany);
    pokemons.value = pokemons.value.slice(howMany);
  };

  const checkAnswer = (id: number): void => {
    const hasWon: boolean = randomPokemon.value.id === id;
    if (hasWon) {
      confetti({
        particleCount: 300,
        spread: 150,
        origin: { y: 0.6 },
      });
    }
    gameStatus.value = hasWon ? GameStatus.Won : GameStatus.Lost;
  };

  onMounted(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    pokemons.value = await getPokemons();
    getNextRound();
  });

  return {
    // Properties
    gameStatus,
    isLoading,
    pokemonOptions,
    getNextRound,

    // Methods
    randomPokemon,
    checkAnswer,
  };
};
