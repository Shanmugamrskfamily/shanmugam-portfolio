import { personal, social } from '@/data/portfolio';

export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personal.name,
    jobTitle: `${personal.title} — ${personal.subtitle}`,
    description: personal.tagline,
    email: personal.email,
    telephone: personal.phone,
    url: 'https://shanmugam-portfolio.vercel.app',
    image: 'https://shanmugam-portfolio.vercel.app/images/profile.png',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chennai',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'IN',
    },
    sameAs: [social.linkedin, social.github],
    knowsAbout: [
      'React.js',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Frontend Development',
      'Web Development',
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'University of Madras',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
