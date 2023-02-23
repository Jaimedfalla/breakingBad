<script setup lang="ts">
import { watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import useCharacter from "../composables/useCharacter";

const router = useRouter();
const route = useRoute();
const {id} = route.params as {id:string};
const {isLoading,hasError,errorMessage,character} = useCharacter(id);

watchEffect(()=>{
    if(!isLoading.value && hasError.value){
        router.replace('/characters'); //Replace no genera un registro en el histórico del navegador
    }
});
</script>

<template>
    <h1 v-if="isLoading">Loading...</h1>
    <h1 v-else-if="hasError">{{ errorMessage }}</h1>
    <div v-else-if="character">
        <h1>{{character.name}}</h1>
        <div class="charactercontainer">
            <img :src="character.image" :alt="character.name">
            <ul>
                <li>Status: {{ character.status }}</li>
                <li>Type: {{ character.type }}</li>
                <li>Specie: {{ character.species }}</li>
                <li>Created: {{ character.created }}</li>
                <li>Gender: {{ character.gender }}</li>
            </ul>
        </div>
    </div>
</template>


<style scoped>
.character-container{
    display: flex;
    flex-direction: row;
}
img{
    width: 150px;
    border-radius: 5px;
}
</style>