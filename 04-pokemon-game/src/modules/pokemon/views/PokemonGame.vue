<template>
  <section
    v-if="isLoading || randomPokemon.id === null"
    class="flex flex-col justify-center items-center w-screen h-screen"
  >
    <h1 class="text-3xl">Espere por favor...</h1>
    <h3 class="animate-pulse">Cargando Pokemons</h3>
  </section>
  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="m-5">Quien es este Pokemon?</h1>
    <div class="h-20">
      <button
        v-if="!isPlaying"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="getNextRound(4)"
      >
        Jugar de nuevo?
      </button>
    </div>
    <!--Pokemon Picture-->
    <PokemonPicture :pokemonId="randomPokemon.id" :showPokemon="!isPlaying" />
    <!--Pokemon Options-->
    <PokemonOptions
      :options="options"
      :correctOption="randomPokemon.id"
      :blockSelection="!isPlaying"
      @selectedOption="onSelectOption"
    />
  </section>
</template>

<script setup lang="ts">
import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue';
import PokemonOptions from '../components/PokemonOptions.vue';
import { usePokemonGame } from '../composables';
import { GameStatus } from '../interfaces';
import { computed } from 'vue';
const {
  randomPokemon,
  gameStatus,
  isLoading,
  pokemonOptions: options,
  checkAnswer,
  getNextRound,
} = usePokemonGame();

const isPlaying = computed(() => gameStatus.value === GameStatus.Playing);

const onSelectOption = (id: number): void => {
  checkAnswer(id);
};
</script>
