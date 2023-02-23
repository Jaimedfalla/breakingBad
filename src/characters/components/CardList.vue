<script setup lang="ts">
import type { Character } from '@/characters/interfaces/Character';
import Charactercard from './CharacterCard.vue';
import { toRef } from 'vue';

// 2. Con composables const {characters,isLoading} = useCharacters();

const props = withDefaults(defineProps<{characters:Character[]}>(),{
    characters:()=>[]
});
const characters = toRef(props,'characters');
</script>

<template>
    <div class="card-list">
        <Charactercard
            v-for="character of characters"
            :key="character.id"
            :character="character"/>
    </div>
</template>

<style scoped>
.card-list{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
</style>