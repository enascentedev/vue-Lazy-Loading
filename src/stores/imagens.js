import { defineStore } from "pinia";
import axios from 'axios'


export const StoreImagens = defineStore({
	id: "StoreImagens",

	state: () => ({
		// System
		error: null,
		request: null,

		// Data
		data: [],
	}),

	actions: {
		async loadImagem() {
			try {
				// request
				this.request = await axios.get("https://dog.ceo/api/breeds/image/random/100", {
					
				});

				//pinia
				this.dataImage = this.request.data;
			} catch (error) {
				this.error = error.message;
			}

			// return
			return this.dataImage;
		},
	},
});
