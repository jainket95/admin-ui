import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Icon from "../../Icon";
import Checkbox from "../../checkbox";
import { Rows } from "../../../types";

type RowInputProps = {
	name: string;
	currentValue: string | number;
	updateUserData: (data: object) => void;
};

const RowInput = ({ name, currentValue, updateUserData }: RowInputProps) => {
	const [value, setValue] = useState(currentValue);

	useEffect(() => {
		updateUserData({ [name]: currentValue });
	}, [name, currentValue, updateUserData]);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		updateUserData({ [e.target.name]: e.target.value });
	};

	return (
		<td colSpan={3}>
			<input
				type="text"
				name={name}
				value={value}
				onChange={handleInputChange}
			/>
		</td>
	);
};

type TableRowProps = {
	rows: Rows;
	handleDeleteRow: (id: string) => void;
	handleEditRow: (id: string, userData: object) => void;
	handleCheckedRow: (id: string) => void;
};

const TableRow = ({
	rows,
	handleDeleteRow,
	handleEditRow,
	handleCheckedRow,
}: TableRowProps) => {
	const [userData, setUserData] = useState({
		name: "",
		email: "",
		role: "",
	});

	const getUserItem = (index: number) => {
		return index === 1 ? "name" : index === 2 ? "email" : "role";
	};

	const updateUserData = useCallback((data: object) => {
		setUserData((prevUserData) => ({ ...prevUserData, ...data }));
	}, []);

	const handleEdit = (id: string) => {
		handleEditRow(id, userData);
	};

	return (
		<>
			<tbody>
				{rows.map((row) => (
					<tr key={row.id}>
						<td colSpan={1}>
							<Checkbox
								isChecked={row.isChecked}
								text={row.id}
								handleCheckedRow={handleCheckedRow}
							/>
						</td>
						{row.user.userData.map((item, j) => {
							if (j === 0) return;
							if (item === "actions") {
								return (
									<td
										className="flex-sb-center"
										key={`action-${j}`}
										colSpan={6}>
										<button
											className={!row.isEditing ? "edit" : "save"}
											onClick={handleEdit.bind(null, row.id)}>
											<Icon
												size="small"
												name={!row.isEditing ? "edit" : "save"}
											/>
										</button>
										<button
											className="delete"
											onClick={handleDeleteRow.bind(null, row.id)}>
											<Icon size="small" name="delete" />
										</button>
									</td>
								);
							} else {
								if (row.isEditing) {
									return (
										<RowInput
											key={`${item}-${j}`}
											name={getUserItem(j)}
											currentValue={item}
											updateUserData={updateUserData}
										/>
									);
								} else {
									return (
										<td key={`${item}-${j}`} colSpan={3}>
											{item}
										</td>
									);
								}
							}
						})}
					</tr>
				))}
			</tbody>
		</>
	);
};

export default TableRow;
