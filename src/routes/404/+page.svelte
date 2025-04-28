<svelte:head>
	<title>Not Found</title>
</svelte:head>

<div id="_404">
	<main>
		<div class="emphasise">404</div>
		<div>Not found</div>
	</main>

	<footer>
		<a href="/">lusc.ch</a>
	</footer>
</div>

<style lang="scss">
	#_404 {
		font-size: 45px;
		text-align: center;

		height: 100vh;
		width: 100vw;

		display: grid;
		grid-template-rows: 1fr auto;
		justify-content: center;
	}

	main {
		align-self: center;
	}

	footer {
		align-self: flex-end;
		padding: 1em;
	}

	.emphasise {
		color: var(--blue);
	}

	a {
		font-size: 0.5em;
	}
</style>
