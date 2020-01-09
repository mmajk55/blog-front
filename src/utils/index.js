import history from '../history';

export const redirectTo = (location = '/') => {
    console.log(history);
    history.push(location);
};
