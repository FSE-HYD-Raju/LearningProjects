import * as R from "react";
import * as classnames from "classnames";
import cssns from "../../../utils/cssnsConfig";
import { OcGridPaginationActions } from "./OcGridPaginationActions";
const React = cssns("OcGrid").React as typeof R;

interface OcGridPaginationProps extends OcGridPaginationActions {
	isFirst: boolean;
	isLast: boolean;
	currentPage: number;
	pagesCount: number;
}

const PLAIN_LIMIT = 6;
const MAX_OUT = 4;
const RANGE = 1;

const ActiveRange: React.FC<OcGridPaginationProps> = (props: OcGridPaginationProps) => {
	const { pagesCount, currentPage } = props;
	const pages = [];
	const currentPageIndex = currentPage;
	const maxPageIndex = pagesCount;
	let start = 1;
	let end = 0;

	if (maxPageIndex <= PLAIN_LIMIT) {
		end = maxPageIndex;
	} else if (currentPageIndex < MAX_OUT) {
		start = 1;
		end = MAX_OUT;
	} else if (currentPageIndex > maxPageIndex - MAX_OUT) {
		start = maxPageIndex - MAX_OUT;
		end = maxPageIndex;
	} else {
		start = currentPageIndex - RANGE;
		end = currentPageIndex + RANGE;
	}

	for (let index = start; index <= end; index++) {
		const linkClasses = classnames({
			"=page-item": true,
			active: index === currentPageIndex,
		});
		const btnClasses = classnames({
			"=page-link": true,
			active: index === currentPageIndex,
		});
		pages.push(
			<li className={linkClasses} key={`page-item-${index}`}>
				<button
					type="button"
					id={`page-item-btn-${index}`}
					className={btnClasses}
					disabled={index === currentPageIndex}
					onClick={() => props.paginateToPage(index)}
				>
					{index}
				</button>
			</li>
		);
	}
	return <>{pages}</>;
};

const LeftDots: React.FC<OcGridPaginationProps> = (props: OcGridPaginationProps) => {
	const { currentPage, pagesCount } = props;
	return pagesCount > PLAIN_LIMIT && currentPage >= MAX_OUT ? (
		<>
			<li className="=page-item" key="page-item-left-before-dots">
				<button type="button" className="=page-link" onClick={props.paginateToFirstPage}>
					{1}
				</button>
			</li>
			<li className="=page-item disabled" key="page-item-left-dots" id="page-item-left-dots">
				<button type="button" disabled={true} className="=page-link">
					<i className="fa fa-ellipsis-h" />
				</button>
			</li>
		</>
	) : null;
};

const RightDots: React.FC<OcGridPaginationProps> = (props: OcGridPaginationProps) => {
	const { currentPage, pagesCount } = props;
	const currentPageIndex = currentPage;
	const maxPageIndex = pagesCount;
	return maxPageIndex > PLAIN_LIMIT && currentPageIndex <= maxPageIndex - MAX_OUT ? (
		<>
			<li className="=page-item disabled" key="page-item-right-dots" id="page-item-right-dots">
				<button type="button" disabled={true} className="=page-link">
					<i className="fa fa-ellipsis-h" />
				</button>
			</li>
			<li className="=page-item" key="page-item-right-after-dots">
				<button type="button" className="=page-link" onClick={props.paginateToLastPage}>
					{pagesCount}
				</button>
			</li>
		</>
	) : null;
};

const OcGridPagination: React.FC<OcGridPaginationProps> = (props: OcGridPaginationProps) => {
	const prevArrowClasses = classnames({ "=page-item": true, disabled: props.isFirst });
	const nextArrowClasses = classnames({ "=page-item": true, disabled: props.isLast });
	return (
		<nav aria-label="..." className="pagination-container">
			<ul className="=pagination">
				<li className={prevArrowClasses} key="page-item-prev">
					<button className="=page-link" type="button" id="page-item-prev-btn" disabled={props.isFirst} onClick={props.paginateToPrevPage}>
						<i className="fas fa-angle-left" />
					</button>
				</li>
				<LeftDots {...props} />
				<ActiveRange {...props} />
				<RightDots {...props} />
				<li className={nextArrowClasses} key="page-item-next">
					<button className="=page-link" type="button" id="page-item-next-btn" disabled={props.isLast} onClick={props.paginateToNextPage}>
						<i className="fas fa-angle-right" />
					</button>
				</li>
			</ul>
		</nav>
	);
};
export { OcGridPagination, OcGridPaginationProps };
