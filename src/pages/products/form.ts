import { z } from 'zod';

import { titleValidation, descriptionValidation, priceValidation } from '@/constants/forms/validation/product';

export const createProductSchema = z
  .object({
    title: titleValidation,
    description: descriptionValidation,
    price: priceValidation,
  })
  .required();

export const editProductSchema = z
  .object({
    title: titleValidation,
    description: descriptionValidation,
    price: priceValidation,
  })
  .required();
