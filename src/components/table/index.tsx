import TableHeader from "./tableHeader";
import TableRow from "./tableRow";
import "./style.scss";
import { Rows } from "../../types";

type TableProps = {
	rows: Rows;
	handleDeleteRow: (id: string) => void;
	handleEditRow: (id: string, userData: object) => void;
	handleCheckedRow: (id: string) => void;
	checkAllRow: (isChecked: boolean) => void;
};

const Table = ({
	rows,
	handleDeleteRow,
	handleEditRow,
	handleCheckedRow,
	checkAllRow,
}: TableProps) => {
	return (
		<>
			<table>
				<TableHeader checkAllRow={checkAllRow} />
				<TableRow
					rows={rows}
					handleDeleteRow={handleDeleteRow}
					handleEditRow={handleEditRow}
					handleCheckedRow={handleCheckedRow}
				/>
			</table>
		</>
	);
};

export default Table;
