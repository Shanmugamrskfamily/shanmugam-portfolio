import { certifications, caseStudies, openToWork, person, site, skills } from '@/data/portfolio';

/** Structured data for search engines and AI assistants. No current employer is claimed. */
export default function JsonLd() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${site.url}/#person`,
    name: person.name,
    givenName: 'Shanmugam',
    familyName: 'R',
    jobTitle: person.role,
    description: site.description,
    url: site.url,
    email: `mailto:${person.email}`,
    telephone: person.phone,
    image: `${site.url}${person.photo.src}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chennai',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'IN',
    },
    sameAs: [person.linkedin, person.github, person.hackerrank],
    knowsAbout: skills.flatMap((g) => g.skills).slice(0, 40),
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Loganatha Narayanasamy Government College, Ponneri (University of Madras)',
    },
    hasCredential: certifications
      .filter((c) => c.href)
      .map((c) => ({
        '@type': 'EducationalOccupationalCredential',
        name: c.name,
        credentialCategory: 'Certificate',
        url: c.href,
      })),
    hasOccupation: {
      '@type': 'Occupation',
      name: person.role,
      occupationLocation: openToWork.locations.map((name) => ({ '@type': 'City', name })),
      skills:
        'React.js, Next.js, TypeScript, Node.js, Express.js, MongoDB, REST API design, JWT/RBAC, technical SEO, Vercel',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url,
    name: `${person.name} · Portfolio`,
    description: site.description,
    author: { '@id': `${site.url}/#person` },
    inLanguage: 'en-IN',
  };

  const workSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Work by ${person.name}`,
    itemListElement: caseStudies
      .filter((c) => c.links[0]?.href.startsWith('http'))
      .map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'CreativeWork',
          name: c.title,
          description: c.built[0],
          url: c.links[0].href,
          creator: { '@id': `${site.url}/#person` },
        },
      })),
  };

  return (
    <>
      {[personSchema, websiteSchema, workSchema].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
