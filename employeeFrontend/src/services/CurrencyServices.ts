import axios from "axios";

export interface ExchangeResponse {
    [key: string]: number;
}

export const getAllRates = async () => {
    const response = await axios.get<ExchangeResponse>('https://api.freecurrencyapi.com/v1/latest', {
    params: {
      apikey: 'fca_live_RmxpBtFunacOD3Aj09dJBiWfqN6VOsI5mZcaCOjc',
      base_currency: 'USD',
      currencies: 'EUR,GBP,JPY,CAD,AUD',
    },
  });
  if (response.status !== 200) {
    throw new Error("failed to fetch data");
  }
  return response.data.data;
}