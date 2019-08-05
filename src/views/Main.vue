<template>
  <div class="main">
    <TaskBoard></TaskBoard>
  </div>
</template>

<script>
import TaskBoard from '@/components/TaskBoard.vue'

export default {
  name: 'Main',
  components: {
    TaskBoard
  }
}
</script>
