import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import JsonLd from '@/components/JsonLd';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const baseUrl = 'https://shanmugam-portfolio.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Shanmugam R | Frontend Developer — React.js & Next.js | Chennai',
    template: '%s | Shanmugam R',
  },
  description:
    'Shanmugam R — Frontend Developer with 2+ years of production experience in React.js, Next.js & TypeScript. Built government-scale job portals for the Government of Telangana (DEET) and SaaS products (Workruit). Immediate joiner. Based in Chennai, India.',
  keywords: [
    // Name variations
    'Shanmugam R',
    'Shanmugam R portfolio',
    'Shanmugam frontend developer',
    'Shanmugam React developer Chennai',
    // Role keywords
    'Frontend Developer Chennai',
    'React.js Developer Chennai',
    'Next.js Developer India',
    'JavaScript Developer Chennai',
    'TypeScript Developer India',
    'Web Developer Chennai Tamil Nadu',
    // Skills
    'React.js developer',
    'Next.js developer',
    'TypeScript developer',
    'Tailwind CSS developer',
    // Projects
    'DEET Telangana developer',
    'Government of Telangana job portal developer',
    'Workruit developer',
    // Hiring signals
    'hire frontend developer Chennai',
    'available frontend developer India',
    'junior frontend developer Chennai',
    'mid level React developer Chennai',
    // General
    'portfolio website developer',
    'MERN stack developer Chennai',
  ],
  authors: [{ name: 'Shanmugam R', url: baseUrl }],
  creator: 'Shanmugam R',
  publisher: 'Shanmugam R',
  category: 'technology',
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
    type: 'profile',
    locale: 'en_IN',
    url: baseUrl,
    siteName: 'Shanmugam R — Frontend Developer Portfolio',
    title: 'Shanmugam R | Frontend Developer — React.js & Next.js | Chennai',
    description:
      'Frontend Developer with 2+ years shipping production apps — Government of Telangana DEET job portal & Workruit SaaS. React.js, Next.js, TypeScript. Based in Chennai. Immediate joiner.',
    images: [
      {
        url: `${baseUrl}/images/profile.png`,
        width: 1200,
        height: 630,
        alt: 'Shanmugam R — Frontend Developer specialising in React.js and Next.js, Chennai India',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shanmugam R | Frontend Developer — React.js & Next.js',
    description:
      'Frontend Developer with 2+ years in React.js & Next.js. Built govt-scale DEET portal & Workruit SaaS. Chennai, India. Immediate joiner.',
    images: [`${baseUrl}/images/profile.png`],
    creator: '@shanmugamrskfamily',
  },
  alternates: {
    canonical: baseUrl,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  verification: {
    // Add Google Search Console verification token here after verifying:
    // google: 'your-google-verification-token',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
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
