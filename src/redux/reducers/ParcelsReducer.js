
const INITIAL_STATE = {
    items: [],
    oldItems: [],
    Loading: true,

};
export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case 'FETCH_PARCELS':
            console.log(action.payload.items.length)
            return {
                ...state, items:  action.payload.items ,
                Loading: false
            };
        case 'FETCH_MORE_PARCELS':
            console.log([...state.items, ...action.payload.items].length)
            return {
                ...state, items: [...state.items, ...action.payload.items],
                Loading: false
            };

        case 'FETCH_DATA_ATTEMPT':
            return { ...state, Loading: true }

        default:
            return state;

    }


}; 