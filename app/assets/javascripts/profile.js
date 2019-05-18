import Vue from "https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.esm.browser.js";
import { BASE_URL } from "/js/config.js";
import { HttpService } from "/js/services/HttpService.js";

const http = new HttpService(BASE_URL);

let app = new Vue({
	el: "#profile",
	data: {
		user: "",
		form: {
			avatar: null,
			name: "",
			age: 0,
			sex: ""
		}
	},
	methods: {
		selectedFile(event) {
			let file = event.target.files[0];
			var fileSize = file.size / 1024 / 1024;
			var reader = new FileReader();

			if (fileSize <= 2) {
				reader.readAsDataURL(file);
				reader.onload = () =>
					(this.form.avatar = { data: reader.result, filename: file.name });
			} else {
				alert("File is too big!");
			}
		},
		submit() {
			http.put("/profile/update", this.form).then(data => (app.user = data));
		}
	}
});

http.get("/profile/get").then(data => (app.user = data));
