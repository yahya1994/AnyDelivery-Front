
const INITIAL_STATE = {
    items: [],
    item: [],
    Loading: true,
    Last_page: 0

};
export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case 'FETCH_PARCELS':
            console.log('1 :' + action.payload.items.length)
            return {
                ...state, items: action.payload.items,
                Loading: false, Last_page: action.payload.last_page
            };
        case 'FETCH_PARCEL':
            console.log('2 :' + action.payload.items.length)
            console.log('3 :' + action.payload.last_page)
            return {
                ...state, item: action.payload.items,
                Loading: false, Last_page: action.payload.last_page
            };
        case 'FETCH_MORE_PARCELS':
            console.log('4 : ' + [...state.items, ...action.payload.items].length)
            return {
                ...state, items: [...state.items, ...action.payload.items],
                Loading: false, Last_page: action.payload.last_page
            };

        case 'CREATE_PARCEL':
            console.log('5:+'+action.payload.items)
            return { ...state, items: action.payload.items  }
        case 'FETCH_DATA_ATTEMPT':
            return { ...state, Loading: true }

        default:
            return state;

    }


}; 