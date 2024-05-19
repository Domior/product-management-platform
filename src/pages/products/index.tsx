import React, { useEffect } from 'react';
import Router from 'next/router';

import { Button } from '@/components/ui/button';
import { PageTitle } from '@/components/PageTitle';
import { Title } from '@/components/Title';

import ProductService from '@/services/ProductService';
import { useAsync } from '@/hooks/useAsync';
import { APP_ROUTES, ADDITIONAL_ROUTES } from '@/constants/routes';
import { ProductType, ProductReturnType } from '@/types/product';

const Products = () => {
  const { data, error, loading, execute } = useAsync<ProductReturnType[], any>(ProductService.getProducts);

  console.log(data);

  useEffect(() => {
    execute({ search: '', categories: 'psu', tags: 'new,best_seller', page: 1, limit: 10 });
  }, [execute]);

  return (
    <>
      <PageTitle>Products</PageTitle>
      <div className="flex items-center justify-between">
        <Title>Products</Title>
        <Button onClick={() => Router.push(`${APP_ROUTES.PRODUCTS}${ADDITIONAL_ROUTES.CREATE}`)}>Create product</Button>
      </div>
    </>
  );
};

export default Products;
