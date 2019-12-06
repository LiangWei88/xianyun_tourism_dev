export const state = () => ({
    list: []
})

export const mutations = {
    addHistoryItem(state, data) {
        state.list.push(data);
        console.log(state);

    }
}