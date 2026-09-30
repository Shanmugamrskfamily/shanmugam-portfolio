import type { Metadata, Viewport } from 'next';
import { Archivo, IBM_Plex_Mono, Onest } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import JsonLd from '@/components/JsonLd';
import { person, site } from '@/data/portfolio';
import './globals.css';

// Display: Archivo with its width axis, for engineering-drawing lettering
const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
});
// Body: Onest
const onest = Onest({ subsets: ['latin'], variable: '--font-onest', display: 'swap' });
// Labels, data and code: IBM Plex Mono
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${person.name}` },
  description: site.description,
  keywords: [
    'Shanmugam R',
    'full stack developer Chennai',
    'frontend developer Chennai',
    'React developer Chennai',
    'Next.js developer India',
    'Node.js developer Chennai',
    'MERN stack developer',
    'full stack developer Bangalore',
    'full stack developer Hyderabad',
    'React developer Bangalore',
    'React developer Hyderabad',
    'remote full stack developer India',
    'immediate joiner React developer',
    'technical SEO developer',
    'Vercel deployment',
    'DEET Telangana job portal',
    'Workruit',
  ],
  authors: [{ name: person.name, url: site.url }],
  creator: person.name,
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'profile',
    locale: 'en_IN',
    url: site.url,
    siteName: `${person.name} · Portfolio`,
    title: site.title,
    description: site.description,
    images: [
      {
        url: person.photo.src,
        width: person.photo.width,
        height: person.photo.height,
        alt: person.name,
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: site.title,
    description: site.description,
    images: [person.photo.src],
  },
  icons: { icon: '/favicon.ico' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#eef2f6' },
    { media: '(prefers-color-scheme: dark)', color: '#0b2447' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={`${archivo.variable} ${onest.variable} ${plexMono.variable}`}
    >
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <JsonLd />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
