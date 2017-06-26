let mockApiData = [
    {
        id: 1,
        name: 'Enter fdfds'
    },
    {
        id: 2,
        name: 'Enter fsdffsdf'
    },
    {
        id: 3,
        name: 'Enter fdfddsafsdfsdfss'
    },
    {
        id: 4,
        name: 'Enter 12efdsac'
    },
];


export const getTracks = () => dispatch => {
        setTimeout(() => {
            console.log('i got tracks');
            dispatch({type: 'FETCH_TRACKS_SUCCESS', payload: mockApiData})
        }, 2000)
};