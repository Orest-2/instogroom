/* eslint-disable no-unused-vars */
import Vue from "https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.esm.browser.js";
import {
	BASE_URL
} from "/js/config.js";
import {
	store
} from "/js/store/store.js";
import {
	HttpService
} from "/js/services/HttpService.js";

const http = new HttpService(BASE_URL);

let app = new Vue({
	el: "#profile",
	data: {
		store: store,
		formUser: {
			avatar: null,
			name: "",
			age: 0,
			sex: ""
		},
		formInstopic: {
			picture: "",
			description: ""
		}
	},
	methods: {
		selectedUserAvatar(event) {
			let file = event.target.files[0];
			var fileSize = file.size / 1024 / 1024;
			var reader = new FileReader();

			if (fileSize <= 10) {
				reader.readAsDataURL(file);
				reader.onload = () =>
					(this.formUser.avatar = {
						data: reader.result,
						filename: file.name
					});
			} else {
				alert("File is too big! Size > 10MB");
			}
		},
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
		submitEditUser() {
			http
				.put("/profile/update", this.formUser)
				.then(data => (store.user = data));
		},
		submitAddInstopic() {
			http
				.post("/instopic/create", this.formInstopic)
				.then(data => (store.user.instopics = data));
		}
	}
});

let url = new URL(location.href);
let id = url.searchParams.get("id");
if (id) {
	http.get(`/profile/other/${id}`).then(data => (store.user = data));
} else {
	http.get("/profile/get").then(data => (store.user = data));
}