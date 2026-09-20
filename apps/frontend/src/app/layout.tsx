import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Paper2Prototype | Turn Research Papers Into Real-World Prototypes',
  description: 'AI-powered platform converting research paper PDFs into software architectures, database schemas, API specs, ML pipelines, and starter code.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-dark-900 text-gray-100 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
