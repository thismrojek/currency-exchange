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
        currencyExchangePerYears = [];
        const { source, destination } = comparedCurrencies;

        yearsArray.forEach(async (year) => {
            const firstYearsDay = `${year}-01-01`;
            const res = await Currency.convert(source, destination, firstYearsDay);
            if (res) currencyExchangePerYears = [...currencyExchangePerYears, res.rates[destination]];
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
                ],
            },
            options: {
                title: {
                    display: true,
                    text: "World population per region (in millions)",
                },
            },
        });
    }

    onMount(() => {
        fetchHistoricalCurrenciesData();
        if (currencyExchangePerYears) generateHistoricalChart();
    })
</script>

<section class="historicalChart">
    <h3>Interesują Cię dane historyczne?</h3>
    <h4>Możesz polegać na naszej usłudze!</h4>
    <canvas bind:this={chartElement}></canvas>
</section>

<style lang="scss">
    .historicalChart {
        margin-top: 1.5rem;

        h3,
        h4 {
            font-weight: 300;
            margin-bottom: .5rem;
        }
    }
</style>