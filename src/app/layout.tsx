import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Nunito } from 'next/font/google';
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

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['600', '700', '800', '900'],
  display: 'swap',
});

const baseUrl = 'https://shanmugam-portfolio.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Shanmugam R | Full-Stack Developer — React.js, Next.js & Node.js | Chennai',
    template: '%s | Shanmugam R',
  },
  description:
    'Shanmugam R — Full-Stack Developer with 2.5+ years of production experience in React.js, Next.js, TypeScript, Node.js, Express & MongoDB. Built government-scale job portals for the Government of Telangana (DEET), SaaS products (Workruit), and a solo full-stack platform with JWT/RBAC and AES-256 encrypted APIs. Open to full-time roles in Chennai, Bangalore or Hyderabad — on-site, hybrid, or remote. Immediate joiner.',
  keywords: [
    'Shanmugam R',
    'Shanmugam R portfolio',
    'Shanmugam full stack developer',
    'Shanmugam React developer Chennai',
    'Full Stack Developer Chennai',
    'Frontend Developer Chennai',
    'React.js Developer Chennai',
    'Next.js Developer India',
    'Node.js Developer Chennai',
    'Express.js Developer India',
    'MongoDB Developer Chennai',
    'JavaScript Developer Chennai',
    'TypeScript Developer India',
    'Web Developer Chennai Tamil Nadu',
    'MERN stack developer Chennai',
    'React.js developer',
    'Next.js developer',
    'TypeScript developer',
    'Tailwind CSS developer',
    'DEET Telangana developer',
    'Government of Telangana job portal developer',
    'Workruit developer',
    'hire full stack developer Chennai',
    'available full stack developer India',
    'full stack developer Bangalore',
    'full stack developer Hyderabad',
    'frontend developer Bangalore',
    'frontend developer Hyderabad',
    'React developer Bangalore',
    'React developer Hyderabad',
    'remote full stack developer India',
    'immediate joiner full stack developer',
    'portfolio website developer',
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
    siteName: 'Shanmugam R — Full-Stack Developer Portfolio',
    title: 'Shanmugam R | Full-Stack Developer — React.js, Next.js & Node.js | Chennai',
    description:
      'Full-Stack Developer with 2.5+ years shipping production apps — Government of Telangana DEET job portal, Workruit SaaS, and a solo Next.js + Express platform. React, Next.js, TypeScript, Node.js, MongoDB. Open to Chennai, Bangalore or Hyderabad. Immediate joiner.',
    images: [
      {
        url: `${baseUrl}/images/profile.png`,
        width: 1200,
        height: 630,
        alt: 'Shanmugam R — Full-Stack Developer specialising in React.js, Next.js and Node.js, Chennai India',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shanmugam R | Full-Stack Developer — React.js, Next.js & Node.js',
    description:
      'Full-Stack Developer with 2.5+ years in React.js, Next.js & Node.js. Built govt-scale DEET portal, Workruit SaaS & a solo full-stack platform. Chennai, India. Immediate joiner.',
    images: [`${baseUrl}/images/profile.png`],
    creator: '@shanmugamrskfamily',
  },
  alternates: { canonical: baseUrl },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} ${nunito.variable}`}
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
