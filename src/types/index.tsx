export type UserResponse = {
	id: string;
	name: string;
	string: string;
	role: string;
};

type UserDetails = {
	userData: (string | number)[];
	userItem: object;
};

export type Row = {
	id: string;
	user: UserDetails;
	isChecked: boolean;
	isEditing: boolean;
};

export type Rows = Row[];

export type Page = {
	pageData: Rows;
	page: number;
	start: number;
	end: number;
};
