import search from "../../assets/search.svg";
import edit from "../../assets/edit.svg";
import trash from "../../assets/trash.svg";
import save from "../../assets/save.svg";
import "./style.scss";
import clsx from "clsx";

type IconProps = {
	name: string;
	count?: number;
	size?: "small" | "medium" | "normal" | "large";
	onClick?: () => void;
};
const getSVG = (name: string) => {
	let src = "";
	switch (name) {
		case "edit":
			src = edit;
			break;
		case "delete":
			src = trash;
			break;
		case "search":
			src = search;
			break;
		case "save":
			src = save;
			break;
		default:
			break;
	}

	return src;
};

const Icon = ({ name, count, size = "normal", onClick }: IconProps) => {
	return (
		<div className={clsx("flex-center-center icon", size)}>
			<div className={clsx("icon_img ", size)}>
				<img src={getSVG(name)} alt={`${name} logo`} onClick={onClick} />
			</div>
			{!!count && (
				<div className="icon_count">
					<p>{count}</p>
				</div>
			)}
		</div>
	);
};

export default Icon;
