<script setup lang="ts">
//import {useCharacters} from '@/characters/composables/useCharacters';
import { useQuery } from '@tanstack/vue-query';
import type { Character,ResponseCharacter } from '@/characters/interfaces/Character';
import breakingBadApi from '@/api/BreakingBadApi';
import Charactercard from './CharacterCard.vue';

// 2. Con composables const {characters,isLoading} = useCharacters();
// 3. Con TanStack Query

const getCharactersSlow = async():Promise<Character[]> => {
    const {data} = await breakingBadApi.get<ResponseCharacter>('/character');
    console.log(data);
    return data.results;
}

const {isLoading, isError,data:characters,error} = useQuery(
    ['characters'],
    getCharactersSlow,
    {
        cacheTime:1000 * 60,//Mantiene la información en cache, el valor debe ser en segundos
        refetchOnReconnect: 'always',
    }
);

</script>

<template>
    <h1 v-if="isLoading">Loading...</h1>
    <div class="card-list" v-else>
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