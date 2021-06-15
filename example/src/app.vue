<template>
	<div class="wrapper">
		<h1> Vite Aliases Example </h1>
		<home />
		<navigation />
		<test />
		<div class="box">
			<p>
				Randomized Hexcode
				<br />
				<code> loaded from @utils/random.js </code>
			</p>
			<div class="colored" :style="`background-color: ${color};`">
				{{ color }}
			</div>
		</div>
	</div>
</template>


<script>

import { ref } from 'vue';

import home from '@pages/home.vue';
import test from '@pagesComponents/test.vue';
import navigation from '@components/navigation.vue';
import { random } from '@utils/random';

export default {
	name: 'app',
	components: {
		home,
		test,
		navigation
	},
	setup() {
		const color = ref(random());

		return {
			color
		}
	}
};
</script>

<style lang="css">
	body {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		align-items: center;
		background: #e9ecef;
		display: flex;
		height: 100vh;
		justify-content: center;
		margin: 0;
		padding: 0;
		text-align: center;
		width: 100%;
	}

	p {
		margin: 0.5rem 0;
	}

	.wrapper {
		align-items: center;
		background: #f8f9fa;
		border-radius: 1rem;
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
		display: flex;
		flex-flow: column wrap;
		height: 24rem;
		justify-content: center;
		margin: 0 auto;
		padding: 1.5rem;
		width: 24rem;
	}

	.colored {
		color: #151515;
		border-radius: 1rem;
		padding: 0.75em;
		margin-top: 0.5rem;
		text-align: center;
	}
</style>