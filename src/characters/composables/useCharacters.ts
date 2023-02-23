import breakingBadApi from "@/api/BreakingBadApi";
import { useQuery } from "@tanstack/vue-query";
import { computed, ref } from "vue";
import type { Character, ResponseCharacter } from "../interfaces/Character";

//Uso de Store Global
const characters = ref<Character[]>([]);
const hasError  = ref<boolean>(false);
const errorMessage = ref<string|null>(null);

// 3. Con TanStack Query. Esta es la forma más recomendada para el manejo de los datos con caché
const getCharacters = async():Promise<Character[]>=>{
    if(characters.value.length > 0) return characters.value;

    const {data} = await breakingBadApi.get<ResponseCharacter>('/character');
    return data.results;
};

const loadedCharacters = (data:Character[]) => {
    hasError.value =false;
    errorMessage.value = null;
    characters.value = data;
}

const useCharacters = () => {
    
    const {isLoading} =  useQuery(
        ['characters'],
        getCharacters,
        {
            onSuccess:loadedCharacters
        });

    return {
        characters,
        count:computed(() => characters.value.length),
        errorMessage,
        hasError,
        isLoading
    }
}

export default useCharacters;