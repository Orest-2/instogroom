import { store } from "./store/store.js";
import { HttpService } from "./services/HttpService.js";
import { BASE_URL } from "./config.js";

const http = new HttpService(BASE_URL);

export function getAllProfiles(isWatterfall) {
	let temp = [];
	http.post(`/explores/all_profiles`).then(data => {
		let onlyUnfollowers = data.filter(
			element => element.followed === isWatterfall
		);
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

export function getUserData() {
	let url = new URL(location.href);
	let id = url.searchParams.get("id");
	if (id) {
		http.get(`/profile/other/${id}`).then(data => {
			mappedUserData(data);
			store.myProfile = false;
		});
	} else {
		http.get("/profile/get").then(data => {
			mappedUserData(data);
			store.myProfile = true;
		});
	}
}

function mappedUserData(user) {
	let temp = [];
	user.instopics.forEach(instopic => {
		instopic.name = user.name;
		instopic.avatar = user.avatar;
		temp.push(instopic);
	});
	store.user.instopics = [];
	store.user = user;
	store.user.instopics = temp;
}
