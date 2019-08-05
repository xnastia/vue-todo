import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    taskList: []
  },
  mutations: {
    setTasks (state, tasks) {
      state.taskList = tasks
    },
    addTask (state, task) {
      state.taskList.push(task)
      const json_data = state.taskList.map(task => ({ title: task.title, priority: task.priority, description: task.description, deadline: task.deadline }))
      localStorage.setItem('task_list', JSON.stringify(json_data))
    },
    removeTask (state, index) {
      state.taskList.splice(index, 1)
      const json_data = state.taskList.map(task => ({ title: task.title, priority: task.priority, description: task.description, deadline: task.deadline }))
      localStorage.setItem('task_list', JSON.stringify(json_data))
    }
  },
  getters: {
    isTaskListEmpty: state => {
      return state.taskList.length == 0
    }
  },
  actions: {
    loadTasks (store) {
      const json_data = localStorage.getItem('task_list')
      if (json_data) {
        store.commit('setTasks', JSON.parse(json_data))
      }
    }
  }
})
