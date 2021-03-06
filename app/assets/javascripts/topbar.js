// import Vue from "https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.esm.browser.js";
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
	el: "#topbar",
	data: function () {
		return {
			store: store,
			formInstopic: {
				picture: "",
				description: ""
			}
		};
	},
	components: {
		FilePond: vueFilePond.default(
			FilePondPluginImagePreview,
			FilePondPluginFileValidateSize
		)
	},
	methods: {
		submitAddInstopic() {
			store.showLoader = true;

			let file = this.$refs.pond.getFiles()[0].file;

			var fileSize = file.size / 1024 / 1024;
			var reader = new FileReader();

			if (fileSize <= 5) {
				reader.readAsDataURL(file);
				reader.onload = () => {
					this.formInstopic.picture = {
						data: reader.result,
						filename: file.name
					};

					http.post("/instopic/create", this.formInstopic).then(data => {
						$("#exampleModal").modal("hide");
						store.user.instopics = [];
						store.user.instopics = data;
						store.showLoader = false;
					});
				};
			}
		}
	}
});