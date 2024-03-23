import { ChangeEvent, useEffect, useState } from "react";
import { v4 } from "uuid";

type CheckboxProps = {
	isChecked: boolean;
	text: string;
	checkAllRow?: (isChecked: boolean) => void;
	handleCheckedRow?: (id: string) => void;
};

const Checkbox = ({
	isChecked,
	text,
	handleCheckedRow,
	checkAllRow,
}: CheckboxProps) => {
	const [isBoxChecked, setIsBoxChecked] = useState(isChecked);
	const [forceUpdate, setForceUpdate] = useState(v4());

	useEffect(() => {
		setIsBoxChecked(isChecked);
	}, [isChecked, setIsBoxChecked]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setIsBoxChecked(!isBoxChecked);
		setForceUpdate(v4());
		if (text === "selectAll" && checkAllRow) {
			checkAllRow(!isBoxChecked);
			return;
		}
		if (handleCheckedRow) handleCheckedRow(text);
	};

	return (
		<div className="checkbox">
			<label htmlFor={String(text)} className="flex-start-center">
				<input
					id={String(text)}
					type="checkbox"
					name={String(text)}
					checked={isBoxChecked}
					onChange={handleChange}
					key={forceUpdate}
				/>
			</label>
		</div>
	);
};

export default Checkbox;
