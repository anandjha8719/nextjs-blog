// app/layout.jsx
import './globals.css';

export const metadata = {
  title: 'Next.js Blog',
  description: 'Modern blog platform built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <main className="container mx-auto px-4 md:px-24 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}