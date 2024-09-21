import { tesloApi, ApiEndpoints } from '@api/index';
import type { Product } from '../interfaces/product.interface';
import { getProductImageAction } from './get-product-image.action';

export const getProductsAction = async (
  page: number = 1,
  limit: number = 10,
): Promise<Product[]> => {
  try {
    const { data } = await tesloApi.get<Product[]>(
      `${ApiEndpoints.Products}?limit=${limit}&offset=${page * limit}`,
    );

    return data.map((product) => ({
      ...product,
      images: product.images.map(getProductImageAction),
    }));
  } catch (error) {
    throw new Error('Error getting products');
  }
};
