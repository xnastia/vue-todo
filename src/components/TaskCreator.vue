<template>
<div class="task-create-form-wrapper">

<div class="task-create-form">
  <h2>New task</h2>
    <el-form :model="task" :rules="rules" ref="ruleForm" class="demo-ruleForm">
    <el-form-item prop="title">
    <el-input type="text" v-model="task.title" placeholder="Task name"></el-input>
    </el-form-item>
    <el-form-item prop="description">
    <tinymce-editor v-model="task.description" id="editor"></tinymce-editor>
    </el-form-item>
    <el-form-item>
    <el-col :span="12">
    <el-form-item  prop="priority">
     <el-select v-model="task.priority" placeholder="Select priority">
      <el-option label="Low" value="Low" ></el-option>
      <el-option label="Medium" value="Medium"></el-option>
      <el-option label="High" value="High"></el-option>
    </el-select>
    </el-form-item>
    </el-col>
    <el-col class="line" :span="2"></el-col>
    <el-col :span="12">
    <el-form-item prop="deadline">
    <el-date-picker type="date" v-model="task.deadline" placeholder="Select deadline"></el-date-picker>
    </el-form-item>
    </el-col>
    </el-form-item>
    <el-form-item class="add-task-form-btns">
    <el-button @click.prevent="cancelInput()">CANCEL</el-button>
    <el-button type="primary" @click.prevent="submitForm()">CREATE TASK</el-button>
    </el-form-item>
  </el-form>
</div>
</div>
</template>
<script>
import Editor from '@tinymce/tinymce-vue'
export default {
  components: { 'tinymce-editor': Editor },
  data () {
    return {
      task: {
        title: '',
        description: '',
        priority: '',
        deadline: ''
      },
      rules: {
        title: [
          { required: true, message: 'Please input title', trigger: 'blur' },
          {
            min: 5,
            max: 100,
            message: 'Length should be from 5 to 100',
            trigger: 'blur'
          }
        ],
        priority: [
          { required: true, message: 'Please select priority', trigger: 'change' }
        ],
        deadline: [
          {
            type: 'date',
            required: true,
            message: 'Please pick a date',
            trigger: 'change'
          }
        ],
        description: [
          { required: true, message: 'Please input description', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.$store.commit('addTask', this.task)
          this.$router.push({ name: 'main' })
        } else {
          return false
        }
      })
    },
    cancelInput () {
      // this.$refs['ruleForm'].resetFields();
      this.$router.push({ name: 'main' })
    }
  }
}

</script>
<style>
.tox-notifications-container{
  display:none!important;
}
</style>
<style scoped>
.el-select-dropdown__item:first-child{
  color: rgb(62,193,125) !important;
}

.el-select-dropdown__item:nth-child(2){
  color: rgb(238,138,8) !important;
}

.el-select-dropdown__item:nth-child(3){
  color: rgb(253,0,9) !important;
}

.task-create-form-wrapper{
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

.add-task-form-btns{
  display: flex;
  justify-content: center;
  padding-left: 40%;
}

textarea.el-textarea__inner{
  height: 100px;
}

.task-create-form{
  width: 75vh;
}
@import url("//unpkg.com/element-ui@2.11.1/lib/theme-chalk/index.css");
</style>
