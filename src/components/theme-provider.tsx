'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

export const ThemeProviderComponent = ({ children, ...providerProps }: ThemeProviderProps) => (
  <NextThemesProvider {...providerProps}>{children}</NextThemesProvider>
);
