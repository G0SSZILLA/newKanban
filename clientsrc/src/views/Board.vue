<template>
  <div class="board container-fluid backgroundImg">
    <div class="row" style="height:4rem">
      <div class="col-3 mt-3">
        <CreateList v-if="$auth.isAuthenticated"/>
      </div>
      <div class="col-6 mt-3">
        <button
          v-if="$auth.isAuthenticated"
          class="btn btn-danger shadow"
          @click="deleteBoard()"
        >Delete</button>
        <span>
          <button
            v-if="$auth.isAuthenticated"
            class="btn btn-warning shadow"
            @click="editing = !editing"
          >Edit Board</button>
          <form v-if="editing" @submit.prevent="editBoard">
            <input type="text" v-model="board.title" />
            <button
              type="submit"
              v-if="$auth.isAuthenticated"
              class="btn btn-primary shadow"
            >Confirm</button>
          </form>
        </span>
      </div>
      <div class="col-3"></div>
    </div>

      <div class="row mt-5" style="height:8rem">
        <div class="col-12">
          <h1 v-if="board.title" class="boardTitle">{{board.title}}</h1>
        </div>
      </div>
      <div class="row">
    <List v-for="list in lists" :listData="list" :key="list._id" />
      </div>
  </div>
</template>

<script>
import CreateList from "../components/CreateList.vue";
import List from "../components/List.vue";
export default {
  name: "board",
  props: ["listData"],

  data() {
    return {
      editing: false
    };
  },
  mounted() {
    this.$store.dispatch("getBoard", this.$route.params.boardId);
    this.$store.dispatch("getList", this.$route.params.boardId);
    
  },
  computed: {
    board() {
      return this.$store.state.activeBoard;
    },
    lists() {
      return this.$store.state.lists;
    }
  },
  methods: {
    deleteBoard() {
      this.$store.dispatch("deleteBoard", this.$route.params.boardId);
      this.$router.push({ name: "boards" });
    },

    editBoard() {
      this.$store.dispatch("editBoard", this.board);
      this.editing = false;
    }
  },
  components: { List, CreateList }
};
</script>

<style scoped>
.backgroundImg {
  background-image: url(https://i.pinimg.com/originals/b4/8e/6d/b48e6d6ada7017fa19bc2cd91b9085ed.jpg);
  background-size: cover;
  filter: blur();
}
.colorOverlay {
  height: 100%;
  width: 100%;
  background: #000;
  opacity: 0.6;
}
.row {
  height: 92vh;
}
.boardTitle {
  color: #d7dde0;
}
</style>
