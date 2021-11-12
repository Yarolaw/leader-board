export interface ILeader {
	id: string;
	avatar: string;
	score: number;
	name: string;
}
export interface IFetchLeaders {
	name: string;
	score?: number;
}
export interface ILeadersBoard {
	currentDay: number;
	leadersBoard: ILeader[][];
	bestLeaders: ILeader[];
	name: string;
	score: number;
	error: string;
}
