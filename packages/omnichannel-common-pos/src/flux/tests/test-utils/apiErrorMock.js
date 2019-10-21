import { ErrorContainer } from "../../../redux";

const MOCKED_ERROR_STATUS = "test";

const getErrorActions = flux => flux.getActions("ErrorActions");

function mockApiCallResponse(APIcall) {
	const responseMock = ErrorContainer.composeErrorContainerWithSingleError(
		MOCKED_ERROR_STATUS
	);
	APIcall.rejects(responseMock);
}

export function setUpBaseActionOnErrorMock(flux, APIcall) {
	getErrorActions(flux).showErrorModal = jest.fn();
	mockApiCallResponse(APIcall);
}

export function expectErrorHandled(flux) {
	expect(getErrorActions(flux).showErrorModal).toHaveBeenCalledWith(
		expect.objectContaining({ status: MOCKED_ERROR_STATUS })
	);
}
