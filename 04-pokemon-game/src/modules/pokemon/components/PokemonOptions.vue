<template>
  <section class="mt-5 flex flex-col">
    <button
      v-for="{ name, id } in options"
      :disabled="blockSelection"
      :key="id"
      @click="$emit('selectedOption', id)"
      :class="[
        'capitalize disabled:shadow-none disabled:bg-gray-100',
        {
          correct: id === correctOption && blockSelection,
          incorrect: id !== correctOption && blockSelection,
        },
      ]"
    >
      {{ name }}
    </button>
  </section>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { Pokemon } from '../interfaces';
interface Props {
  options: Pokemon[];
  correctOption: number;
  blockSelection: boolean;
}
withDefaults(defineProps<Props>(), {
  blockSelection: false,
});
defineEmits<{
  selectedOption: [id: number];
}>();
</script>

<style scoped>
button {
  @apply bg-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100;
}

.correct {
  @apply bg-blue-500 text-white;
}

.incorrect {
  @apply bg-red-100 opacity-70;
}
</style>
