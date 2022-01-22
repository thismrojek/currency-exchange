<script lang="ts">
    import { Chart } from 'chart.js';
    import { onMount } from 'svelte';
    import Currency from '../Models/Currency';
    import Dates from '../Utils/Dates';

    const comparedCurrencies = {
        source: 'EUR',
        destination: 'PLN'
    }
    const yearsRange = {
        start: 2010,
        end: new Date().getFullYear()
    }
    const yearsArray: number[] = Dates.getYearsArray(yearsRange.start, yearsRange.end);

    let chartElement: HTMLCanvasElement;
    let currencyExchangePerYears: number[] = [];

    function fetchHistoricalCurrenciesData() {
        return new Promise(resolve => {
            currencyExchangePerYears = [];
            const { source, destination } = comparedCurrencies;

            yearsArray.forEach(async (year, index) => {
                const firstYearsDay = `${year}-01-01`;
                const res = await Currency.convert(source, destination, firstYearsDay);
                if (res) {
                    currencyExchangePerYears[index] = res.rates[destination];
                    currencyExchangePerYears = currencyExchangePerYears;
                    if ((index + 1) == yearsArray.length) resolve(true);
                };
            })
        })
    }

    function generateHistoricalChart() {
        new Chart(chartElement, {
            type: "line",
            data: {
                labels: yearsArray,
                datasets: [
                    {
                        data: currencyExchangePerYears,
                        label: `${comparedCurrencies.source} price in ${comparedCurrencies.destination}`,
                        borderColor: "#3e95cd",
                        fill: false,
                    }
                ]
            }
        });
    }

    onMount(() => {
        fetchHistoricalCurrenciesData()
            .then(generateHistoricalChart);
    })
</script>

<section class="historicalChart">
    <h3>Interesują Cię dane historyczne?</h3>
    <h4>Możesz polegać na naszej usłudze!</h4>
    <canvas bind:this={chartElement}></canvas>
</section>

<style lang="scss">
    .historicalChart {
        margin: 1.5rem 0;
        width: 750px;
        max-width: 90vw;

        h3,
        h4 {
            font-weight: 300;
            margin-bottom: .5rem;
        }
    }
</style>