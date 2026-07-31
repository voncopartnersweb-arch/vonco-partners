type JsonLdProps = {
  id: string;
  type?: 'application/ld+json';
  strategy?: 'afterInteractive';
  dangerouslySetInnerHTML: {
    __html: string;
  };
};

/**
 * Renders structured data directly in the server HTML so search and AI
 * crawlers can read it without executing the Next.js client runtime.
 */
export default function JsonLd({
  id,
  dangerouslySetInnerHTML,
}: JsonLdProps) {
  return (
    <script
      id={id}
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: dangerouslySetInnerHTML.__html.replace(/</g, '\\u003c'),
      }}
    />
  );
}
