export const QUERY_KEYS = {
  USERS_LIST: 'users',
};

export const PERMISSIONS = {
  VIEW_PRODUCTS: 'view_products',
  CREATE_PRODUCT: 'create_product',
  EDIT_PRODUCT: 'edit_product',
  DELETE_PRODUCT: 'delete_product',
};

export const USER_INITIAL_PERMISSIONS = [PERMISSIONS.VIEW_PRODUCTS, PERMISSIONS.CREATE_PRODUCT, PERMISSIONS.EDIT_PRODUCT];

export const USERS_PER_PAGE = 25;
