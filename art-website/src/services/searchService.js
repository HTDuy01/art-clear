import * as httpRequest from '~/utils/httpRequest';

export const search = async (picture_name) => {
    try {
        const res = await httpRequest.get('searchImage', {
            params: {
                picture_name,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
