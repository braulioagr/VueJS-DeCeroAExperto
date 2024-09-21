<template>
  <div class="bg-white px-5 py-2 rounded">
    <h1 class="text-3xl font-bold text-gray-800">Products</h1>
    <div class="py-8 w-full">
      <div class="shadow overflow-hidden rounded border-b border-gray-200">
        <table class="min-w-full bg-white">
          <thead class="bg-gray-800 text-white">
            <tr>
              <th class="w-10 product-th product-td">Imagen</th>
              <th class="felx-1 product-th product-td">titulo</th>
              <th class="w-28 product-th product-td">Precio</th>
              <th class="w-60 product-th product-td">Tallas</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr
              v-for="(product, index) in products"
              :key="product.id"
              :class="{ 'bg-gray-100': index % 2 === 0 }"
            >
              <td class="product-td">
                <img :src="product.images[0]" :alt="product.title" class="h-10 w-10 object-cover" />
              </td>
              <td class="product-td">
                <RouterLink
                  :to="`/admin/products/${product.id}`"
                  class="hover:text-blue-500 hover:underline capitalize"
                >
                  {{ product.title }}
                </RouterLink>
              </td>
              <td class="product-td">
                <span class="bg-blue-200 text-blue-600 py-1 px-2 rounded-full text-xs"
                  >${{ product.price }}</span
                >
              </td>
              <td class="product-td">
                {{ product.sizes.join(', ') }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <ButtonPagination :page="page" :has-more-data="!!products && products.length < 10" />
</template>
<script setup lang="ts">
import { usePagination } from '@/modules/common/composables/usePgination';
import { getProductsAction } from '@/modules/products/actions';
import ButtonPagination from '@common/components/ButtonPagination.vue';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { watchEffect } from 'vue';

const queryClient = useQueryClient();
const { page } = usePagination();

const { data: products } = useQuery({
  queryKey: ['products', { page: page }],
  queryFn: () => getProductsAction(page.value),
});

watchEffect(() => {
  queryClient.prefetchQuery({
    queryKey: ['products', { page: page.value + 1 }],
    queryFn: () => getProductsAction(page.value + 1),
  });
});
</script>

<style lang="css" scoped>
.product-td {
  @apply text-left py-3 px-4;
}
.product-th {
  @apply uppercase font-semibold text-sm;
}
</style>
