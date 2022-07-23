import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="h-screen bg-light-pink p-0 m-0">
      <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Courgette&family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <body className="font-sans h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}