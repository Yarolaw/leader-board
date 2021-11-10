/* eslint-disable no-multi-assign */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IFetchLeaders, ILeader, ILeadersBoard } from '../core/interfaces';
import Nicola from '../images/mini-nicola.png';

export const leadersArr = [
	{
		id: String(nanoid()),
		avatar: Nicola,
		score: 245,
		name: 'Nicola Greaves',
	},
	{
		id: String(nanoid()),
		avatar: Nicola,
		score: 225,
		name: 'Alana Hall',
	},
	{
		id: String(nanoid()),
		avatar: Nicola,
		score: 225,
		name: 'Simon Malone',
	},
	{
		id: String(nanoid()),
		avatar: Nicola,
		score: 225,
		name: 'Aisla Pindoria',
	},
	{
		id: String(nanoid()),
		avatar: Nicola,
		score: 225,
		name: 'Ron Santos',
	},
	{
		id: String(nanoid()),
		avatar: Nicola,
		score: 225,
		name: 'Joana Carrol',
	},
	{
		id: String(nanoid()),
		avatar: Nicola,
		score: 225,
		name: 'Chrissy Pine',
	},
];

const baseUrl = (axios.defaults.baseURL = 'http://coding-test.cube19.io/frontend/v1');

export const getLeaders = createAsyncThunk('leaders/getLeaders', async (): Promise<Array<ILeader>> => {
	const response: { data: Array<IFetchLeaders> } = await axios.get(`${baseUrl}/starting-state`);

	const editResponse = response.data.map(el => ({ ...el, score: el.score || 0, id: nanoid(), avatar: Nicola }));
	return editResponse;
});

type AddLeaderRequest = {
	name: string;
	score: number;
};

type AddLeaderResponse = {
	displayName: string;
	score: number;
};

export const addNewLeader = createAsyncThunk(
	'leaders/addNewLeader',
	async (body: AddLeaderRequest): Promise<AddLeaderResponse> => {
		const { name, score } = body;
		const response = await axios.post(`${baseUrl}/process-user`, { username: name });

		return {
			displayName: response.data['display-name'],
			score,
		};
	}
);

export const initialState: ILeadersBoard = {
	leadersBoard: leadersArr,
	bestLeaders: [],
	name: '',
	score: 0,
};

export const LeadersSlice = createSlice({
	name: 'leaders',
	initialState,
	reducers: {
		editOneLeader: (state, action) => {
			const { openEdit, newName, newScore } = action.payload;
			state.leadersBoard = [
				...state.leadersBoard.map((item, index) =>
					index === openEdit ? { ...item, name: newName, score: newScore } : item
				),
			];
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getLeaders.fulfilled, (state, action: PayloadAction<Array<ILeader>>) => {
				state.leadersBoard = action.payload;
				state.leadersBoard = state.leadersBoard.sort((a, b) => (a.score > b.score ? -1 : b.score > a.score ? 1 : 0));
				state.bestLeaders = [...state.leadersBoard];
				state.bestLeaders.length = 4;
			})
			.addCase(addNewLeader.fulfilled, (state, action: PayloadAction<AddLeaderResponse>) => {
				const { score, displayName } = action.payload;
				state.leadersBoard = [
					...state.leadersBoard,
					{ id: String(nanoid()), avatar: Nicola, score, name: displayName },
				];
			});
	},
});
