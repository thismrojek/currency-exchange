export default class Currency {
    static async convert(source, destination) {
        const res = await fetch(`${process.env.CURRENCY_API_ENDPOINT}/latest?access_key=${process.env.CURRENCY_API_KEY}&base=${source}&symbols=${destination}`);
        const json = await res.json();
        return json;
    }
}