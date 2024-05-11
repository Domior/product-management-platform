import React, { useState, useEffect, useCallback } from 'react';
import Router from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { Product, Category, Tag } from '@prisma/client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PageTitle } from '@/components/PageTitle';
import { Title } from '@/components/Title';
import { MultiSelectorComponent } from '@/components/ui/multi-select';

import CategoryService from '@/services/CategoryService';
import TagService from '@/services/TagService';
import ProductService from '@/services/ProductService';
import { useAsync } from '@/hooks/useAsync';
import { APP_ROUTES, ADDITIONAL_ROUTES } from '@/constants/routes';
import { useDebounce } from '@/hooks/useDebounce';

const Products = () => {
  const [searchValue, setSearchValue] = useState('');
  const [categoryValue, setCategoryValue] = useState<string[]>([]);
  const [tagValue, setTagValue] = useState<string[]>([]);
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const { data: dataCategories, loading: loadingCategories, execute: executeCategories } = useAsync<Category[]>(CategoryService.getCategories);
  const { data: dataTags, loading: loadingTags, execute: executeTags } = useAsync<Tag[]>(TagService.getTags);

  const { isLoading, data } = useQuery({
    queryKey: ['products', debouncedSearchValue, categoryValue, tagValue],
    queryFn: async () => await ProductService.getProducts({ search: debouncedSearchValue, categories: categoryValue, tags: tagValue, page: 1, limit: 10 }),
  });

  useEffect(() => {
    executeCategories();
  }, [executeCategories]);

  useEffect(() => {
    executeTags();
  }, [executeTags]);

  return (
    <>
      <PageTitle>Products</PageTitle>
      <div className="flex items-center justify-between">
        <Title>Products</Title>
        <Button onClick={() => Router.push(`${APP_ROUTES.PRODUCTS}${ADDITIONAL_ROUTES.CREATE}`)}>Create product</Button>
      </div>
      <div className="flex items-center justify-start gap-x-5">
        <Input type="search" placeholder="Search" value={searchValue} onChange={e => setSearchValue(e.target.value)} className="max-w-[300px]" />
        {!loadingCategories && dataCategories && (
          <MultiSelectorComponent
            value={categoryValue}
            onSetValue={setCategoryValue}
            options={dataCategories}
            placeholder="Select categories"
            wrapperClassName="max-w-[200px]"
          />
        )}
        {!loadingTags && dataTags && (
          <MultiSelectorComponent value={tagValue} onSetValue={setTagValue} options={dataTags} placeholder="Select tags" wrapperClassName="max-w-[200px]" />
        )}
      </div>

      {!isLoading && data ? (
        <div className="mt-5 flex gap-4">
          {!!data.results.length ? (
            data.results.map(product => (
              <Card key={product.id}>
                <CardContent className="pt-6">
                  <CardTitle>{product.title}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardContent>
                <CardFooter className="gap-x-2">
                  <Button className="w-1/2" variant="secondary">
                    Edit
                  </Button>
                  <Button className="w-1/2" variant="destructive">
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="mt-20 w-full flex justify-center">
              <p>No products</p>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-10 flex items-center justify-center">
          <LoadingSpinner size={40} />
        </div>
      )}
    </>
  );
};

export default Products;
