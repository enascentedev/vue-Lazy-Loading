<template>
	<div class="flex justify-center gap-5 p-5">
		<input type="text" v-model="filtroId" name="id" placeholder="Pesquisar Id"
			class="input input-bordered w-full max-w-xs" />
		<input type="text" v-model="filtroTitle" name="title" placeholder="Pesquisar titulo"
			class="input input-bordered w-full max-w-xs" />
	</div>

	<div class="overflow-x-auto h-full">
		<table class="table table-pin-rows">
			<thead>
				<tr>
					<th>Id</th>
					<th>Itens</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in data" :key="item.id">
					<td>{{ item.id }}</td>
					<td>{{ item.title }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import { StoreItens } from "@/stores/itens";
import { watch, onMounted } from "vue";

export default {
	name: "Table",

	data() {
		return {
			data: [],
			filtroId: '',
			filtroTitle: '',
		};
	},

	watch: {
		filtroId(newVal) {
			this.filtrarDados();
		},
		filtroTitle(newVal) {
			this.filtrarDados();
		},
	},

	methods: {
		async filtrarDados() {
			if (this.filtroId || this.filtroTitle) {
				this.data = await this.store.filtrarItens({ tipo: this.filtroId ? 'id' : 'title', valor: this.filtroId || this.filtroTitle });
			} else {
				this.data = await this.store.load();
			}
		}
	},

	async mounted() {
		this.store = StoreItens();
		this.data = await this.store.load();
	},
};
</script>
