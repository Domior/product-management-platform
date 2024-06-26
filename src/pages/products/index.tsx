import React, { useState, useEffect, useCallback } from 'react';
import Router from 'next/router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Product, Category, Tag, UserPermission } from '@prisma/client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { LoadingButton } from '@/components/ui/loading-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { PageTitle } from '@/components/PageTitle';
import { Title } from '@/components/Title';
import { MultiSelectorComponent } from '@/components/ui/multi-select';
import Pagination from '@/components/Pagination';
import CategoryService from '@/services/CategoryService';
import TagService from '@/services/TagService';
import ProductService from '@/services/ProductService';
import UserService from '@/services/UserService';
import { useAsync } from '@/hooks/useAsync';
import { useUser } from '@/hooks/useUser';
import { APP_ROUTES, ADDITIONAL_ROUTES } from '@/constants/routes';
import { useDebounce } from '@/hooks/useDebounce';
import { ITEMS_PER_PAGE, QUERY_KEYS } from '@/constants/products';
import { usePagination } from '@/hooks/usePagination';
import { getQueryErrorStatus } from '@/helpers/getQueryErrorStatus';
import { STATUS_CODES } from '@/constants/statusCodes';
import { PERMISSIONS } from '@/constants/users';
import { checkPermission } from '@/helpers/checkPermission';

const Products = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const [userPermissions, setUserPermissions] = useState<UserPermission[] | null>(null);

  const [searchValue, setSearchValue] = useState('');
  const [categoryValue, setCategoryValue] = useState<string[]>([]);
  const [tagValue, setTagValue] = useState<string[]>([]);
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const { data: dataCategories, loading: loadingCategories, execute: executeCategories } = useAsync<Category[]>(CategoryService.getCategories);
  const { data: dataTags, loading: loadingTags, execute: executeTags } = useAsync<Tag[]>(TagService.getTags);

  const { loading: loadingDelete, execute: executeDelete } = useAsync<Product, number>(ProductService.deleteProduct);

  const { currentPage, paginate, handleNextClick, handlePrevClick } = usePagination();

  const { isLoading, data, error, isError } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS_LIST, debouncedSearchValue, categoryValue, tagValue, currentPage],
    queryFn: async () =>
      await ProductService.getProducts({ search: debouncedSearchValue, categories: categoryValue, tags: tagValue, page: currentPage, limit: ITEMS_PER_PAGE }),
  });

  const handleProductDelete = async (id: number) => {
    await executeDelete(id);
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS_LIST] });
  };

  useEffect(() => {
    executeCategories();
  }, [executeCategories]);

  useEffect(() => {
    executeTags();
  }, [executeTags]);

  useEffect(() => {
    if (!user) return;
    UserService.getUserByEmail({ email: user.email! }).then(res => setUserPermissions(res.permissions));
  }, [user]);

  if (isError && getQueryErrorStatus(error) === STATUS_CODES.FORBIDDEN) {
    Router.replace(ADDITIONAL_ROUTES.ACCESS_DENIED);
  }

  return (
    <>
      <PageTitle>Products</PageTitle>
      <div className="flex items-center justify-between">
        <Title>Products</Title>

        {userPermissions && (
          <Button onClick={() => Router.push(`${APP_ROUTES.PRODUCTS}${ADDITIONAL_ROUTES.CREATE}`)} disabled={!checkPermission(userPermissions, PERMISSIONS.CREATE_PRODUCT)}>
            Create product
          </Button>
        )}
      </div>

      {!isLoading && data ? (
        <>
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
          <div className="mt-5 ">
            {!!data.results.length ? (
              <>
                <div className="flex gap-4">
                  {data.results.map(product => (
                    <Card key={product.id}>
                      <CardContent className="pt-6">
                        <CardTitle>{product.title}</CardTitle>
                        <CardDescription>{product.description}</CardDescription>
                      </CardContent>
                      <CardFooter className="gap-x-2">
                        {userPermissions && (
                          <>
                            <Button
                              className="w-1/2"
                              variant="secondary"
                              onClick={() => Router.push(`${APP_ROUTES.PRODUCTS}/${product.id}${ADDITIONAL_ROUTES.EDIT}`)}
                              disabled={!checkPermission(userPermissions, PERMISSIONS.EDIT_PRODUCT)}
                            >
                              Edit
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button className="w-1/2" variant="destructive" disabled={!checkPermission(userPermissions, PERMISSIONS.DELETE_PRODUCT)}>
                                  Delete
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>Delete product</DialogTitle>
                                  <DialogDescription>Are you sure to delete this product?</DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button type="button" variant="secondary">
                                      Cancel
                                    </Button>
                                  </DialogClose>
                                  <LoadingButton type="submit" variant="destructive" loading={loadingDelete} onClick={() => handleProductDelete(product.id)}>
                                    Delete
                                  </LoadingButton>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                <Pagination
                  className="mt-10"
                  limit={ITEMS_PER_PAGE}
                  total={data.total}
                  currentPage={currentPage}
                  paginate={paginate}
                  handleNextClick={handleNextClick}
                  handlePrevClick={handlePrevClick}
                />
              </>
            ) : (
              <div className="mt-20 w-full flex justify-center">
                <p>No products</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="mt-10 flex items-center justify-center">
          <LoadingSpinner size={40} />
        </div>
      )}
    </>
  );
};

export default Products;
