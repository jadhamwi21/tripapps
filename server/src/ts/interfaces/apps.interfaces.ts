export interface IApp {
	id: string;
	name: string;
	link: string;
	image: string;
	keywords: string[];
}

export interface IAppReview {
	score: number;
	review: string;
	date: number;
}
