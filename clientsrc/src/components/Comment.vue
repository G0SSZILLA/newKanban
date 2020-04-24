<template>
    <div class="Comment">
<div class="card card-body">
<p>
    {{commentData.title}}
</p>
</div>
<div class="card-footer">
<!-- NOTE buttons go here -->
</div>
    </div>
</template>


<script>
export default {
    name: 'Comment',
    props: ["commentData"],
    data(){
        return {}
    },
    computed:{},
    methods:{},
    components:{}
}
</script>


<style scoped>

</style>