export interface Article{
  source: {
    id: string,
    name: string,
  },
  author: string,
  title: string,
  description: string,
  url: string,
  urlToImage: string,
  published: Date,
  content: string,
}