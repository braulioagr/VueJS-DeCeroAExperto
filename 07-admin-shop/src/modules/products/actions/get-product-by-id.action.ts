import { ApiEndpoints, tesloApi } from '@api/index';
import type { Product } from '@products/interfaces';
import { getProductImageAction } from '@products/actions';

export const getProductByIdAction = async (productId: string): Promise<Product> => {
  if (productId === 'create') {
    return {
      id: '',
      title: '',
      price: 0,
      description: '',
      slug: '',
      stock: 0,
      sizes: [],
      gender: '',
      tags: [],
      images: [],
      user: {} as any,
    };
  }
  try {
    const { data } = await tesloApi.get<Product>(`${ApiEndpoints.Products}/${productId}`);
    return {
      ...data,
      images: data.images.map(getProductImageAction),
    };
  } catch (error) {
    console.log(error);
    throw new Error(`Error getting product by id: ${productId}`);
  }
};
