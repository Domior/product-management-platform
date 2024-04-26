import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { PageTitle } from '@/components/PageTitle';
import { Title } from '@/components/Title';

const Products = () => {
  const router = useRouter();
  return (
    <>
      <PageTitle>Products</PageTitle>
      <div className="flex items-center justify-between">
        <Title>Products</Title>
        <Button onClick={() => router.push('/products/create')}>Create product</Button>
      </div>
    </>
  );
};

export default Products;
