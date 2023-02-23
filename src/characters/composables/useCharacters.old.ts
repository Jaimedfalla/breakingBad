import { onMounted, ref } from "vue";
import axios from "axios";
import type { Character, ResponseCharacter } from "@/characters/interfaces/Character";
import breakingBadApi from "@/api/BreakingBadApi";

const characters = ref<Character[]>([]);
const isLoading = ref<boolean>(true);
const hasError = ref<boolean>(false);
const errorMessage = ref<string>();

export const useCharactersOld = () =>{

    onMounted(async () => {
        loadCharacters();
    })

    const loadCharacters = async ()=>{
        if(characters.value.length > 0) return;

        isLoading.value = true;
        try{
            const {data} = await breakingBadApi.get<ResponseCharacter>('/character');
            characters.value = data.results;
            isLoading.value = false; 
        }
        catch(error){
            hasError.value = true;
            isLoading.value = false; 
            if(axios.isAxiosError(error)) return errorMessage.value = error.message;

            errorMessage.value = JSON.stringify(error);
        }
    };

    /* Las siguientes líneas quedan como documentación de una forma de hacer la invocación a un api y
    cargar la data de un componente

    // 1. Ejemplo para el uso de suspense
    const {data} = await breakingBadApi.get<ResponseCharacter>('/character');
    const characters = ref<Character[]>(data.results);*/

    return {
        characters,
        isLoading,
        hasError,
        errorMessage
    }
}