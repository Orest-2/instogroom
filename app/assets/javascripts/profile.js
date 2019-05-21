/* eslint-disable no-unused-vars */
// import Vue from "https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.esm.browser.js";
import { BASE_URL } from "/js/config.js";
import { store } from "/js/store/store.js";
import { HttpService } from "/js/services/HttpService.js";

const http = new HttpService(BASE_URL);

let app = new Vue({
	el: "#profile",
	data: {
		store: store,
		formUser: {
			avatar: null,
			name: ""
		}
	},
	components: {
		FilePond: vueFilePond.default(
			FilePondPluginImagePreview,
			FilePondPluginFileValidateSize
		)
	},
	methods: {
		submitEditUser() {
			let file = this.$refs.pond1.getFiles()[0].file;

			var fileSize = file.size / 1024 / 1024;
			var reader = new FileReader();

			if (fileSize <= 5) {
				reader.readAsDataURL(file);
				reader.onload = () => {
					this.formUser.avatar = {
						data: reader.result,
						filename: file.name
					};

					http.put("/profile/update", this.formUser).then(data => {
						$("#editProfileModal").modal("hide");
						store.user = {};
						store.user = data;

						this.formUser.name = "";
					});
				};
			}
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
