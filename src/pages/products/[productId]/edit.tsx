import React, { useState, useEffect, useMemo } from 'react';
import Router, { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { Product, Category, Tag } from '@prisma/client';

import { LoadingButton } from '@/components/ui/loading-button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MultiSelectorComponent } from '@/components/ui/multi-select';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

import { PageTitle } from '@/components/PageTitle';
import { Title } from '@/components/Title';

import ProductService from '@/services/ProductService';
import CategoryService from '@/services/CategoryService';
import TagService from '@/services/TagService';
import { useAsync } from '@/hooks/useAsync';
import { APP_ROUTES } from '@/constants/routes';
import { ProductType, EditProductType } from '@/types/product';
import { QUERY_KEYS } from '@/constants/products';

import { editProductSchema } from '../form';

const EditProduct = () => {
  const router = useRouter();

  const productId = router.query.productId as string;

  const { isLoading, data: productData } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCT, productId],
    queryFn: async () => {
      if (!productId) return null;
      return await ProductService.getOneProduct(Number(productId));
    },
  });

  const { data, error, loading, execute } = useAsync<Product, EditProductType>(ProductService.editProduct);

  const { data: dataCategories, loading: loadingCategories, execute: executeCategories } = useAsync<Category[]>(CategoryService.getCategories);
  const { data: dataTags, loading: loadingTags, execute: executeTags } = useAsync<Tag[]>(TagService.getTags);

  const [categoryValue, setCategoryValue] = useState<string[]>([]);
  const [tagValue, setTagValue] = useState<string[]>([]);

  const form = useForm<ProductType>({
    resolver: zodResolver(editProductSchema),
  });

  useEffect(() => {
    executeCategories();
  }, [executeCategories]);

  useEffect(() => {
    executeTags();
  }, [executeTags]);

  const onSubmit = async (values: ProductType) => {
    const { title, description, price } = values;

    await execute({ id: Number(productId), body: { title, description, price, categories: categoryValue, tags: tagValue } });
  };

  useEffect(() => {
    if (!productData) return;

    form.reset({
      title: productData.title,
      description: productData.description,
      price: String(productData.price),
    });
  }, [productData, form]);

  useEffect(() => {
    if (!productData) return;

    if (productData.categories) {
      setCategoryValue(productData.categories.map(({ category }) => category.value));
    }

    if (productData.tags) {
      setTagValue(productData.tags.map(({ tag }) => tag.value));
    }
  }, [productData]);

  useEffect(() => {
    if (data && !error) {
      Router.push(APP_ROUTES.PRODUCTS);
    }
  }, [data, error]);

  if (isLoading)
    return (
      <div className="mt-10 flex items-center justify-center">
        <LoadingSpinner size={40} />
      </div>
    );

  return (
    <div>
      <PageTitle>Edit product</PageTitle>
      <Title>Edit product</Title>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Enter description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price, $</FormLabel>
                <FormControl>
                  <Input placeholder="Enter price" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {!loadingCategories && dataCategories && (
            <MultiSelectorComponent value={categoryValue} onSetValue={setCategoryValue} options={dataCategories} placeholder="Select categories" />
          )}
          {!loadingTags && dataTags && <MultiSelectorComponent value={tagValue} onSetValue={setTagValue} options={dataTags} placeholder="Select tags" />}

          <div className="flex items-center justify-end gap-x-3">
            <Button variant="outline" type="button" onClick={() => Router.push(APP_ROUTES.PRODUCTS)}>
              Cancel
            </Button>
            <LoadingButton type="submit" loading={loading}>
              Edit
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditProduct;
