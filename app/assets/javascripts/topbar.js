import Vue from "https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.esm.browser.js";
import { BASE_URL } from "/js/config.js";
import { store } from "/js/store/store.js";
import { HttpService } from "/js/services/HttpService.js";

const http = new HttpService(BASE_URL);

let app = new Vue({
	el: "#topbar",
	data: {
		store: store,
		formInstopic: {
			picture: "",
			description: ""
		}
	},
	methods: {
		
		selectedInstopic(event) {
			let file = event.target.files[0];
			var fileSize = file.size / 1024 / 1024;
			var reader = new FileReader();

			if (fileSize <= 10) {
				reader.readAsDataURL(file);
				reader.onload = () =>
					(this.formInstopic.picture = {
						data: reader.result,
						filename: file.name
					});
			} else {
				alert("File is too big! Size > 5MB");
			}
		},
		
		submitAddInstopic() {
			http
				.post("/instopic/create", this.formInstopic)
				.then(data => (store.user.instopics = data));
		}
	}
});


