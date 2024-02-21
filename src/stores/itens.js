import { defineStore } from "pinia";
import axios from 'axios'


export const StoreItens = defineStore({
	id: "StoreFilter",

	state: () => ({
		// System
		error: null,
		request: null,

		// Data
		data: [],
	}),
	getters: {
    // Getter que filtra itens por id ou title
    filtrarItens: (state) => (filtro) => {
      if (!filtro.valor || filtro.valor === '') {
        return state.data;
      }
      return state.data.filter((item) => {
        if (filtro.tipo === 'id') {
          return item.id.toString().includes(filtro.valor);
        } else if (filtro.tipo === 'title') {
          return item.title.toLowerCase().includes(filtro.valor.toLowerCase());
        }
      });
    },
  },
	actions: {
		async load() {
			try {
				// request
				this.request = await axios.get("https://jsonplaceholder.typicode.com/posts", {
					
				});

				//pinia
				this.data = this.request.data;
			} catch (error) {
				this.error = error.message;
			}

			// return
			return this.data;
		},
	},
});
