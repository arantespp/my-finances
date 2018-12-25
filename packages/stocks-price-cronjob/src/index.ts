/** @format */

import AWS from 'aws-sdk';
import fetch from 'cross-fetch';
import { utc } from 'moment';
import config from './config';

interface Tickers {
  tickers: Array<{
    AlphaVantageSymbol: string;
    ticker: string;
  }>;
}

interface AlphaVantageGlobalQuoteResponse {
  'Global Quote': {
    '01. symbol': string;
    '02. open': string;
    '03. high': string;
    '04. low': string;
    '05. price': string;
    '06. volume': string;
    '07. latest trading day': string;
    '08. previous close': string;
    '09. change': string;
    '10. change percent': string;
  };
}

interface AlphaVantageGlobalQuote {
  symbol: string;
  open: string;
  high: string;
  low: string;
  price: string;
  volume: string;
  latestTradingDay: string;
  previousClose: string;
  change: string;
  changePpercent: string;
}

const { AlphaVantageApiKey, IdentityPoolId, region, TableName } = config;

AWS.config.region = region; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({ IdentityPoolId });

const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const getAllTickers = async (): Promise<Tickers> => {
  try {
    const params = {
      Key: {
        hashKey: { S: 'metadata' },
        rangeKey: { S: 'tickers' },
      },
      TableName,
      ConsistentRead: true,
    };
    const { Item } = await dynamodb.getItem(params).promise();
    const converted = AWS.DynamoDB.Converter.unmarshall(Item);
    delete converted.hashKey;
    delete converted.rangeKey;
    return { tickers: Object.keys(converted).map(key => converted[key]) };
  } catch (e) {
    throw e;
  }
};

const AlphaVantageQuote = async (symbol: string): Promise<AlphaVantageGlobalQuote> => {
  try {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${AlphaVantageApiKey}`;
    const res = await fetch(url);
    if (res.status >= 400) {
      throw new Error('Bad response from server');
    }
    const globalQuote: AlphaVantageGlobalQuoteResponse = await res.json();
    // Such symbol does not exist on Alpha Vantage API
    if (Object.keys(globalQuote['Global Quote']).length === 0) {
      return null;
    }
    return {
      symbol: globalQuote['Global Quote']['01. symbol'],
      open: globalQuote['Global Quote']['02. open'],
      high: globalQuote['Global Quote']['03. high'],
      low: globalQuote['Global Quote']['04. low'],
      price: globalQuote['Global Quote']['05. price'],
      volume: globalQuote['Global Quote']['06. volume'],
      latestTradingDay: globalQuote['Global Quote']['07. latest trading day'],
      previousClose: globalQuote['Global Quote']['08. previous close'],
      change: globalQuote['Global Quote']['09. change'],
      changePpercent: globalQuote['Global Quote']['10. change percent'],
    };
  } catch (e) {
    throw e;
  }
};

const saveToDynamoDB = async (
  ticker: string,
  tickeralphaVantageGlobalQuote: AlphaVantageGlobalQuote,
): Promise<void> => {
  try {
    const params = {
      Item: {
        hashKey: { S: ticker },
        rangeKey: { S: utc().toISOString() },
        symbol: { S: tickeralphaVantageGlobalQuote.symbol },
        open: { N: tickeralphaVantageGlobalQuote.open },
        high: { N: tickeralphaVantageGlobalQuote.high },
        low: { N: tickeralphaVantageGlobalQuote.low },
        price: { N: tickeralphaVantageGlobalQuote.price },
        volume: { N: tickeralphaVantageGlobalQuote.volume },
        latestTradingDay: { S: tickeralphaVantageGlobalQuote.latestTradingDay },
        previousClose: { S: tickeralphaVantageGlobalQuote.previousClose },
        change: { N: tickeralphaVantageGlobalQuote.change },
        changePpercent: { S: tickeralphaVantageGlobalQuote.changePpercent },
      },
      TableName,
    };
    await dynamodb.putItem(params).promise();
  } catch (e) {
    throw e;
  }
};

export async function stocksPricesCronjob() {
  try {
    const { tickers } = await getAllTickers();
    for (const ticker of tickers) {
      const res = await AlphaVantageQuote(ticker.AlphaVantageSymbol);
      if (!!res) {
        await saveToDynamoDB(ticker.ticker, res);
      }
    }
  } catch (e) {
    console.log(e);
  }
}

// stocksPricesCronjob();
