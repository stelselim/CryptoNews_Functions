import axios from 'axios';
import * as firebase from 'firebase-admin';
import * as functions from 'firebase-functions';
import {
  CRYPTO_NEWS_API_KEY,
  errorCollectionPath,
  newsCollectionPath,
} from '../config/constant';
import { INewsArticle } from '../interfaces/news_article';
import { INewsArticleEntity } from '../interfaces/news_entity';

const newsCollection = firebase.firestore().collection(newsCollectionPath);
const errorCollection = firebase.firestore().collection(errorCollectionPath);

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/// API LIMIT: 5 request in one second.
const cryptoNewsGetService = async (): Promise<INewsArticleEntity[]> => {
  const data: INewsArticleEntity[] = [];
  // Read 100 Count
  for (let i = 1; i < 6; i++) {
    const res = await axios.get(
      'https://cryptopanic.com/api/v1/posts/?auth_token=' +
        CRYPTO_NEWS_API_KEY +
        '&page=' +
        i.toString()
    );
    await timeout(400);
    data.push(...(res.data.results as INewsArticleEntity[]));
  }
  return data;
};

const cryptoNewsSaveService = async (articles: INewsArticleEntity[]) => {
  for (let article of articles) {
    const docName = article.id.toString();
    const doc = await newsCollection.doc(docName).get();
    if (!doc.exists) {
      const data: INewsArticle = {
        ...article,
        created_at: new Date(article.created_at).getTime(),
        published_at: new Date(article.created_at).getTime(),
      };
      await newsCollection.doc(docName).create(data);
    }
  }
};

const handleCryptoNewsError = async (code: String, message: String) => {
  try {
    const time = Date.now();
    await errorCollection.doc(time.toString()).create({
      message: message,
      code: code,
      date: time,
    });
  } catch (error) {
    functions.logger.info('Error in handleCryptoNewsError!', {
      structuredData: true,
    });
  }
};

const cryptoNewsHandlerService = async () => {
  const data = await cryptoNewsGetService();
  await cryptoNewsSaveService(data);
};

export default cryptoNewsHandlerService;
export { handleCryptoNewsError };
