export class HttpService {
	constructor(baseUrl) {
		this.baseUrl = baseUrl;
	}

	async send(uri, method, body = null) {
		let url = `${this.baseUrl}${uri}`;

		let option = {
			method,
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(body)
		};

		if (!body) delete option.body;

		const response = await fetch(url, option);

		return response.json();
	}

	get(uri) {
		return this.send(uri, "get");
	}

	post(uri, body = null) {
		return this.send(uri, "post", body);
	}

	put(uri, body = null) {
		return this.send(uri, "put", body);
	}

	delete(uri) {
		return this.send(uri, "delete");
	}
}
