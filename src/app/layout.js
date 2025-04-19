import "./globals.css"
export const metadata = {
  title: 'Humanity Foundation',
  description: 'Login page for Humanity Foundation',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
