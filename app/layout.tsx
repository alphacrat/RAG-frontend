import './globals.css';

export const metadata = {
  title: 'RAG_LLM',
  description: 'Context and space management application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}