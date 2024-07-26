<template>
  <div class="overflow-x-auto w-full">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Proyecto</th>
          <th>Tareas</th>
          <th>Avance</th>
        </tr>
      </thead>
      <tbody>
        <!-- row 2 -->
        <tr class="hover">
          <th>2</th>
          <td>Hart Hagerty</td>
          <td>Desktop Support Technician</td>
          <td>Purple</td>
        </tr>
      </tbody>
    </table>
    <InputModal
      :open="modalOpen"
      @close="modalOpen = false"
      @value="onNewValue($event)"
      placeholder="Ingrese nombre del proyecto"
      title="Nuevo Proyecto"
      subtitle="Crea un nuevo proyecto"
    />
    <CustomModal :open="customModalOpen">
      <template #header>
        <h1 class="text-3xl">Titulo del modal</h1>
      </template>
      <template #body>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim magni suscipit aut repellat
          voluptatibus a similique incidunt tenetur, excepturi voluptate sequi, distinctio qui
          dolorum quis expedita, nostrum ex rem ipsam!
        </p>
      </template>
      <template #actions>
        <div class="flex justofy-end">
          <button @click="customModalOpen = false" class="btn mr-4">Close</button>
          <button @click="customModalOpen = false" class="btn btn-primary">Aceptar</button>
        </div>
      </template>
    </CustomModal>

    <FabButton @click="customModalOpen = true" position="bottom-left">
      <ModalIcon />
    </FabButton>

    <FabButton @click="modalOpen = true">
      <AddCircle />
    </FabButton>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

import AddCircle from '@common/icons/AddCircle.vue';
import CustomModal from '@/modules/common/components/CustomModal.vue';
import FabButton from '@common/components/FabButton.vue';
import InputModal from '@common/components/InputModal.vue';
import ModalIcon from '@/modules/common/icons/ModalIcon.vue';

const modalOpen = ref(false);
const customModalOpen = ref(false);

const onNewValue = (projectName: string) => {
  console.log({ projectName });
};
</script>
