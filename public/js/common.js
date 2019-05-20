import {
	store
} from './store/store.js'
import {
	HttpService
} from './services/HttpService.js'
import {
	BASE_URL
} from "./config.js"

const http = new HttpService(BASE_URL);

export function getAllProfiles() {
	let temp = [];
	http.get(`/explores/all_profiles`).then(data => {
		let onlyUnfollowers = data.filter((element) => element.followed === false)
		onlyUnfollowers.forEach(unfollowers => {
			unfollowers.instopics.forEach(instopic => {
				instopic.name = unfollowers.name;
				instopic.avatar = unfollowers.avatar;
				temp.push(instopic);
			});
		});
		store.explore = [];
		store.explore = temp;
	});
}