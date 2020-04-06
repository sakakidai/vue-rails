<template>
  <div>
    <div class="row">
      <div class="col s10 m11">
        <input class="form-control" placeholder="Add your task!">
      </div>
      <div class="col s2 m1">
        <div class="btn-floating waves-effect waves-light red">
          <i class="material-icons">add</i>
        </div>
      </div>
    </div>

    <div>
      <ul class="collection">
        <li v-for="task in notDaneTasks" :key="task.id" :id="'row_task_' + task.id" class="collection-item">
          <label :for="'task_' + task.id">
            <input type="checkbox" :id="'task_' + task.id">
            <span>{{task.name}}</span>
          </label>
        </li>
      </ul>
    </div>

    <div class="btn">Display finished tasks</div>

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