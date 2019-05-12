import { actions as spotifyActions } from '../spotify/redux'

const allActions = {
    ...spotifyActions
};

type ActionMap = typeof allActions;
type ActionCreator = typeof allActions[keyof ActionMap];
type InferActionFromCreator<T> = T extends (...args: any[]) => infer T ? T : any;
export type RootAction = InferActionFromCreator<ActionCreator>;