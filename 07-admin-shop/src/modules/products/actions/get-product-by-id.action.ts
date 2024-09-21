import { ApiEndpoints, tesloApi } from '@api/index';
import type { Product } from '@products/interfaces';
import { getProductImageAction } from '@products/actions';

export const getProductByIdAction = async (productId: string): Promise<Product> => {
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
