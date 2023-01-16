import Cards from '@/components/Cards'
import Searchbar from '@/components/Searchbar'
import { Article } from '@/typings'
import request_news from '@/utils/requests'
import Head from 'next/head';


interface Props {
  news: Article[];
}

export default function Home({ news }: Props) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='relative flex flex-col max-w-[1440px] mx-auto'>
        <Searchbar />
        <Cards news={news} />
      </div>
    </>
  );
}


export const getServerSideProps = async () => {
  const news = await fetch(request_news).then((res) => res.json());
  return {props:{news: news.articles}};
}