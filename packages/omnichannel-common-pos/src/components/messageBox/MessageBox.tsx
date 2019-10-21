import cssns from "../../utils/cssnsConfig";
import { FC, ReactNode } from "react";

const { React } = cssns("MessageBox");

interface MessageBoxProps {
	title?: ReactNode;
	boxType: "pos" | "b2c";
	message: ReactNode;
}

const MessageBox: FC<MessageBoxProps> = (props: MessageBoxProps) => {
	return (
		<div className="this">
			{props.title &&
				<h1 className={props.boxType}>{props.title}</h1>
			}
			<div className="message-container">
				<h2 className={props.boxType}>{props.message}</h2>
			</div>
		</div>
	);
};

export default MessageBox;
export {
	MessageBoxProps
};
