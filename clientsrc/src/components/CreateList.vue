<template>
  <div class="CreateList">
    <form class="row">
      <div class="col-6">
      <input
        type="text"
        class="form-control w-125"
        placeholder="Add List..."
        v-model="newList.title"/>
      </div>
      <div class="col-6 text-left">
      <button type="submit" class="btn btn-warning d-flex" @click="addList()">Create</button>
      </div>
    </form>
  </div>
</template>


<script>
export default {
  name: "CreateList",
  data() {
    return {
      newList: {}
    };
  },
  computed: {
    activeBoardId() {
      return this.$store.state.activeBoard.id;
    }
  },
  methods: {
    addList() {
      this.newList.boardId = this.activeBoardId
      this.$store.dispatch("addList", this.newList);
      console.log("addList in createList", this.newList);
      this.newList = {};
    }
  },
  components: {}
};
</script>


<style scoped>
</style>