import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import JsonLd from '@/components/JsonLd';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const baseUrl = 'https://shanmugam-portfolio.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Shanmugam R | Frontend Developer — React.js & Next.js',
    template: '%s | Shanmugam R',
  },
  description:
    'Frontend Developer with 2+ years building secure, scalable production web apps using React.js and Next.js. Project owner for Government of Telangana DEET portal. Based in Chennai, India.',
  keywords: [
    'Shanmugam R',
    'Frontend Developer',
    'React.js Developer',
    'Next.js Developer',
    'Web Developer Chennai',
    'JavaScript Developer India',
    'TypeScript Developer',
    'DEET Telangana',
    'Portfolio',
  ],
  authors: [{ name: 'Shanmugam R', url: baseUrl }],
  creator: 'Shanmugam R',
  publisher: 'Shanmugam R',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: baseUrl,
    siteName: 'Shanmugam R — Portfolio',
    title: 'Shanmugam R | Frontend Developer — React.js & Next.js',
    description:
      'Frontend Developer with 2+ years building secure, scalable production web apps. Project owner for Government of Telangana DEET portal.',
    images: [
      {
        url: '/images/profile.png',
        width: 1200,
        height: 630,
        alt: 'Shanmugam R — Frontend Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shanmugam R | Frontend Developer',
    description: 'Frontend Developer specialising in React.js & Next.js — Chennai, India',
    images: ['/images/profile.png'],
  },
  alternates: {
    canonical: baseUrl,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <JsonLd />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
