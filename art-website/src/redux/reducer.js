const initState = {
    cart: [
        { id: 1, name: 'Bon Vivant Collection', price: '27' },
        { id: 2, name: 'Bon Vivant ', price: '28' },
        { id: 3, name: 'Bon ', price: '29' },
    ],
};

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'card/addCart':
            return {
                ...state,
                cart: [...state.cart, { id: 4, name: 'Bon 5 ', price: '30' }],
            };

        default:
            return state;
    }
};

export default rootReducer;
