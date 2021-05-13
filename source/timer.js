let time = 0;
export default {
    add: t => time += t,
    get: () => {
        const tmp = time + 0;
        time = 0;
        return tmp;
    }
};