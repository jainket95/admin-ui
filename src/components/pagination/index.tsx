import clsx from "clsx";
import "./style.scss";

type PaginationProps = {
	page: number;
	totalPages: number;
	handlePageChange: (type: number | string) => void;
};

const Pagination = ({
	handlePageChange,
	totalPages,
	page,
}: PaginationProps) => {
	return (
		<div className="pagination flex-center-center">
			<div
				className="pagination_item flex-center-center"
				onClick={handlePageChange.bind(null, "first")}>
				{"<<"}
			</div>
			<div
				className="pagination_item flex-center-center"
				onClick={handlePageChange.bind(null, "prev")}>
				{"<"}
			</div>

			{Array.from({ length: totalPages }, (v, i) => i + 1).map((item, idx) => (
				<div
					className={clsx(
						"pagination_item flex-center-center",
						page === idx && "active"
					)}
					key={item}
					onClick={handlePageChange.bind(null, item)}>
					{item}
				</div>
			))}
			<div
				className="pagination_item flex-center-center"
				onClick={handlePageChange.bind(null, "next")}>
				{">"}
			</div>
			<div
				className="pagination_item flex-center-center"
				onClick={handlePageChange.bind(null, "last")}>
				{">>"}
			</div>
		</div>
	);
};

export default Pagination;
