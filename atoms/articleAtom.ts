import { Article } from '@/typings';
import { atom } from 'recoil';

export const articleState = atom<Article | null>({
  key: 'ArticleState',
  default: null,
});

export const searchString = atom<string | null>({
  key: 'SearchString',
  default: null,
})
