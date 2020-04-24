<template>
<!-- NOTE THIS WAS TO TRY DRAG AND DROP -->
  <!-- :taskData="id"
  :draggable="draggable"
  @dragstart="dragStart"
  @dragover.stop -->
  <div class="Task mb-3">
    <div class="card pt-0 card-body text-dark">
    <div class="row">
<div class="col-6 text-left pl-0 mt-1">
    <button class="btn  bg-transparent border-0" @click="deleteTask()" v-if="$auth.isAuthenticated">
            <span>X</span>
          </button>
</div>
<div class="col-6"></div>
    </div>
      <h5>{{taskData.title}}</h5>

        <Comment v-for="comment in comments" :commentData="comment" :key="comment._id"/>
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
              <p class="dropdown-item" @click="moveTask(list._id)">{{list.title}}</p>
            </div>
          </div>
        </div>
        <!-- DROPDOWN END -->
    <form>
              <input
                type="text"
                class="form-control text-center w-50"
                placeholder="Add comment..."
                v-model="newComment.title"/> 
              <button type="submit" class="btn btn-sm btn-warning d-flex" @click="addComment()">+</button>
            </form>
      </div>
    </div>
    
  </div>
</template>


<script>

import Comment from '../components/Comment.vue'
export default {
  name: "Task",
  props: ["taskData",],
  data() {
    return {
      newComment:{}
    };
  },
  computed: {
    lists() {
      return this.$store.state.lists;
    },
   comments() {
      return this.$store.state.comments[this.taskData.id];
    }
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
    moveTask(listId){
      // TODO need to figure this out ask D$ in the morning!!!!
      this.taskData.listId = listId
      this.$store.commit("editTask")
    },

     addComment() {
      this.newComment.taskId = this.taskData.id;
      console.log("addComment", this.newComment);
      this.$store.dispatch("addComment", this.newComment);
      this.newComment = {};
    }
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
  components: {Comment}
  }

</script>


<style scoped>
.moveTask {
}
</style>

