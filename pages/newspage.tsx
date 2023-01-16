import { Article } from '@/typings';
import { Button } from '@mui/material';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { articleState } from '../atoms/articleAtom';
import { useRouter } from 'next/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from 'react';

const NewsPage = () => {
  const [currentArticle, setCurrentArticle] = useRecoilState(articleState);
  const [ifNews, setIfNews] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (currentArticle === null) {
      setIfNews(false);
      router.push('/');
    } else {
      setIfNews(true);
    }
  }, [currentArticle, router]);
  console.log(currentArticle);

  if (ifNews)
    return (
      <div className='flex flex-col w-full bg-white min-h-screen justify-start items-center'>
        {/* Article image */}
        <div className='relative top-0 w-full !h-[245px]'>
          <Image
            src={currentArticle!.urlToImage}
            alt={currentArticle!.title}
            fill
            className='object-cover'
          />
        </div>
        <div className='relative -top-[90px] bg-white shadow-md rounded-md px-5 md:px-[75px] space-y-[35px] pb-[35px] mx-5 md:mx-[75px]'>
          <div className='w-full text-center pt-[35px] text-2xl'>
            {currentArticle!.title}
          </div>
          <div>{currentArticle!.content}</div>
        </div>
        <div className='self-start w-full px-5 md:px-[150px]'>
          <Button size='small' onClick={() => router.push('/')}>
            <p className='read_more_button'>
              <ArrowBackIcon /> Back to home page
            </p>
          </Button>
        </div>
      </div>
    );
};

export default NewsPage;
