const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
 const BASE_URL = 'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey='; 

const request_news = `${BASE_URL}${API_KEY}`;

export default request_news;