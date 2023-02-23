<script setup lang="ts">
import { toRef } from "vue-demi";
import { useRouter } from "vue-router";
import type { Character } from "../interfaces/Character";

const props = defineProps<{character:Character}>();
const character = toRef(props,'character');//Para que no se pierda la reactividad al intentar desestructurar
const router = useRouter();
</script>

<template>
    <div class="character-card" @click="router.push({name:'character-id',params:{id:character.id}})">
        <img :src="character.image" :alt="character.name">
        <h3>{{ character.name }}</h3>
    </div>
</template>

<style scoped>
.character-card{
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    margin-left: 5px;
    margin-right: 5px;
    cursor: pointer;
}

img{
    width: 150px;
    border-radius: 5px 5px 0px 0px;
    box-shadow: 0px 2px 10px rgba(255,255,255,0.1);
    transition: all .5s;
}
img:hover{
    box-shadow: 0px 2px 10px rgba(255,255,255,0.5);
    transition:all .5s;
}
</style>