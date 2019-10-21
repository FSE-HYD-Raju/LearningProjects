import * as React from "react";
import { get } from "lodash";
import { ToastContainer, ToastMessageAnimated } from "react-toastr";
const ToastMessageFactory = React.createFactory(ToastMessageAnimated);

/**
 * Component can be used for showing toast messages for a user.
 *
 * Usage:
 *
 * 	<ToasterContainer />
 *
 * To show success message:
 *
 * this.context.flux.reduxStore.dispatch(actions.toaster.showSuccess("Hello"));
 *
 * Other messages types are showError, showInfo and showWarning
 */

type ToasterCssClass =  "toast-top-center" | "toast-bottom-center" | "toast-top-full-width" | "toast-bottom-full-width" |
	"toast-top-left" | "toast-top-right" | "toast-bottom-right" | "toast-bottom-left";

interface ToasterOwnProps {
	cssClass?: ToasterCssClass;
	options?: Record<string, any>;
}

interface ToasterStateProps {
	success?: React.ReactNode;
	error?: React.ReactNode;
	info?: React.ReactNode;
	warning?: React.ReactNode;
}

interface ToasterActionProps {
	actions: {
		clearMessages: () => void;
	};
}

type ToasterProps = ToasterOwnProps & ToasterActionProps & ToasterStateProps;

const defaultToasterProps: Partial<ToasterProps> = {
	cssClass: "toast-bottom-left",
	options: {
		timeOut: 10000,
		extendedTimeOut: 10000,
		closeButton: true
	},
};

class Toaster extends React.Component<ToasterProps> {

	static defaultProps: Partial<ToasterProps> = defaultToasterProps;

	container: ToastContainer | undefined;

	shouldComponentUpdate(nextProps: ToasterProps) {
		return (!!nextProps.success || !!nextProps.error || !!nextProps.warning || !!nextProps.info);
	}

	componentWillUpdate(nextProps: ToasterProps) {
		const { success, error, info, warning } = this.props;

		if (nextProps.success && nextProps.success !== success) {
			this.success(nextProps.success);
		} else if (nextProps.error && nextProps.error !== error) {
			this.error(nextProps.error);
		} else if (nextProps.info && nextProps.info !== info) {
			this.info(nextProps.info);
		} else if (nextProps.warning && nextProps.warning !== warning) {
			this.warning(nextProps.warning);
		}
	}

	componentDidUpdate() {
		this.props.actions.clearMessages();
	}

	success = (message: React.ReactNode = "", title: React.ReactNode = "") => {
		this.container!.success(message, title, this.props.options);
	};

	error = (message: React.ReactNode, title: React.ReactNode = "") => {
		if (this.shouldShowMessage(message, "error")) {
			this.container!.error(message, title, this.props.options);
		}
	};

	/**
	 * Check duplicates
	 */
	shouldShowMessage = (message: React.ReactNode, messageType: string) => {
		const previousMessages: Record<string, any> = get(this, "refs.container.toastMessageRefs");
		let isDuplicate = false;

		if (previousMessages) {
			isDuplicate = Object.keys(previousMessages)
				.reduce<Array<any>>((acc, key) => {
					if (get(previousMessages[key], "props.type") === messageType) {
						const msg = get(previousMessages[key], "props.message");

						if (msg) {
							acc.push(msg);
						}
					}
					return acc;
				}, [])
				.includes(message);
		}
		return !isDuplicate;
	};

	info = (message: React.ReactNode, title: React.ReactNode = "") => {
		if (this.shouldShowMessage(message, "info")) {
			this.container!.info(message, title, this.props.options);
		}
	};

	warning = (message: React.ReactNode, title: React.ReactNode = "") => {
		if (this.shouldShowMessage(message, "warning")) {
			this.container!.warning(message, title, this.props.options);
		}
	};

	setContainerRef = (container: any) => {
		this.container = container;
	};

	render() {
		return (
			<ToastContainer
				ref={this.setContainerRef}
				toastMessageFactory={ToastMessageFactory}
				className={this.props.cssClass}
			/>
		);
	}
}

export default Toaster;
export {
	ToasterProps,
	ToasterStateProps,
	ToasterActionProps,
	ToasterOwnProps,
	ToasterCssClass
};
