import * as types from './mutation-types'
const mutations = {
    [types.ADD_VISITED_VIEWS] (state, view) {
       state.visitedViews=view;
    }
}
export default mutations