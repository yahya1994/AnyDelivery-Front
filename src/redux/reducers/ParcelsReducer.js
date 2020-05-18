
const INITIAL_STATE = {
    items: [],
    item: [],
    Loading: true,
    Last_page:0

};
export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case 'FETCH_PARCELS':
            console.log(action.payload.items.length)
            return {
                ...state, items:  action.payload.items ,
                Loading: false , Last_page :  action.payload.last_page
            };
            case 'FETCH_PARCEL':
                console.log(action.payload.items.length)
                console.log(action.payload.last_page)
                return {
                    ...state, item:  action.payload.items ,
                    Loading: false, Last_page :  action.payload.last_page
                };
        case 'FETCH_MORE_PARCELS':
            console.log([...state.items, ...action.payload.items].length)
            return {
                ...state, items: [...state.items, ...action.payload.items],
                Loading: false, Last_page :  action.payload.last_page
            };

        case 'FETCH_DATA_ATTEMPT':
            return { ...state, Loading: true }

        default:
            return state;

    }


}; 