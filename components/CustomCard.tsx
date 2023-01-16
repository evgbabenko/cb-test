/* Custom Card */

import { Article } from '@/typings';
import router from 'next/router';
import Image from 'next/image';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { articleState } from '../atoms/articleAtom';
import { searchString } from '../atoms/articleAtom';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Button from '@mui/material/Button';
import parse from 'html-react-parser';

interface Props {
  article: Article;
}

const CustomCard = ({ article }: Props) => {
  const [currentArticle, setCurrentArticle] = useRecoilState(articleState);
  const [searchStr, setSearchStr] = useRecoilState(searchString);
  const [title, setTitle] = useState<string | null>(null);

  const highLightText = (text: string) => {
    if (searchStr === null) return text;
    else
      return parse(
        text.replace(
          new RegExp(searchStr, 'gi'),
          (match) => `<mark>${match}</mark>`
        )
      );
  };
  

  return (
    <div
      className='flex flex-col shrink-0 w-full max-w-[400px] relative bg-white h-[500px] items-center justify-start space-y-[25px] rounded-md shadow-md overflow-hidden cursor-pointer'
      onClick={() => {
        setCurrentArticle(article);
        router.push('/newspage');
      }}
    >
      {/* Image box */}
      <div className='!h-[217px] w-full overflow-hidden relative'>
        <Image
          src={article.urlToImage}
          alt={article.title}
          fill
          className='object-cover'
        />
      </div>
      {/* Content box */}
      <div className='px-[25px] self-start space-y-[20px]'>
        <div className='subheader flex flex-row justify-start items-center space-x-2'>
          <CalendarMonthIcon className='h-3 w-3' />
          <div>{moment(article.published).utc().format('MMMM Do, YYYY')}</div>
        </div>
        <div className='article_title'>{highLightText(article.title)}</div>
        <div>{highLightText(`${article.description.slice(0, 97)}...`)}</div>
        {/* Button box */}
        <div className='self-start'>
          <Button size='small'>
            <p className='read_more_button'>
              Read More <ArrowRightAltIcon />
            </p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomCard;
