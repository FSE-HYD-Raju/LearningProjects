import cssns from "../../utils/cssnsConfig";
import classnames from "classnames";
const { React } = cssns("Grid");

export interface GridProps {
	children: any;
	aligned?: string;
}

const Grid: React.FC<GridProps> = (props: GridProps) => {
	const gridClasses = classnames({
		inner: true,
		leftAligned: props.aligned === "left"
	});
	return (
		<div className="container">
			<div className={gridClasses}>{props.children}</div>
		</div>
	);
};

export default Grid;
