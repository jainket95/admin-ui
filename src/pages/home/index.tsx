import { useEffect, useState } from "react";
import Search from "../../components/search";
import Table from "../../components/table";
import Footer from "../../components/footer";
import { Page, Row, UserResponse, Rows } from "../../types";

const perPageRows = 10;

const initialPageState: Page = {
	pageData: [],
	page: 1,
	start: 0,
	end: perPageRows,
};

const Home = () => {
	const [rows, setRows] = useState<Rows>([]);
	const [page, setPage] = useState(initialPageState);

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		const response = await fetch(
			"https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
		);
		const res = await response.json();

		const data = res.map((item: UserResponse) => ({
			// id: `${item.name}-${item.id}`,
			id: `${item.id}`,
			user: {
				userItem: item,
				userData: [...Object.values(item), "actions"],
			},
			isChecked: false,
			isEditing: false,
		}));

		setRows(data);
		setPage({
			...initialPageState,
			pageData: data.slice(initialPageState.start, initialPageState.end),
		});
	};

	const totalPages = () => {
		const totalUsers = rows.length;
		const totalPages = Math.ceil(totalUsers / perPageRows);
		return totalPages;
	};

	const handleSearch = (text: string) => {
		const searchRelatedProducts = [];

		for (const row of rows) {
			for (const value of row.user.userData) {
				if (String(value).toLowerCase().includes(text.toLowerCase()))
					searchRelatedProducts.push(row);
			}
		}

		setPage({ ...page, pageData: [...searchRelatedProducts] });
	};

	const handleDeleteRow = (id: string) => {
		const rowsData = rows.filter((row) => row.id !== id);

		setRows([...rowsData]);
		setPage({
			...page,
			pageData: rowsData.slice(page.start, page.end),
		});
	};

	const handleEditRow = (id: string, userData: object) => {
		const rowsData = rows
			.map((row: Row) => {
				if (row.id === id) {
					if (row.isEditing && Object.keys(userData).length > 0) {
						return {
							...row,
							isEditing: !row.isEditing,
							user: {
								...row.user,
								userItem: { ...row.user.userItem, ...userData },
							},
						};
					}
					return {
						...row,
						isEditing: !row.isEditing,
					};
				}

				return row;
			})
			.map((row: Row) => ({
				...row,
				user: {
					...row.user,
					userData: [...Object.values(row.user.userItem), "actions"],
				},
			}));

		setRows(rowsData);
		setPage({
			...page,
			pageData: rowsData.slice(page.start, page.end),
		});
	};

	const handleDeleteSelected = () => {
		const rowsData = rows.filter((row) => !row.isChecked);

		setRows(() => [...rowsData]);

		if (rows.length === perPageRows) {
			if (page.page === totalPages()) return;
			setPage({
				...page,
				start: page.start + perPageRows,
				end: page.end + perPageRows,
				pageData: rowsData.slice(
					page.start + perPageRows,
					page.end + perPageRows
				),
			});
			return;
		}

		setPage(() => {
			return {
				...page,
				pageData: rowsData.slice(page.start, page.end),
			};
		});
	};

	const handleCheckedRow = (id: string) => {
		const rowsData = rows.map((row) => {
			if (row.id === id) return { ...row, isChecked: !row.isChecked };
			return row;
		});

		setRows([...rowsData]);
		setPage({
			...page,
			pageData: rowsData.slice(page.start, page.end),
		});
	};

	const checkAllRow = (isChecked: boolean) => {
		const rowsData = rows.map((row, i) => {
			if (i + 1 <= page.end) {
				return { ...row, isChecked };
			}
			return row;
		});

		setRows(() => [...rowsData]);

		setPage(() => {
			return {
				...page,
				pageData: rowsData.slice(page.start, page.end),
			};
		});
	};

	const handlePageChange = (type: number | string) => {
		if (typeof type === "string") {
			switch (type) {
				case "first":
					setPage({
						...initialPageState,
						pageData: rows.slice(initialPageState.start, initialPageState.end),
					});
					return;
				case "prev":
					if (page.page === 1) return;

					setPage({
						pageData: rows.slice(
							page.start - perPageRows,
							page.end - perPageRows
						),
						page: page.page - 1,
						start: page.start - perPageRows,
						end: page.end - perPageRows,
					});
					return;
				case "next":
					if (page.page === totalPages()) return;
					setPage({
						pageData: rows.slice(
							page.start + perPageRows,
							page.end + perPageRows
						),
						page: page.page + 1,
						start: page.start + perPageRows,
						end: page.end + perPageRows,
					});
					return;
				case "last":
					{
						const start = perPageRows * (totalPages() - 1);
						setPage({
							pageData: rows.slice(
								start,
								start + rows.slice(start, rows.length).length
							),
							page: totalPages(),
							start,
							end: start + rows.slice(start, rows.length).length,
						});
					}
					return;
				default:
					return;
			}
		} else if (typeof type === "number") {
			setPage({
				pageData: rows.slice(perPageRows * (type - 1), perPageRows * type),
				page: type,
				start: perPageRows * (type - 1),
				end: perPageRows * type,
			});
		}
	};

	return (
		<>
			<Search handleSearch={handleSearch} />
			<Table
				rows={page.pageData}
				handleDeleteRow={handleDeleteRow}
				handleEditRow={handleEditRow}
				handleCheckedRow={handleCheckedRow}
				checkAllRow={checkAllRow}
			/>
			<Footer
				page={page.page}
				totalPages={totalPages()}
				handleDeleteSelected={handleDeleteSelected}
				handlePageChange={handlePageChange}
			/>
		</>
	);
};

export default Home;
