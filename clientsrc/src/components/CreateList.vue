<template>
  <div class="CreateList">
    <form>
      <input
        type="text"
        class="form-control w-50"
        placeholder="Add List..."
        v-model="newList.title"/>
      <button type="submit" class="btn btn-primary d-flex" @click="addList()">Create</button>
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