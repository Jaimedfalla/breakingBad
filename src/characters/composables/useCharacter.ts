import { useQuery } from '@tanstack/vue-query';
import { computed, ref } from 'vue';
import type { Character } from '@/characters/interfaces/Character';
import breakingBadApi from '@/api/BreakingBadApi';

const characterSet = ref<{[id:string]:Character}>({});
const hasError = ref<boolean>(false);
const errorMessage = ref<string|null>(null);

const getCharacter = async (id:string): Promise<Character> =>{
    if(characterSet.value[id]) return characterSet.value[id];

    try{
        const {data} = await breakingBadApi.get<Character>(`/character/${id}`);
        return data;
    }
    catch(error:any){
        throw new Error(error);
    }
}

const loadedCharacter = (data:Character) => {
    characterSet.value[data.id] = data;
    hasError.value = false;
    errorMessage.value = null;
}

const onLoadedFail = (error:string) => {
    hasError.value = true,
    errorMessage.value = error;
};

const useCharacter = (id:string) => {
    
    const {isLoading} = useQuery(
        ['character',id],
        () => getCharacter(id),
        {
            onSuccess:loadedCharacter,
            onError:onLoadedFail
        }
    );

    return {
        list:characterSet,
        hasError,
        errorMessage,
        isLoading,
        character:computed<Character|null>(()=>characterSet.value[id])
    }
}

export default useCharacter;