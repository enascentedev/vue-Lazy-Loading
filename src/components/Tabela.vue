<template>
	<div class="flex">
		<div class="flex w-[49%]">
			<div class="flex flex-col w-[59%]">
				<div class="flex justify-center gap-5 p-5">
					<input type="text" v-model="filtroId" name="id" placeholder="Pesquisar Id"
						class="input input-bordered w-full max-w-xs text-xs" />
					<input type="text" v-model="filtroTitle" name="title" placeholder="Pesquisar titulo"
						class="input input-bordered w-full max-w-xs text-xs" />
				</div>
				<div class="w-full flex justify-between flex-wrap gap-1 p-5">
					<div v-for="(count, id) in counters" :key="`counter-${id}`" class="w-32 flex justify-between border-2 p-2 border-blue-500 rounded-md">
						<i class="fa-regular fa-thumbs-up text-lg p-2"></i>
						<div class="flex flex-col">
							<h2>ID: {{ id }}</h2>
							<p>Likes: {{ count.likes }}</p>
							<p>Dislikes: {{ count.dislikes }}</p>
						</div>
					</div>
				</div>
			</div>
			<div class="overflow-x-auto h-[650px]" @scroll="handleScroll">
				<table class="table table-pin-rows">
					<thead>
						<tr>
							<th>Id</th>
							<th>Itens</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in visibleData" :key="item.id">
							<td>{{ item.id }}</td>
							<td>{{ item.title }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="w-[49%]">
			<Card :visibleData="visibleData" @like="handleLike" @dislike="handleDislike" />
		</div>
	</div>
</template>

<script>
import { StoreItens } from "@/stores/itens";
import Card from "@/components/Card.vue";


export default {
	name: "Table",

	components: { Card },

	data() {
		return {
			likesCount: 0,
			dislikesCount: 0,
			counters: {},
			// Dados originais não filtrados (todos os dados da API)
			allData: [],

			// Dados atualmente visíveis no DOM (parte dos dados de allData)
			visibleData: [],

			// Índice do próximo item a ser carregado (para virtual scrolling)
			nextIndex: 0,

			// Quantos itens devem ser carregados por vez durante o scroll
			itemsPerScroll: 13,

			// filtros existentes
			filtroId: '',
			filtroTitle: '',

			// Timer para a função de debounce
			debounceTimer: null,

			//serve para armazenar temporariamente o próximo conjunto de dados 
			additionalData: ""
		};

	},

	watch: {
		filtroId() {
			if (this.debounceTimer) clearTimeout(this.debounceTimer);
			this.debounceTimer = setTimeout(() => {
				this.filtrarDados();
			}, 2000); // Espera 2s antes de invocar filtrarDados
		},
		filtroTitle() {
			if (this.debounceTimer) clearTimeout(this.debounceTimer);
			this.debounceTimer = setTimeout(() => {
				this.filtrarDados();
			}, 2000); // Espera 2s antes de invocar filtrarDados
		},
	},


	methods: {
		async filtrarDados() {
			if (this.filtroId || this.filtroTitle) {
				// Atualiza allData com os resultados filtrados da loja
				this.allData = await this.store.filtrarItens({
					tipo: this.filtroId ? 'id' : 'title',
					valor: this.filtroId || this.filtroTitle
				});
			} else {
				// Se não houver filtro, carrega todos os dados novamente
				this.allData = await this.store.load();
			}

			// Reinicia a visualização de dados
			this.nextIndex = 0; // Reseta o índice para começar do início
			this.visibleData = []; // Limpa os dados visíveis para resetar a exibição
			this.loadMoreData(); // Carrega os primeiros itens de allData para visibleData
		},

		//função para definir o final da tela e iniciar a busca por novos dados
		handleScroll(event) {
			const { scrollTop, clientHeight, scrollHeight } = event.target;
			if (scrollTop + clientHeight >= scrollHeight - 20) {
				this.loadMoreData();
			}
		},

		//função carrega mais dados para serem exibidos na tabela
		loadMoreData() {
			this.additionalData = this.allData.slice(this.nextIndex, this.nextIndex + this.itemsPerScroll);
			this.nextIndex += this.itemsPerScroll;
			this.visibleData = this.visibleData.concat(this.additionalData);
		},
		handleLike(itemId) {
			if (!this.counters[itemId]) this.counters[itemId] = { likes: 0, dislikes: 0 };
			this.counters[itemId].likes++;
		},
		handleDislike(itemId) {
			if (!this.counters[itemId]) this.counters[itemId] = { likes: 0, dislikes: 0 };
			this.counters[itemId].dislikes++;
		},
	},


	async mounted() {
		this.store = StoreItens();
		this.allData = await this.store.load();
		this.loadMoreData(); // Carrega os primeiros dados
	},
};
</script>
