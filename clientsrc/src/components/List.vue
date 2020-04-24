<template>
  <div class="List col-sm-12 col-lg-2">
    <!-- We are binding the list id to "id" and then preventing default action on the dragover event then calling the drop method    -->
    <!-- NOTE  THIS WAS FOR DRAG AND DROP -->
    <!-- :listData="id" 
     @dragover.prevent 
    @drop.prevent='drop'-->
    <div class="card board bg-dark text-light shadow">
      <div class="row">
        <!-- NOTE edit button -->
        <div class="col-6 text-left">
          <span>
            <button
              v-if="$auth.isAuthenticated"
              class="btn btn-warning shadow"
              @click="editing = !editing"
            >Edit</button>
            <form v-if="editing" @submit.prevent="editList">
              <input type="text" v-model="listData.title" />
              <button
                type="submit"
                v-if="$auth.isAuthenticated"
                class="btn btn-success shadow"
              >Confirm</button>
            </form>
          </span>
        </div>
        <!-- NOTE delete button -->

        <div class="col-6 text-right">
          <button class="btn btn-danger" @click="deleteList()" v-if="$auth.isAuthenticated">
            <span>&times;</span>
          </button>
        </div>
      </div>
      <div class="card-title border-bottom border-dark">
        <h3>{{listData.title}}</h3>
      </div>
      <div class="card-body">
        <!-- NOTE tasks go here -->
        <Task v-for="task in tasks" :taskData="task" :key="task._id" />
      </div>
      <div class="card-footer">
        <div class="row m-auto">
          <div class="col-12">
           
            <form>
              <input
                type="text"
                class="form-control text-center w-50"
                placeholder="Add Task..."
                v-model="newTask.title"/>
              <button type="submit" class="btn btn-sm btn-primary d-flex" @click="addTask()">Create</button>
            </form>
          </div>
        </div>
        <p class="footerText">{{listData.creator.name}}</p>
      </div>
    </div>
  </div>
</template>


<script>
// import CreateTask from "../components/CreateTask.vue";
import Task from "../components/Task.vue";
// NOTE NEED TO FINISH FUNCTIONALITY!!!!!!!
export default {
  name: "List",
  props: ["listData"],
  data() {
    return {
      newTask: {},
      editing: false
    };
  },
  mounted() {
    this.$store.dispatch("getTasks", this.listData.id);
  },
  computed: {
    tasks() {
      return this.$store.state.tasks[this.listData.id];
    }
  },
  methods: {
    deleteList() {
      this.$store.dispatch("deleteList", this.listData);
      this.$router.push({ name: "board" });
    },
    editList() {
      this.$store.dispatch("editList", this.listData);
      this.editing = false;
    },
    addTask() {
      this.newTask.listId = this.listData.id;
      console.log("addTask", this.newTask);
      this.$store.dispatch("addTask", this.newTask);
      this.newTask = {};
    }
    // pass through an event using a lamboy, set a variable to the event.dataTransfer (when a drag event happens we will get the event data to pass through) and then .getData and set it to the task id when we pick up the card.
    // NOTE display block?
    // drop: event => {
    //   let task_id = event.dataTransfer.getData('task_id')
    //   let task = document.getElementById(task_id)
    //   task.style.display = "block"
    //   e.target.appendChild(task)
    // }
  },
  components: { Task }
};
</script>


<style scoped>
.footerText {
  font-size: 11px;
}
</style>