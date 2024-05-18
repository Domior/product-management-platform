import { Product } from '@prisma/client';
import { APP_ROUTES, ADDITIONAL_ROUTES } from '@/constants/routes';

import baseInstance from './baseInstance';
import { PaginatedResponse } from '@/types/response';
import { ProductType, GetProductsParamsType } from '@/types/product';

class ProductService {
  async getProducts(params: GetProductsParamsType): Promise<PaginatedResponse<Product>> {
    return await baseInstance.get(APP_ROUTES.PRODUCTS, { params });
  }
  async createProduct(body: ProductType): Promise<Product> {
    return await baseInstance.post(`${APP_ROUTES.PRODUCTS}${ADDITIONAL_ROUTES.CREATE}`, body);
  }
  async editProduct(id: number, body: any): Promise<any> {
    return await baseInstance.put(`${APP_ROUTES.PRODUCTS}/${id}`, body);
  }
  async deleteProduct(id: number): Promise<Product> {
    return await baseInstance.delete(`${APP_ROUTES.PRODUCTS}/${id}`);
  }
}

const productService = new ProductService();
export default productService;
