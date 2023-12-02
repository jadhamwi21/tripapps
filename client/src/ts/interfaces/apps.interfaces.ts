export interface IAppReview {
	personName: string;
	review: string;
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
