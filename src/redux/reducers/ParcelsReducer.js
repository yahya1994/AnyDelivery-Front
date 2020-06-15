
const INITIAL_STATE = {
    items: [],
    item: [],
    Loading: true,
    Last_page: 0,
    current_page: 0, success: null,modal:null

};
export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case 'FETCH_PARCELS':
            console.log('1 :' + action.payload.items.length)
            console.log('pagenumber :' + action.payload.current_page)
            return {
                ...state, items: action.payload.items,
                Loading: false, Last_page: action.payload.last_page
                , current_page: action.payload.current_page
            };
        case 'FETCH_MORE_PARCELS':
            console.log('4 : ' + [...state.items, ...action.payload.items].length)
            console.log('pagenumber :' + action.payload.current_page)

            return {
                ...state, items: [...state.items, ...action.payload.items],
                Loading: false, Last_page: action.payload.last_page
                , current_page: action.payload.current_page
            };
        case 'FETCH_TAKEN_PARCEL':
            console.log('2 FETCH_TAKEN_PARCEL :' + action.payload.items.length)
            console.log('3 FETCH_TAKEN_PARCEL:' + action.payload.last_page)
            return {
                ...state, item: action.payload.items,
                Loading: false, Last_page: action.payload.last_page
                , current_page: action.payload.current_page
            };
        case 'FETCH_MORE_TAKEN_PARCELS':
            console.log('5FETCH_MORE_TAKEN_PARCELS : ' + [...state.items, ...action.payload.items].length)
            return {
                ...state, item: [...state.item, ...action.payload.items],
                Loading: false, Last_page: action.payload.last_page
                , current_page: action.payload.current_page
            };

        case 'CREATE_PARCEL':
            console.log('6:+' + action.payload.items.date)
        //  return { ...state, items: action.payload.items }
        case 'FETCH_DATA_ATTEMPT':
            return { ...state, Loading: true }
        case 'CHOSE_PARCEL_FAIL':
            return { ...state, success: action.payload.success, message: action.payload.message, modal:true  }
            case 'HIDE_MODAL':
                return { ...state, modal: false, message: '' };
                case 'LOGOUT':
                    return { ...state, items: [] };
        default:
            return state;

    }


}; 