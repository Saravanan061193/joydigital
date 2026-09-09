import React from "react";
import HomePageComponent, { HOME_FAQS } from "@/components/sections/HomePageComponent";
import { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageGraphSchema } from "@/lib/seo/schema";

interface PageProps {
  params: Promise<{ country: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  return [
    { country: "us" },
    { country: "uk" },
    { country: "ae" },
    { country: "in" },
    { country: "ca" },
    { country: "au" },
    { country: "es" },
    { country: "de" },
    { country: "fr" },
    { country: "it" },
    { country: "sg" },
    { country: "mx" },
    { country: "br" },
  ];
}

const METADATA_MAP: Record<string, { title: string; description: string }> = {
  us: {
    title: "Next.js Web Development & SEO Agency USA | Joy Digital",
    description: "Scale organic revenue. Joy Digital is a premium digital agency serving US businesses with custom web design, headless Next.js platforms, and results-driven SEO.",
  },
  uk: {
    title: "Professional Web Design & SEO Services UK | Joy Digital",
    description: "Convert search traffic into loyal buyers. Joy Digital constructs high-speed corporate sites and executes organic search engine marketing campaigns across the UK.",
  },
  ae: {
    title: "Web Development & SEO Agency Dubai & UAE | Joy Digital",
    description: "Dominate Google search. Joy Digital builds speed-optimized corporate portals, e-commerce stores, and Google Map packs for businesses in the UAE.",
  },
  in: {
    title: "Top Website Design & SEO Company India | Joy Digital",
    description: "Boost your customer conversions. Joy Digital is India's leading SEO & custom web design agency, delivering search marketing and Map pack ranking systems.",
  },
  ca: {
    title: "Next.js Web Development & SEO Agency Canada | Joy Digital",
    description: "Scale organic revenue. Joy Digital builds high-performance Next.js websites, headless storefronts, and SEO campaigns for Canadian enterprises and startups.",
  },
  au: {
    title: "Custom Web Design & SEO Agency Australia | Joy Digital",
    description: "Empower your business with fast, search-compliant Next.js websites and Google ranking strategies engineered for Australian businesses.",
  },
  es: {
    title: "Agencia de Desarrollo Web Next.js y SEO | Joy Digital España",
    description: "Impulsa tu negocio con Joy Digital. Diseñamos sitios web rápidos en Next.js y estrategias SEO orientadas a resultados para clientes en España y Latinoamérica.",
  },
  de: {
    title: "Webdesign & Next.js Entwicklung Agentur | Joy Digital Deutschland",
    description: "Wachsen Sie online mit Joy Digital. Wir entwickeln erstklassige Next.js Websites und datengesteuerte SEO-Lösungen für Unternehmen in Deutschland.",
  },
  fr: {
    title: "Agence de Création Web Next.js & Référencement SEO | Joy Digital France",
    description: "Développez votre entreprise avec Joy Digital. Nous créons des sites web Next.js ultra-rapides et des solutions SEO sur mesure pour le marché français.",
  },
  it: {
    title: "Sviluppo Web Next.js e Agenzia SEO Italia | Joy Digital",
    description: "Siti web ultra-veloci e posizionamento SEO per aziende in Italia. Aumenta il tuo fatturato con la presenza digitale di Joy Digital.",
  },
  sg: {
    title: "Next.js Web Development & SEO Agency Singapore | Joy Digital",
    description: "Scale organic revenue. Joy Digital builds high-performance Next.js websites and data-driven SEO campaigns for businesses in Singapore.",
  },
  mx: {
    title: "Agencia de Desarrollo Web Next.js y SEO México | Joy Digital",
    description: "Diseño web moderno en Next.js y estrategias de SEO enfocadas en resultados para empresas en México y Latinoamérica.",
  },
  br: {
    title: "Desenvolvimento Web Next.js e Agência de SEO Brasil | Joy Digital",
    description: "Desenvolvimento de sites ultra-rápidos e otimização SEO para empresas no Brasil com a Joy Digital.",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country } = await params;
  const countryLower = country.toLowerCase();
  const data = METADATA_MAP[countryLower] || {
    title: `Website Design & SEO Growth Agency ${countryLower.toUpperCase()} | Joy Digital`,
    description: "Joy Digital is a results-oriented global agency engineering fast Next.js sites and search marketing campaigns.",
  };

  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: `https://joydigital.in/${countryLower}`,
      languages: {
        "x-default": "https://joydigital.in",
        "en-in": "https://joydigital.in",
        "en-us": "https://joydigital.in/us",
        "en-gb": "https://joydigital.in/uk",
        "en-ae": "https://joydigital.in/ae",
        "en-ca": "https://joydigital.in/ca",
        "en-au": "https://joydigital.in/au",
        "es-es": "https://joydigital.in/es",
        "de-de": "https://joydigital.in/de",
        "fr-fr": "https://joydigital.in/fr",
        "it-it": "https://joydigital.in/it",
        "en-sg": "https://joydigital.in/sg",
        "es-mx": "https://joydigital.in/mx",
        "pt-br": "https://joydigital.in/br",
      },
    },
  };
}

export default async function CountryHomePage({ params }: PageProps) {
  const { country } = await params;
  const countryLower = country.toLowerCase();
  const data = METADATA_MAP[countryLower] || {
    title: `Website Design & SEO Growth Agency ${countryLower.toUpperCase()} | Joy Digital`,
    description: "Joy Digital is a results-oriented global agency engineering fast Next.js sites and search marketing campaigns.",
  };

  const countryUrl = `https://joydigital.in/${countryLower}`;
  const graphSchema = buildPageGraphSchema({
    url: countryUrl,
    title: data.title,
    description: data.description,
    includeLocalBusiness: true,
    faqs: HOME_FAQS,
  });

  return (
    <>
      <JsonLd schema={graphSchema} />
      <HomePageComponent country={countryLower} />
    </>
  );
}
