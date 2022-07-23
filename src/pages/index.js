import Head from 'next/head'
import { Header, ToDoList, Footer } from "../components"
import ToDoListEntry from '../components/ToDoListEntry'
export default function Home() {
  return (
    <>
      <Head>
        <title>productivist</title>
        <meta name="description" 
          content="productivist: the tool to get things done." />

      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      </Head>
      
      {/* make footer stick to bottom: https://stackoverflow.com/a/63894796 */}
      <div className="h-screen flex flex-col">
        <Header />
        <ToDoList />
        <Footer />
      </div>
      
    </>
  )
}
