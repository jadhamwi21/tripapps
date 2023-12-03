export interface IAppReview {
	date: number;
	review: string;
	score: number;
}

export interface IApp {
	id: string;
	name: string;
	link: string;
	image: string;
	keywords: string[];
	reviews: IAppReview[];
	score: number;
}
