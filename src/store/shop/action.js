import * as types from './mutation-types'
const actions={
  addVisitedViews: ({commit}, view) => {
      commit(types.ADD_VISITED_VIEWS, view)
  }
}
export default actions;
