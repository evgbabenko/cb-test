/* Card using Material UI */

import { Article } from '@/typings';
import {
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Button from '@mui/material/Button';
import { useRecoilState } from 'recoil';
import { articleState, searchString } from '../atoms/articleAtom';
import router from 'next/router';
import Card from '@mui/material/Card';
import moment from 'moment';
import parse from 'html-react-parser';


interface Props {
  article: Article;
}

const ArticleCard = ({ article }: Props) => {
  const [currentArticle, setCurrentArticle] = useRecoilState(articleState);
  const [searchStr, setSearchStr] = useRecoilState(searchString);

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
    <Card
      sx={{
        maxWidth: 400,
        minHeight: 570,
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      onClick={() => {
        setCurrentArticle(article);
        router.push('/newspage');
      }}
    >
      <CardMedia
        component='img'
        sx={{ height: 217 }}
        image={article.urlToImage}
        alt={article.title}
      />
      <CardHeader
        subheader={moment(article.published).utc().format('MMMM Do, YYYY')}
        classes={{ subheader: 'subheader' }}
      />
      <CardHeader
        title={highLightText(article.title)}
        classes={{ title: 'article_title' }}
        onClick={() => {
          setCurrentArticle(article);
          router.push('/newspage');
        }}
      />
      <CardContent>
        <Typography className='description' color='text.secondary'>
          {highLightText(`${article.description.slice(0, 97)}...`)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>
          <p className='read_more_button'>
            Read More <ArrowRightAltIcon />
          </p>
        </Button>
      </CardActions>
    </Card>
  );
};

export default ArticleCard;
