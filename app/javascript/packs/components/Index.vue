<template>
  <div>
    <div class="row">
      <div class="col s10 m11">
        <input class="form-control" placeholder="Add your task!" v-model="newTask">
      </div>
      <div class="col s2 m1">
        <div class="btn-floating waves-effect waves-light red" @click="createTask">
          <i class="material-icons">add</i>
        </div>
      </div>
    </div>

    <div>
      <ul class="collection">
        <li v-for="task in notDaneTasks" :key="task.id" :id="'row_task_' + task.id" class="collection-item">
          <label :for="'task_' + task.id">
            <input @change="doneTask(task.id)" type="checkbox" :id="'task_' + task.id">
            <span>{{task.name}}</span>
          </label>
        </li>
      </ul>
    </div>

    <div class="btn" @click="displayFinishedTasks()">Display finished tasks</div>

    <div id="finished-tasks" class="display_none">
      <ul class="collection">
        <li v-for="task in doneTasks" :key="task.id" :id="'task_' + task.id" class="collection-item">
          <label :for="'task_' + task.id">
            <input type="checkbox" :id="'task_' + task.id" checked=true>
            <span>{{task.name}}</span>
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      tasks: [],
      newTask: ''
    }
  },
  mounted() {
    this.fetchTasks()
  },
  methods: {
    fetchTasks() {
      axios.get('/api/tasks').then((response) => {
        for(var i = 0; i < response.data.tasks.length; i++) {
          this.tasks.push(response.data.tasks[i])
        }
      }, (error) => {
        console.log(error)
      })
    },
    displayFinishedTasks() {
      document.querySelector('#finished-tasks').classList.toggle('display_none')
    },
    createTask() {
      if (!this.newTask) return
      axios.post('/api/tasks', {task: {name: this.newTask}}).then((response) => {
        this.tasks.unshift(response.data.task)
        this.newTask = ''
      }, (error) => {
        console.log(error)
      })
    },
     doneTask(task_id) {
       axios.put('/api/tasks/' + task_id, {task: {is_done: 1}}).then( response => {
         this.moveFinishedTask(task_id)
       },(error) =>{
         console.log(error)
       })
     },
     moveFinishedTask(task_id) {
       let el = document.querySelector('#row_task_' + task_id)
       let el_clone = el.cloneNode(true)
       el.classList.add('display_none')
       el_clone.getElementsByTagName('input')[0].checked = 'checked'
       var li = document.querySelector('#finished-tasks > ul > li:first-child')
       document.querySelector('#finished-tasks > ul').insertBefore(el_clone, li)
     }
  },
  computed: {
    notDaneTasks() {
      return this.tasks.filter(task => !task.is_done)
    },
    doneTasks() {
      return this.tasks.filter(task => task.is_done)
    }
  }
}
</script>

<style scoped>
  [v-cloak] {
    display: none;
  }
  .display_none {
    display:none;
  }
  .line-through {
    text-decoration: line-through;
  }
</style>