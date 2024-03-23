import { FC } from "react";
import Checkbox from "../../checkbox";

const tableHeader = ["name", "email", "role", "actions"];

type TableHeaderProps = {
	checkAllRow: (isChecked: boolean) => void;
};

const TableHeader: FC<TableHeaderProps> = ({ checkAllRow }) => {
	return (
		<>
			<thead>
				<tr>
					<th key="checkbox" colSpan={1}>
						<Checkbox
							isChecked={false}
							text="selectAll"
							checkAllRow={checkAllRow}
						/>
					</th>
					{tableHeader.map((item, j) => (
						<th key={`${item}-${j}`} colSpan={item === "actions" ? 6 : 3}>
							{item}
						</th>
					))}
				</tr>
			</thead>
		</>
	);
};

export default TableHeader;
