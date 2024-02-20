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
