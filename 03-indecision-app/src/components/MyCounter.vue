<template>
  <section>
    <h2>My Counter</h2>
    <h3>Counter: {{ counter }}</h3>
    <h3>Square: {{ squareCounter }}</h3>
    <div>
      <button class="btn" @click="counter++">+1</button>
      <button class="btn" @click="counter--">-1</button>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useCounter } from '../composables/useCounter';
interface MyCounterProps {
  value?: number;
}
const props = defineProps<MyCounterProps>();
const { counter, squareCounter } = useCounter(props.value);
</script>

<style scoped>
.btn {
  @apply p-5 bg-blue-500 hover:bg-blue-700 rounded mr-2;
}
</style>
