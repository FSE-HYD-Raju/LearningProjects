import { cssns, Flex, FormattedMessage } from "omnichannel-common-pos";
import { Link } from "react-router-dom";
import messages from "../../index.messages";

const { React } = cssns("CustomerDetailsView");

const CustomerDetailsLegalDocumentsView = () => {
	const documents = {
		driversLicence: {
			name: "Scanned_ID_document.jpg",
			src: "#drivers-licence"
		},
		contract: {
			name: "Prepaid_silver_Contract.pdf",
			src: "#contract"
		}
	};
	return (
		<div>
			<h5>
				<FormattedMessage {...messages.legalDocuments} />{" "}
				{` (dummy data)`}
			</h5>
			<Flex
				className="subDetails-field customerDetailsLegalDocuments-field"
				direction="row"
			>
				<div className="subDetails-field-name">
					<FormattedMessage {...messages.driversLicence} />
				</div>
				<div>
					<Flex direction="column">
						<Link
							to={{
								pathname: "/servicedesk/customer/documents",
								hash: documents.driversLicence.src
							}}
						>
							{documents.driversLicence.name}
						</Link>
						<Flex
							direction="row"
							justifyContent="between"
							className="subDetails-actions"
						>
							<Link
								to={{
									pathname: "/servicedesk/customer/documents",
									hash: "#driver-licence-print"
								}}
							>
								<FormattedMessage {...messages.print} />
							</Link>
							<Link
								to={{
									pathname: "/servicedesk/customer/documents",
									hash: "#driver-licence-replace"
								}}
							>
								<FormattedMessage {...messages.replace} />
							</Link>
							<Link
								to={{
									pathname: "/servicedesk/customer/documents",
									hash: "#driver-licence-remove"
								}}
							>
								<FormattedMessage {...messages.remove} />
							</Link>
						</Flex>
					</Flex>
				</div>
			</Flex>
			<Flex
				className="subDetails-field customerDetailsLegalDocuments-field"
				direction="row"
			>
				<div className="subDetails-field-name">
					<FormattedMessage {...messages.contract} />
				</div>
				<div>
					<Flex direction="column">
						<Link
							to={{
								pathname: "/servicedesk/customer/documents",
								hash: documents.contract.src
							}}
						>
							{documents.contract.name}
						</Link>
						<Flex
							direction="row"
							justifyContent="between"
							className="subDetails-actions"
						>
							<Link
								to={{
									pathname:
										"/servicedesk/customer/documents/",
									hash: "#contract-print"
								}}
							>
								<FormattedMessage {...messages.print} />
							</Link>
							<Link
								to={{
									pathname: "/servicedesk/customer/documents",
									hash: "#contract-replace"
								}}
							>
								<FormattedMessage {...messages.replace} />
							</Link>
							<Link
								to={{
									pathname: "/servicedesk/customer/documents",
									hash: "#contract-remove"
								}}
							>
								<FormattedMessage {...messages.remove} />
							</Link>
						</Flex>
					</Flex>
				</div>
			</Flex>
		</div>
	);
};

export default CustomerDetailsLegalDocumentsView;
