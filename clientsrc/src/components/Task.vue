<template>
<!-- NOTE THIS WAS TO TRY DRAG AND DROP -->
  <!-- :taskData="id"
  :draggable="draggable"
  @dragstart="dragStart"
  @dragover.stop -->
  <div class="Task mb-3">
    <div class="card pt-0 card-body text-dark" @click="selectTask()">
    <div class="row">
<div class="col-6 text-left pl-0 mt-1">
    <button class="btn btn-sm btn-danger" @click="deleteTask()" v-if="$auth.isAuthenticated">
            <span>&times;</span>
          </button>
</div>
<div class="col-6"></div>
    </div>
      <h5>{{taskData.title}}</h5>

      <div class="row justify-content-center">
        <!-- DROPDOWN START -->
        <div class="btn-group">
          <button
            class="btn btn-warning btn-sm moveTask dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >Move</button>
          <div class="dropdown-menu">
            <div v-for="list in lists" :key="list._id">
              <p class="dropdown-item" @click="moveTask()">{{list.title}}</p>
            </div>
          </div>
        </div>
        <!-- DROPDOWN END -->
        <!-- NOTE add @click and tie into a computed method! -->
      </div>
    </div>
    
  </div>
</template>


<script>
export default {
  name: "Task",
  props: ["taskData",],
  data() {
    return {};
  },
  computed: {
    lists() {
      return this.$store.state.lists;
    },
  },
  methods: {
    deleteTask() {
      this.$store.dispatch("deleteTask", this.taskData);
      this.$router.push({ name: "board" });
    },
   selectTask() {
      this.$store.commit("setActiveTask", {});
      // this.$router.push({
      //   name: "board",
      //   params: { boardId: this.boardData._id }
      // });
    },

//     dragStart: event =>{
//       let target = event.target
//       // set data is like local storage but in our file structure
// event.dataTransfer.setData('task_id', target.id)
// // need set timeout or it would just disapear.
// setTimeout(() =>{
// target.style.display = 'none'
// },0)
    },
    // NOTE Figure out select Task!
    //     selectTask() {
    //   this.$store.commit("setActiveTask", {});
    //   this.$router.push({
    //     name: "List",
    //     params: { boardId: this.boardData._id }
    //   });
    // },
  components: {}
  }

</script>


<style scoped>
.moveTask {
}
</style>

