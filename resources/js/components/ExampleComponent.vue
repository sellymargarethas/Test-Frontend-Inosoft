<template>
    <div class="example">
        <div class="container">
            <div v-for="post in posts" :key="post.id">
                <h1>test 123</h1>
                <h1>{{ post.title }}</h1>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: 'example',
        mounted() {
            this.$store.dispatch('loadDatas')
        },
        computed: {
            ...mapState(['posts'])
        }
    }
</script>
