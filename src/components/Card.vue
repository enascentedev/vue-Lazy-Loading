<template>
	<div class="w-full h-screen grid grid-cols-4 gap-4 p-4">
		<div v-for="(item, index) in visibleData" :key="`item-${index}`" class="h-auto bg-gray-100 rounded-md flex flex-col">
			<figure class="h-32  flex justify-center items-center p-2">
				<img :src="dataImage.message.length > index ? dataImage.message[index] : 'fallback-image-url'" alt="Dog image"
					class="rounded-xl h-32" />
			</figure>
			<div class="h-24 p-2 flex flex-col justify-between">
				<h2 class="text-center text-xs font-bold p-1">{{ item.id }}</h2>
				<div class="flex justify-center items-end p-1">
					<button @click="$emit('like')" class="min-h-8 h-8 btn btn-success m-2">bom</button>
					<button @click="$emit('deslike')" class="min-h-8 h-8 btn btn-error m-2">ruim</button>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
import { StoreItens } from "@/stores/itens";
import { StoreImagens } from "@/stores/imagens";

export default {
	props: {
		// Define 'visibleData' esperando receber um Array
		visibleData: {
			type: Array,
			required: true, // Só adicione isso se a prop for obrigatória
			default: () => [] // Só forneça um valor padrão se for necessário e se não for obrigatório
		}
	},

	name: "Card",
	data() {
		return {
			data: [],
			store: [],
			dataImage: [],
			storeImagens: [],
		};
	},

	methods: {


	},
	// quero excluir essa chamada 
	async mounted() {
		this.store = StoreItens();
		this.data = await this.store.load();
		this.storeImagens = StoreImagens();
		this.dataImage = await this.storeImagens.loadImagem();
		console.log(this.dataImage.message)
	},
};
</script>
