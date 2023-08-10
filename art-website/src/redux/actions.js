export const addCart = (data) => {
    return {
        type: 'cart/addCart',
        payload: data,
    };
};
