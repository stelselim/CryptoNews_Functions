import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();

import cryptoNewsHandlerService, {
  handleCryptoNewsError,
} from './service/cryptoNews.services';

export const scheduledCryptoNewsFunction = functions.pubsub
  .schedule('every 1 hours')
  .onRun(async (context) => {
    try {
      functions.logger.info('Started Scheduled Crypto News!', {
        structuredData: true,
      });
      await cryptoNewsHandlerService();
      functions.logger.info('Succesfully added to the Firestore!', {
        structuredData: true,
      });
      return;
    } catch (error) {
      functions.logger.info('Error in Function!', { structuredData: true });
      return;
    }
  });

export const cryptoNewsHandler = functions.https.onRequest(
  async (request, response) => {
    try {
      await cryptoNewsHandlerService();
      functions.logger.info('Succesfully added to the Firestore!', {
        structuredData: true,
      });
      response.send('Succesfully added to the Firestore!');
    } catch (error: any) {
      handleCryptoNewsError(error.code ?? '', error.message ?? '');
      functions.logger.info('Error in Function!', { structuredData: true });
      response.send('Error in Function');
    }
  }
);
