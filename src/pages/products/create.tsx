import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Product, Category, Tag } from '@prisma/client';

import { LoadingButton } from '@/components/ui/loading-button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MultiSelectorComponent } from '@/components/ui/multi-select';

import { PageTitle } from '@/components/PageTitle';
import { Title } from '@/components/Title';

import ProductService from '@/services/ProductService';
import CategoryService from '@/services/CategoryService';
import TagService from '@/services/TagService';
import { useAsync } from '@/hooks/useAsync';
import { APP_ROUTES } from '@/constants/routes';
import { ProductType } from '@/types/product';

import { createProductSchema } from './form';

const CreateProduct = () => {
  const { data, error, loading, execute } = useAsync<Product, ProductType>(ProductService.createProduct);

  const { data: dataCategories, loading: loadingCategories, execute: executeCategories } = useAsync<Category[]>(CategoryService.getCategories);
  const { data: dataTags, loading: loadingTags, execute: executeTags } = useAsync<Tag[]>(TagService.getTags);

  const [categoryValue, setCategoryValue] = useState<string[]>([]);
  const [tagValue, setTagValue] = useState<string[]>([]);

  const form = useForm<ProductType>({
    resolver: zodResolver(createProductSchema),
  });

  useEffect(() => {
    executeCategories();
  }, [executeCategories]);

  useEffect(() => {
    executeTags();
  }, [executeTags]);

  const onSubmit = async (values: ProductType) => {
    const { title, description, price } = values;

    await execute({ title, description, price, categories: categoryValue, tags: tagValue });
  };

  useEffect(() => {
    if (data && !error) {
      Router.push(APP_ROUTES.PRODUCTS);
    }
  }, [data, error]);

  return (
    <div>
      <PageTitle>Create product</PageTitle>
      <Title>Create product</Title>

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
              Create
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateProduct;
