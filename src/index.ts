import axios from 'axios'
import Period from './enums/Period';
import Candle from './models/Candle';

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

const generateCandles = async () => {
    while(true) {
        const loopTimes = Period.FIVE_MINUTES / Period.ONE_MINUTE
        const candle = new Candle('BTC')

        console.log('-----------------------------------')
        console.log('Generating new candle')
        for( let i = 0; i < loopTimes; i++){
            const price = await readMarketPrice();
            candle.addValue(price)
            console.log(`Market price #${i + 1} of ${loopTimes}`)
            await new Promise(r => setTimeout(r, Period.ONE_MINUTE))
        }
        candle.closeCandle()
        console.log('candle close')
        console.log(candle.toSimpleObject())

    }
}

generateCandles()