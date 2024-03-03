<template>
	<div class="join">
		<div>
			<div>
				<input class="input input-bordered join-item" placeholder="Search" />
			</div>
		</div>
		<select class="select select-bordered join-item">
			<option disabled selected>Filter</option>
			<option>Sci-fi</option>
			<option>Drama</option>
			<option>Action</option>
		</select>
		<div class="indicator">
			<span class="indicator-item badge badge-secondary">new</span>
			<button class="btn join-item">Search</button>
		</div>
	</div>

	<div class="overflow-x-auto h-[710px]" @scroll="handleScroll">
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

	<div class="join">
		<button class="join-item btn">1</button>
		<button class="join-item btn">2</button>
		<button class="join-item btn btn-disabled">...</button>
		<button class="join-item btn">99</button>
		<button class="join-item btn">100</button>
	</div>
	
</template>

<script>
import { StoreItens } from "@/stores/itens";


export default {
	name: "TablePaginacao",

	data() {
		return {
			// Dados originais não filtrados (todos os dados da API)
			allData: [],

			// Dados atualmente visíveis no DOM (parte dos dados de allData)
			visibleData: [],

			// Índice do próximo item a ser carregado (para virtual scrolling)
			nextIndex: 0,

			// Quantos itens devem ser carregados por vez durante o scroll
			itemsPerScroll: 15,

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
	},


	async mounted() {
		this.store = StoreItens();
		this.allData = await this.store.load();
		this.loadMoreData(); // Carrega os primeiros dados
	},
};
</script>
