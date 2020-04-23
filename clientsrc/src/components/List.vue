<template>
  <div class="List col-2 m-auto">
    <div class="card bg-dark text-light shadow">
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
      </div>
      <div class="card-footer">
        <h5>{{listData.creator.name}}</h5>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "List",
  props: ["listData"],
  data() {
    return {
      editing: false
    };
  },
  computed: {
    //  board() {
    //   return this.$store.state.activeBoard;
    // },
    // lists() {
    //   return this.$store.state.lists
    // }
  },
  methods: {
       deleteList(){
      this.$store.dispatch("deleteList", this.listData)
      this.$router.push({name: 'board'})
    },
    editList(){
      this.$store.dispatch("editList", this.listData)
      this.editing = false
    }
  },
  components: {}
};
</script>


<style scoped>
</style>