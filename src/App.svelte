<script lang="ts">
	import Home from "./Views/Home.svelte";
	import { Chart, registerables } from 'chart.js';

	Chart.register(...registerables);
</script>

<Home />