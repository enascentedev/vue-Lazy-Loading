<template>
	<div class="flex justify-center gap-5 p-5">
		<input type="text" v-model="filtroId" name="id" placeholder="Pesquisar Id"
			class="input input-bordered w-full max-w-xs" />
		<input type="text" v-model="filtroTitle" name="title" placeholder="Pesquisar titulo"
			class="input input-bordered w-full max-w-xs" />
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
</template>

<script>
import { StoreItens } from "@/stores/itens";


export default {
	name: "Table",

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
			const additionalData = this.allData.slice(this.nextIndex, this.nextIndex + this.itemsPerScroll);
			this.nextIndex += this.itemsPerScroll;
			this.visibleData = this.visibleData.concat(additionalData);
		},
	},


	async mounted() {
		this.store = StoreItens();
		this.allData = await this.store.load();
		this.loadMoreData(); // Carrega os primeiros dados
	},
};
</script>
