<template>
  <div class="task-board-wrapper">
    <div>
      <div v-if="!this.$store.getters.isTaskListEmpty">
        <div class="task-board-header">
          <div><h2>Your tasks:</h2>
          </div>
          <div class="task-board-sort">
            <el-form>
              <el-col :span="5">
                <el-form-item>
                  <div class="selector">
                    <el-select
                      v-model="priority"
                      placeholder="Filter"
                      @change="selectTasksByPriority(priority)"
                    >
                      <el-option label="Low" value="Low"></el-option>
                      <el-option label="Medium" value="Medium"></el-option>
                      <el-option label="High" value="High"></el-option>
                    </el-select>
                  </div>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2"></el-col>
              <el-col :span="5">
                <el-form-item>
                  <div class="selector">
                    <el-select
                      v-model="order"
                      placeholder="Sort by"
                      @change="sortTasksByDeadline(order)"
                    >
                      <el-option label="Latest first" value="Latest first"></el-option>
                      <el-option label="Earliest first" value="Earliest first"></el-option>
                    </el-select>
                  </div>
                </el-form-item>
              </el-col>
            </el-form>
          </div>
        </div>
        <div>
          <draggable v-model="taskList" class="task-board" @start="drag=true" @end="drag=false">
            <div v-for="(task, index) in taskList" v-bind:key="index">
              <Task :task="task" :index="index"></Task>
            </div>
          </draggable>
        </div>
      </div>
      <div class="add-task-btn-wrapper">
        <el-button @click="$router.push('new-task')">
          <div class="btn-plus">&#43;</div>
          <div>Add new task</div>
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>

import Task from './Task.vue'
import draggable from 'vuedraggable'
export default {
  components: {
    Task,
    draggable
  },
  data () {
    return {
      priority: '',
      order: '',
      taskList: []
    }
  },

  methods: {
    setNotFilteredTaskList () {
      this.taskList = this.$store.state.taskList
    },

    selectTasksByPriority (priority) {
      this.setNotFilteredTaskList()
      this.taskList = this.taskList.filter(task => task.priority === priority)
    },

    compareTasksByDeadlineAsc (task1, task2) {
      let date1 = new Date(task1.deadline)
      let date2 = new Date(task2.deadline)
      if (date1 < date2) {
        return -1
      } else {
        if (date1 > date2) {
          return 1
        } else {
          return 0
        }
      }
    },

    compareTasksByDeadlineDesc (task1, task2) {
      return this.compareTasksByDeadlineAsc(task2, task1)
    },

    sortTasksByDeadline (order) {
      const sortfunc =
        order === 'Earliest first'
          ? this.compareTasksByDeadlineAsc
          : this.compareTasksByDeadlineDesc
      this.taskList = this.taskList.sort(sortfunc)
    }
  },

  mounted () {
    this.$store.dispatch('loadTasks')
    this.setNotFilteredTaskList()
  }
}
</script>

<style scoped>
.task-board-wrapper {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  overflow: auto;
}

button.el-button.el-button--default {
  border: none;
}

button.el-button.el-button--default:hover {
  color: #606266;
  background-color: white;
}

.add-task-btn-wrapper {
  padding-top:2vh;
}

.task-board-header {
  display: flex;
  justify-content: space-between;
  height: 40px;
}

.btn-plus {
  font-size: 25 px;
  font-weight: 600;
  padding-right: 10px;
  color: #43a1ff;
  position: relative;
  top: 12px;
  right: 45px;
}

.selector >>> .el-input__inner {
  color: black;
  border: none;
  font-weight: 600;
}

li {
  list-style-type: none;
}
ul {
  margin-left: 0;
  padding-left: 0;
}

.task-board-header{
  display: flex;
  justify-content: space-between;
  margin-bottom: 3vh;
}
.task-board-sort{
  position: relative;
  right:-40vh;
}
</style>
