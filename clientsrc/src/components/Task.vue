<template>
  <!-- NOTE THIS WAS TO TRY DRAG AND DROP -->
  <!-- :taskData="id"
  :draggable="draggable"
  @dragstart="dragStart"
  @dragover.stop-->
  <div class="Task mb-3">
    <div class="card pt-0 card-body bg-light text-dark">
      <div class="row">
        <div class="col-6 text-left pl-0 mt-1">
          <button
            class="btn bg-transparent border-0"
            @click="deleteTask()"
            v-if="$auth.isAuthenticated">
            <span>X</span>
          </button>

          <!-- DROPDOWN START -->
          <div class="btn-group mb-1 ml-1">
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
        </div>
        <div class="col-6"></div>
      </div>
      <h5>
        <strong>{{taskData.title}}</strong>
      </h5>
      <hr />

      <Comment v-for="comment in comments" :commentData="comment" :key="comment._id" />
      <div class="row justify-content-center">
        <form class="row">
          <div class="col-6 pr-1">
            <input
              type="text"
              class="form-control pl-0 w-100"
              placeholder="Comment..."
              v-model="newComment.title"
            />
          </div>
          <div class="col-6 pl-0 text-left">
            <button type="submit" class="btn btn-warning d-flex" @click="addComment()">+</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import Comment from "../components/Comment.vue";
export default {
  name: "Task",
  props: ["taskData"],
  data() {
    return {
      newComment: {}
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
    activeTask() {
      this.$store.state.activeTask;
    },

    moveTask(list) {
      let listIDs = {
        oldListId: this.taskData.listId,
        newListId: list._id,
        taskId: this.taskData._id
      };
      console.log(listIDs);
      this.$store.dispatch("moveTask", listIDs);
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

    // NOTE Figure out select Task! not sure if we need for moving?

    //     selectTask() {
    //   this.$store.commit("setActiveTask", {});
    //   this.$router.push({
    //     name: "List",
    //     params: { boardId: this.boardData._id }
    //   });
    // },
  },
  components: { Comment }
};
</script>

<style scoped>
</style>

