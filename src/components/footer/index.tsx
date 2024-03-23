import Pagination from "../pagination";
import "./style.scss";

type FooterProps = {
	page: number;
	totalPages: number;
	handleDeleteSelected: () => void;
	handlePageChange: (type: number | string) => void;
};

const Footer = ({
	page,
	totalPages,
	handleDeleteSelected,
	handlePageChange,
}: FooterProps) => {
	return (
		<div className="footer flex-start-center">
			<button onClick={handleDeleteSelected}>Delete Selected</button>

			<Pagination
				page={page}
				handlePageChange={handlePageChange}
				totalPages={totalPages}
			/>
		</div>
	);
};

export default Footer;
