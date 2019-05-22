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
import {
	getAllProfiles
} from "/js/common.js";

const http = new HttpService(BASE_URL);

let app = new Vue({
	el: "#explore",
	data: {
		store: store,
		formComment: {
			commentValue: '',
		}
	},
	methods: {
		follow(userId) {
			http.post('/explores/follow', {
				followed_id: userId
			}).then(data => {
				getAllProfiles(false);
			})
		},
		like(instopicId) {
			http.get(`/instopic/like/${instopicId}`).then(() => getAllProfiles(false));
		},
		dislike(instopicId) {
			http.get(`/instopic/dislike/${instopicId}`).then(() => getAllProfiles(false));
		},
		submitComment(instopic) {
			let comment = `${instopic.name}, ${this.formComment.commentValue}`;
			http.post(`/instopic/add_comment`, {
				id: instopic.id,
				comment
			}).then(() => {
				getAllProfiles(true)
				// eslint-disable-next-line no-undef
				$(`#collapse${instopic.id}`).collapse('show');
			});
		}
	}
});

getAllProfiles(false);