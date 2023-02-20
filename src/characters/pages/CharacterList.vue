<script setup lang="ts">
import CardList from '../components/CardList.vue';

interface Props{
    title:String,
    visible:boolean
}

const props = defineProps<Props>();
</script>

<template>
    <div>
        <h1>{{props.title}}</h1>

        <CardList/>
    </div>
</template>


<style scoped>

</style>