<script lang="ts">
    import Card from '@smui/card';
    import { onMount } from 'svelte/internal';
    import Currency from '../Models/Currency';

    const currencies = {
        base: 'EUR',
        destination: 'PLN'
    }

    let currencyConvertData;

    onMount(async () => {
        const res = await Currency.convert(currencies.base, currencies.destination);
        if (res) currencyConvertData = res;
    })

</script>

<main>
    {#if currencyConvertData}
        <section class="favouriteCurrenyExchange">
            <h3>Twoja ulubiona wymiana</h3>
            <Card variant="outlined" padded>
                1 {currencies.base} = {currencyConvertData.rates[currencies.destination]} {currencies.destination}
            </Card>
        </section>
    {/if}
</main>

<style lang="scss">
    .favouriteCurrenyExchange {
        margin-top: 1rem;
        max-width: 300px;

        h3 {
            font-weight: 300;
            margin-bottom: .5rem;
        }
    }
</style>