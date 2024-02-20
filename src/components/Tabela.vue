<template>
  <div class="overflow-x-auto h-full">
  <table class="table table-pin-rows">
  <thead>
    <tr>
      <th>Id</th>
			<th>Itens</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in data">
			<td>{{ item.id}}</td>
			<td>{{ item.title}}</td>
			
		</tr>
    
  </tbody>
  </table>
</div>
</template>
<script>
// store
import { StoreItens } from "@/stores/itens";

export default {
	name: "Table",

	data() {
		return {
			data: [],
			store: [],
		};
	},
	async mounted() {

		// store
		this.store.itens = StoreItens();
		
		// data
		this.data = await this.store.itens.load();
		console.log(this.data)
		
	},
};
</script>
