import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { ThemeProvider } from '@/context/ThemeContext';
import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: 'Alpha Jedidia R. — UX/UI Designer & Software Engineer',
  description:
    'Portfolio of Alpha Jedidia R. — UX/UI Designer and Software Engineer creating user-centered digital solutions.',
  keywords: ['UX Designer', 'UI Designer', 'Software Engineer', 'Portfolio', 'Alpha Jedidia'],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
