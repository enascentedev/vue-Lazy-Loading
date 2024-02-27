<template>
	<div class="card w-full absolte top-0 right-10 mt-5">

		<div class="card-body items-center text-center">


			<div class="card-actions">

				<div class="w-1/2">
					<figure class="px-10 pt-10">
						<img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes"
							class="rounded-xl" />
					</figure>
					<slot name="footer"></slot>
					<button @click="$emit('like')" class="btn btn-primary m-2"><i class="fa-solid fa-thumbs-up"></i>bom</button>
					<button @click="$emit('comment')" class="btn btn-primary m-2"><i class="fa-solid fa-thumbs-down"></i>ruim</button>
					<h2 class="font-bold">{{ data.length > 0 ? data[0].title : 'Carregando...' }}</h2>
					<p class="m-5">{{ data.length > 0 ? data[0].body : 'Carregando...' }}</p>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
import { StoreItens } from "@/stores/itens";


export default {
	name: "Card",
	data() {
		return {
			data: [],
			store: [],
		};
	},

	methods: {


	},

	async mounted() {
		this.store = StoreItens();
		this.data = await this.store.load();
		console.log(this.data[0].title)
	},
};
</script>
