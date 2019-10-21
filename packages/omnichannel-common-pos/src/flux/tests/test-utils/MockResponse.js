class MockResponse {
	constructor(flux) {
		this.axios = flux.axios;
	}

	interceptWithData(data) {
		this.createInterceptors(data);
	}

	interceptWithError500() {
		this.createInterceptors({ message: "Error message." }, 500);
	}

	rejectInterceptors() {
		this.axios.interceptors.request.eject(this.reqIntercept);
		this.axios.interceptors.response.eject(this.respIntercept);
	}

	createInterceptors(data = {}, status = 200, headers = {}) {
		this.reqIntercept = this.axios.interceptors.request.use(config => {
			console.log("::AXIOS INTERCEPT FROM MockResponse::\n", config.url);
			config.url = "http://localhost/intercept-" + config.url;
			return config;
		});

		this.respIntercept = this.axios.interceptors.response.use(
			response => {
				return response;
			},
			error => {
				// return a promise mocking an async request
				return Promise.resolve({
					status,
					// return the mock data for the test in the response
					data,
					headers,
					config: error.config
				});
			}
		);
	}
}

export default MockResponse;
