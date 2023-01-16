import { Article } from '@/typings';
import ArticleCard from './ArticleCard';
import CustomCard from './CustomCard';
import { searchString } from '../atoms/articleAtom';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';

interface Props {
  news: Article[];
}

const Cards = ({ news }: Props) => {
  const [searchStr, setSearchStr] = useRecoilState(searchString);
  const [newsArray, setNewsArray] = useState<Article[]>([]);
  const [filtredNews, setFiltredNews] = useState<Article[] | null>(null);

  useEffect(() => {
    if (searchStr === null) setFiltredNews(null);
    else
      setFiltredNews(
        news.filter((item) => {
          if (
            item.title.toLowerCase().includes(searchStr.toLocaleLowerCase()) ||
            item.description.toLowerCase().includes(searchStr.toLowerCase())
          )
            return item;
        })
      );
  }, [searchStr]);

  useEffect(() => {
    filtredNews === null ? setNewsArray(news) : setNewsArray(filtredNews);
  }, [filtredNews, news]);

  return (
    <>
      <div
        className={`${
          searchStr === null || searchStr.length === 0 ? 'hidden' : 'flex'
        } flex-col px-3 p-[35px] md:px-[75px] w-full font-semibold text-base`}
      >
        Results: {filtredNews?.length}
      </div>
      <div className='px-3 md:px-[75px] w-full justify-center'>
        Custom Cards
      </div>
      <section className='grid grid-col-1 md:grid-cols-2 xl:grid-cols-3 gap-[45px] px-3 md:px-[75px] w-full justify-center'>
        {newsArray.map((item, index) => (
          <div key={`${index}-news-custom-${item.title}`}>
            <CustomCard article={item} />
          </div>
        ))}
      </section>

      <div className='mt-10 px-3 md:px-[75px] w-full justify-center'>
        Cards using Material UI
      </div>
      <section className='grid grid-col-1 md:grid-cols-2 xl:grid-cols-3 gap-[45px] px-3 md:px-[75px] w-full '>
        {newsArray.map((item, index) => (
          <div key={`${index}-news-${item.title}`}>
            <ArticleCard article={item} />
          </div>
        ))}
      </section>
    </>
  );
};

export default Cards;
