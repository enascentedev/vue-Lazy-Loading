<template>
	<div class="w-full h-screen grid grid-cols-4 gap-4 p-4">
		<div v-for="(item, index) in visibleData" :key="`item-${index}`" class="h-auto bg-gray-100 rounded-md flex flex-col">
			<figure class="h-32  flex justify-center items-center p-2">
				<img :src="dataImage.message.length > index ? dataImage.message[index] : 'fallback-image-url'" alt="Dog image"
					class="rounded-xl h-32" />
			</figure>
			<div class="h-24 p-1 flex flex-col justify-between">
				<h2 class="text-center text-xs font-bold p-1">{{ item.id }}</h2>
				<div class="flex justify-center items-end p-1">
					<button @click="$emit('like', item.id)" class="min-h-8 h-8 btn btn-success m-1"><i class="fa-regular fa-thumbs-up"></i>bom</button>
					<button @click="$emit('dislike',item.id)" class="min-h-8 h-8 btn btn-error m-1"><i class="fa-regular fa-thumbs-down"></i>ruim</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import { StoreImagens } from "@/stores/imagens";

export default {
	props: {
		
		visibleData: {
			type: Array,
			required: true,
			default: () => [] 
		}
	},

	name: "Card",
	data() {
		return {
			dataImage: [],
			storeImagens: [],
		};
	},

	methods: {

	},

	async mounted() {
		this.storeImagens = StoreImagens();
		this.dataImage = await this.storeImagens.loadImagem();
	},
};
</script>
