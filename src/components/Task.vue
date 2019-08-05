<template>
  <div class="task">
    <div class="task-details">
      <div class="task-details-side-wrapper">
        <div @click="toggleDescription()" class="task-toggle-description-icon">&#9783;</div>
        <div class="task-tittle">{{task.title}}</div>
      </div>
      <div class="task-details-side-wrapper">
        <div :class="task.priority.toLowerCase()+ '-priority'">
          <div class="task-priority">{{task.priority}}</div>
        </div>
        <div class="task-deadline">{{formatDate(task.deadline)}}</div>
        <div @click="removeTask(index)" class="task-remove-icon">&#x1f5d1;</div>
      </div>
    </div>
    <div v-if="showDescription" class="task-description">
      <h4>Task description:</h4>
      <div v-html="task.description"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["task", "index"],
  data: function() {
    return {
      showDescription: false
    };
  },
  methods: {
    toggleDescription() {
      this.showDescription = !this.showDescription;
    },
    removeTask(index) {
      this.$store.commit("removeTask", index);
    },
    formatDate(date_str) {
      const d = new Date(date_str);
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      return d.getDate() + " " + monthNames[d.getMonth()];
    }
  }
};
</script>
<style>
.task-details {
  background-color: rgb(251, 251, 251);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0vh 3vh;
  width: 90vh;
  height: 55px;
  font-weight: 600;
  border-radius: 3px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}
.task-details-side-wrapper {
  display: flex;
  justify-content: flex-end;
}
.task-remove-icon {
  color: rgb(203, 141, 142);
  font-size: 20px;
}
.high-priority {
  background-color: rgb(253, 0, 9);
  margin-right: 3vh;
  border-radius: 15px;
}
.low-priority {
  background-color: rgb(62, 193, 125);
  margin-right: 3vh;
  border-radius: 15px;
}
.medium-priority {
  background-color: rgb(238, 138, 8);
  margin-right: 3vh;
  border-radius: 15px;
}
.task-toggle-description-icon {
  color: rgb(231, 231, 231);
  font-size: 20px;
}
.task-tittle {
  padding-top: 1vh;
  padding-left: 3vh;
}
.task-priority {
  color: white;
  width: 80px;
  font-size: 14px;
  font-weight: 500;
  justify-content: space-around;
  display: flex;
  text-transform: uppercase;
  padding: 5px 0px;
}
.task-deadline {
  color: rgb(194, 194, 194);
  font-size: 14px;
  font-weight: 500;
  padding-top: 1vh;
  margin-right: 3vh;
  width:8vh;
}
.task {
  padding-top: 1vh;
}

h4{
  margin-block-start: 1.33em;
  margin-block-end: 0.1em;
}

.task-description{
  height:15vh;
  font-size: 14px;
  padding-left: 5vh;
}
</style>
