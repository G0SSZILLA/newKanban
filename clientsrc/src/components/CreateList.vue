<template>
    <div class="createComment">


    </div>
</template>


<script>
export default {
    name: 'createComment',
    data(){
        return {
            newList: {}
        }
    },
    computed:{
        activeBoardId(){
            return this.$store.state.activeBoard.board._id;
        },
    },
    methods:{},
    components:{}
}
</script>


<style scoped>

</style>