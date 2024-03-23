import { KeyboardEvent, useState } from "react";
import "./style.scss";
import Icon from "../Icon";

type SearchBarProps = {
	handleSearch: (text: string) => void;
};

const SearchBar = ({ handleSearch }: SearchBarProps) => {
	const [searchText, setSearchText] = useState("");

	const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			if (searchText.length < 3) return;
			handleSearch(searchText);
			setSearchText("");
		}
	};

	return (
		<div className="search">
			<Icon size="small" name="search" />
			<input
				type="text"
				value={searchText}
				onChange={(e) => setSearchText(e.target.value)}
				onKeyUp={handleKeyUp}
				placeholder="Search for products...."
			/>
		</div>
	);
};

export default SearchBar;
