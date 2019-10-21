import cssns from "../../utils/cssnsConfig";
import { clamp } from "lodash";
import classnames from "classnames";
import { PureComponent } from "react";
import { CommonCustomizationPoints, withCustomization } from "../../customization";

const { React } = cssns("UsageDonut");

interface UsageDonutProps {
    percentage?: number | undefined;
    primaryText?: string;
    secondaryText?: string;
    icon?: string;
    iconSeries?: string;
    iconPlacement?: string;
    title?: string;
	isUnlimited?: boolean;
	serviceUnitTypeText?: string;
}

class UsageDonut extends PureComponent<UsageDonutProps> {

    radius = 19;
    circumference = this.radius * 2 * Math.PI;                  // dashes are calculated in distances along the stroke
    size = 42;
    origin = this.size / 2;
    endGap = this.circumference * .15;                          // gap between dash end points
    dashOffset = -(this.circumference * .25) - this.endGap / 2; // turn dash start point 90deg clockwise and center the end gap
    maxWidth = this.circumference - this.endGap;
    minWidth = 2;                                               // bump near-zero percentages up so the bar is still visible
    dangerThreshold = 10;
    trackDashArray = this.getDashArray(100);

    constructor(props: UsageDonutProps) {
        super(props);
    }

    getDashArray(pct: number | undefined, min: number = this.minWidth, max: number = this.maxWidth, circ: number = this.circumference): string {
        const length = typeof pct === "number" ? clamp(pct, min, 100) * max / 100 : 0;
        return length + " " + (circ - length);
    }

	getGradientConfigs() {
    	return (
			<linearGradient id="UsageDonut-gradient">
				<stop className="gradient-start" offset="15%"/>
				<stop className="gradient-end" offset="95%" />
			</linearGradient>
		);
	}

	renderAdditionalText() {
		return this.props.secondaryText && (
			<text
				x={this.origin}
				y={this.origin + 4.5}
				textAnchor="middle"
				className="text text-secondary"
			>
				{this.props.secondaryText}
			</text>
		);
	}

	renderIcon() {
    	const { icon, iconPlacement, iconSeries } = this.props;
		const getIconClassName = (series: string | undefined = iconSeries, placement: string | undefined = iconPlacement) => {
			return "icon" + (series ? " icon-" + series : "") + (placement ? " icon-" + placement : "");
		};
    	if (icon) {
    		return (
				<text
					x={this.origin}
					y={iconPlacement === "center" ? this.origin + 5 : this.size - 1.5}
					textAnchor="middle"
					className={getIconClassName()}
					dangerouslySetInnerHTML={{ __html: icon }}
				/>
			);
		}
		return;
	}

	getGraphClassName (pct: number | undefined, threshold: number = this.dangerThreshold): string {
		return typeof pct === "number" && pct > threshold ? "graph graph-default" : "graph graph-danger";
	}

	getUsageDonutClasses() {
    	return classnames({
			this: true,
			unlimited: this.props.isUnlimited
		});
	}

	render() {
        const {
            percentage,
            primaryText,
            secondaryText,
			serviceUnitTypeText,
            title,
			isUnlimited
        } = this.props;

        return (
            <svg width="100%" height="100%" viewBox={"0 0 " + this.size + " " + this.size} className={this.getUsageDonutClasses()}>
                {title && <title id="UsageDonut-title">{title}</title>}
                <defs>
					{this.getGradientConfigs()}
                </defs>
                <circle
                    className="track"
                    cx={this.origin}
                    cy={this.origin}
                    r={this.radius}
                    strokeDasharray={this.trackDashArray}
                    strokeDashoffset={this.dashOffset}
                />
                <circle
                    className={this.getGraphClassName(percentage)}
                    cx={this.origin}
                    cy={this.origin}
                    r={this.radius}
                    strokeDasharray={this.getDashArray(this.props.percentage || 0)}
                    strokeDashoffset={this.dashOffset}
                />
                {primaryText && (
                    <text
                        x={this.origin}
                        y={secondaryText || serviceUnitTypeText ? this.origin : this.origin + 1.75}
                        textAnchor="middle"
                        className="text text-primary"
                    >
                        {primaryText}
                    </text>
                )}
                {this.renderAdditionalText()}
				{this.renderIcon()}
            </svg>
        );
    }
}

export default withCustomization<UsageDonutProps>(
	CommonCustomizationPoints.USAGE_DONUT,
	UsageDonut
);

export {
	UsageDonutProps,
	UsageDonut as UsageDonutBaseline
};
