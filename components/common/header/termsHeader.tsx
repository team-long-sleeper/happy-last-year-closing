interface TermsHeaderProps {
  title: string;
  subtitle: string;
}

export default function TermsHeader({ title, subtitle }: TermsHeaderProps) {
  return (
    <header className="sticky top-0 bg-surface border-b border-gray/30 px-5 py-4 z-10 text-center">
      <h1 className="text-body-xl font-semibold text-text-default">{title}</h1>
      <p className="text-body-m text-text-default/50 mt-0.5">{subtitle}</p>
    </header>
  );
}
