<template>
  <!-- Open the modal using ID.showModal() method -->
  <dialog class="modal" :open="open">
    <div class="modal-box">
      <div class="border-b border-blue-500">
        <!-- Header -->
        <slot name="header" />
      </div>

      <div class="my-5">
        <!-- Body -->
        <slot name="body" />
      </div>

      <div class="border-t border-blue-500 pt-2">
        <!-- Footer Actions -->
        <slot name="actions" />
      </div>
    </div>
  </dialog>
  <div
    v-if="open"
    class="modal-backdrop fixed top-0 left-0 z-10 bg-black opacity-50 w-screen h-screen"
  ></div>
</template>

<script lang="ts" setup>
interface Props {
  open?: boolean;
}
withDefaults(defineProps<Props>(), {
  open: false,
});
</script>
