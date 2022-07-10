## Crypto News Functions 

#### This project, for getting latest crypto news every 1 hour & saving the news for later usage.

The project has 2 different cloud functions.
- **scheduledCryptoNewsFunction**: Triggers the latest news function every 1 hour. It is a scheduled function (Cron Job). 
- **cryptoNewsHandler**: Gets latest crypto news, saves Firestore database for later usage. It is a HTTPs request.


<br/>

## Provider 

Crypto news is fetched from Crypto Panic. Further reading [here](https://cryptopanic.com/developers/api/).
- API Key required.
    - required as environment variable.
    - **CRYPTO_NEWS_API_KEY**


<br/>


## How To Run


Before running, required API key as environment variable.

```
git clone https://github.com/stelselim/CryptoNews_Functions.git
cd functions
npm install
npm run serve
```

<br/>

## How Deploy


```
npm run deploy
```


<br/>
 
## Authors

👤 **Selim Ustel**

- GitHub: [@stelselim](https://github.com/stelselim)
- LinkedIn: [@selimustel](https://www.linkedin.com/in/selimustel/)

<br/>
