import { Resource } from '@functions/interfaces'
export enum ActionKind {
    Checkin = 'CHECKIN',
    Checkout = 'CHECKOUT',
    Load = 'LOAD'
}
type Action = {
    type: ActionKind
    payload: number
    index: number
    retrievedState?: Resource[]
}
export const initialState: Resource[] | null = [
    {
        _id: { $oid: '' },
        available_resources: 0,
        capacity: 0,
        price: 0,
        title: ''
    }
]
export function ResourcesReducer(
    state: Resource[],
    action: Action
): Resource[] {
    const { type, payload, index } = action
    let currentState = [...state]
    switch (type) {
        case ActionKind.Checkin:
            // Shallow Copy Method: https://stackoverflow.com/questions/29537299/react-how-to-update-state-item1-in-state-using-setstate
            currentState[index].available_resources += payload
            return currentState
        case ActionKind.Checkout:
            currentState[index].available_resources -= payload
            return currentState
        case ActionKind.Load:
            const { retrievedState } = action
            return retrievedState
        default:
            return state
    }
}
