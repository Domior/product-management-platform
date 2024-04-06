import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ThemeProviderComponent } from '@/components/theme-provider';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" suppressHydrationWarning>
        <Head>
          <link rel="icon" href="/images/favicon.ico" />
        </Head>
        <body className="min-h-screen bg-background antialiased">
          <ThemeProviderComponent attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Main />
            <NextScript />
          </ThemeProviderComponent>
        </body>
      </Html>
    );
  }
}
