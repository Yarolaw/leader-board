/* eslint-disable no-multi-assign */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import axios from 'core/interceptors';
import Nicola from 'images/mini-nicola.png';
import { IFetchLeaders, ILeader, ILeadersBoard } from 'core/interfaces';

const baseUrl = (axios.defaults.baseURL = 'http://coding-test.cube19.io/frontend/v1');

export const getLeaders = createAsyncThunk('leaders/getLeaders', async (): Promise<Array<ILeader>> => {
	const response: { data: Array<IFetchLeaders> } = await axios.get(`${baseUrl}/starting-state`);
	const editResponse = response.data.map(el => ({
		...el,
		score: el.score || 0,
		id: nanoid(),
		avatar: Nicola,
		changePosition: 0,
	}));
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
	currentDay: 0,
	leadersBoard: [],
	bestLeaders: [],
	name: '',
	score: 0,
	error: '',
};

export const LeadersSlice = createSlice({
	name: 'leaders',
	initialState,
	reducers: {
		editOneLeader: (state, action) => {
			const { userIndex, newName, newScore } = action.payload;
			state.leadersBoard = [
				...state.leadersBoard.map((item, index) => {
					if (index === state.currentDay)
						return item.map((el, itemUserIndex) => {
							return itemUserIndex === userIndex ? { ...el, name: newName, score: newScore } : el;
						});

					return item;
				}),
			];
		},
		prevDay: state => {
			state.currentDay -= 1;
		},
		nextDay: state => {
			state.currentDay += 1;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getLeaders.fulfilled, (state, action: PayloadAction<Array<ILeader>>) => {
				state.leadersBoard = [
					...state.leadersBoard,
					action.payload
						.sort((a, b) => (a.score > b.score ? -1 : b.score > a.score ? 1 : 0))
						.map((el, index) =>
							state.currentDay === 0
								? { ...el, changePosition: 0 }
								: {
										...el,
										changePosition:
											state.leadersBoard[state.currentDay - 1].findIndex(item => item.name === el.name) - index,
								  }
						),
				];
				state.bestLeaders = state.leadersBoard
					.flat()
					.sort((a, b) => (a.score > b.score ? -1 : b.score > a.score ? 1 : 0));
				state.bestLeaders.length = 4;
			})
			.addCase(addNewLeader.fulfilled, (state, action: PayloadAction<AddLeaderResponse>) => {
				const { score, displayName } = action.payload;
				state.leadersBoard = [
					...state.leadersBoard.map((data, day) =>
						day === state.currentDay
							? [...data, { id: String(nanoid()), avatar: Nicola, score, name: displayName, changePosition: 0 }]
							: data
					),
				];
			});
	},
});
