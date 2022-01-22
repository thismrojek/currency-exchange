<script lang="ts">
    import { Autoplay, Navigation } from 'swiper';
    import { Swiper, SwiperSlide } from 'swiper/svelte';
    import Card from '@smui/card';
    import Currency from '../Models/Currency';
    import { onMount } from 'svelte/internal';

    let currenciesData = [];

    const currencies = [
        { source: 'EUR', destination: 'PLN' },
        { source: 'EUR', destination: 'GBP' },
        { source: 'EUR', destination: 'CHF' }
    ]

    function fetchCurrenciesData() {
        currenciesData = [];

        currencies.forEach(async (currency, index) => {
            const { source, destination } = currency;
            const res = await Currency.convert(source, destination);
            if (res) {
                currenciesData[index] = {
                    base: res.base,
                    rate: res.rates[destination]
                };
                currenciesData = currenciesData;
            }
        })
    }

    onMount(async () => fetchCurrenciesData())
</script>

<section class="currenciesSlider">
    <h3>Oto wymiany, które zyskują popularność</h3>
    <Swiper slidesPerView={1} on:slideChange={fetchCurrenciesData} modules={[ Autoplay, Navigation ]} autoplay navigation>
        {#each new Array(currencies.length) as _slide, index}
            <SwiperSlide>
                <Card variant="outlined" padded>
                    <div class="slideContent">
                        {#if currenciesData[index]}
                            1 {currenciesData[index].base} = {currenciesData[index].rate} {currencies[index].destination}
                        {:else}
                            Odświeżamy dane...
                        {/if}
                    </div>
                </Card>
            </SwiperSlide>
        {/each}
    </Swiper>
</section>

<style lang="scss">
    .currenciesSlider {
        margin-top: 1.5rem;
        width: 400px;

        .slideContent {
            padding: 1rem 2rem;
        }

        h3 {
            font-weight: 300;
            margin-bottom: .5rem;
        }
    }
</style>