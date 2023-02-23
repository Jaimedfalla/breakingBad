<script setup lang="ts">
import CardList from '../components/CardList.vue';
import useCharacters from '../composables/useCharacters';

const props = defineProps<{title:String,visible:boolean}>();
const {isLoading,characters,hasError,errorMessage} = useCharacters();

</script>

<template>
    <h1 v-if="isLoading">Loading...</h1>

    <div v-else-if="hasError">
        <h1>Error loading data</h1>
        <p>{{  errorMessage }}</p>
    </div>

    <template v-else>
        <h1>{{props.title}}</h1>
        <CardList :characters="characters"/>
    </template>
</template>


<style scoped>

</style>