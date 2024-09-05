import axios from 'axios'

require('dotenv').config();

const readMarketPrice = async():Promise<number> => {
    const apiUrl = process.env.PRICES_API ??'';
    if(!apiUrl){
        throw new Error("PRICES_API is not defined in the environment variables.")
    }

    const result = await axios.get(apiUrl)
    const data = result.data
    const price = data.bitcoin.usd
    console.log(price)
    return price
}

readMarketPrice()