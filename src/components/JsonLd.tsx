import { personal, social, experiences, projects, certifications } from '@/data/portfolio';

const BASE_URL = 'https://shanmugam-portfolio.vercel.app';

export default function JsonLd() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${BASE_URL}/#person`,
    name: personal.name,
    givenName: 'Shanmugam',
    familyName: 'R',
    jobTitle: 'Frontend Developer',
    description:
      'Frontend Developer with 2+ years of production experience building secure, scalable web applications using React.js, Next.js, and TypeScript. Project owner for Government of Telangana DEET job portal. Based in Chennai, India.',
    url: BASE_URL,
    email: personal.email,
    telephone: personal.phone,
    image: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/images/profile.png`,
      width: 800,
      height: 800,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chennai',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'IN',
      postalCode: '600000',
    },
    nationality: {
      '@type': 'Country',
      name: 'India',
    },
    sameAs: [social.linkedin, social.github, `mailto:${personal.email}`],
    knowsAbout: [
      'React.js',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'Frontend Development',
      'Web Development',
      'UI Development',
      'REST API Integration',
      'Redux',
      'Web Performance Optimization',
      'SEO',
      'Web Security',
      'XSS Prevention',
      'Content Security Policy',
    ],
    hasCredential: certifications.map((cert) => ({
      '@type': 'EducationalOccupationalCredential',
      name: cert.name,
      credentialCategory: 'Certificate',
      recognizedBy: {
        '@type': 'Organization',
        name: cert.issuer,
      },
      url: cert.credential_url,
      dateCreated: cert.year,
    })),
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Loganatha Narayanasamy Government College, Ponneri',
      member: {
        '@type': 'OrganizationRole',
        startDate: '2013',
        endDate: '2016',
      },
    },
    worksFor: {
      '@type': 'Organization',
      name: experiences[0].company,
    },
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Frontend Developer',
      occupationLocation: {
        '@type': 'City',
        name: 'Chennai',
      },
      skills: 'React.js, Next.js, TypeScript, Tailwind CSS, Redux',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: 'Shanmugam R — Frontend Developer Portfolio',
    description:
      'Portfolio of Shanmugam R, a Frontend Developer specialising in React.js and Next.js based in Chennai, India.',
    author: { '@id': `${BASE_URL}/#person` },
    inLanguage: 'en-IN',
    copyrightYear: new Date().getFullYear(),
    creator: { '@id': `${BASE_URL}/#person` },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'About', item: `${BASE_URL}/#about` },
      { '@type': 'ListItem', position: 3, name: 'Projects', item: `${BASE_URL}/#projects` },
      { '@type': 'ListItem', position: 4, name: 'Contact', item: `${BASE_URL}/#contact` },
    ],
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Featured Projects by Shanmugam R',
    description: 'Production web applications developed by Shanmugam R',
    itemListElement: projects
      .filter((p) => p.live_url)
      .map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'SoftwareApplication',
          name: p.name,
          description: p.description,
          url: p.live_url,
          applicationCategory: 'WebApplication',
          operatingSystem: 'Web Browser',
          author: { '@id': `${BASE_URL}/#person` },
          programmingLanguage: p.tech.slice(0, 4).join(', '),
        },
      })),
  };

  const schemas = [personSchema, websiteSchema, breadcrumbSchema, itemListSchema];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
