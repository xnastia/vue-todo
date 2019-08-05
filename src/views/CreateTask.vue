<template>
  <div class="main">
    <TaskCreator></TaskCreator>
  </div>
</template>

<script>
import TaskCreator from '@/components/TaskCreator.vue'

export default {
  name: 'CreateTask',
  components: {
    TaskCreator
  }
}
</script>
