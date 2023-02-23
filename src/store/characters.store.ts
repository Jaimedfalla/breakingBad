/* Definición de un store local de vue */
import breakingBadApi from "@/api/BreakingBadApi";
import type { Character, ResponseCharacter } from "@/characters/interfaces/Character"
import { reactive } from "vue";

interface Store{
    characters:{
        list:Character[],
        count:Number,
        isLoading:boolean,
        hasError:boolean
        errorMessage:string | null
    },
    ids:{
        list:  {
            [id:string]:Character,
        },
        isLoading:boolean,
        hasError:boolean,
        errorMessage:string | null
    },
    startLoadingCharacters:()=> void;
    loadedCharacters:(data:Character[]) => void;
    loadCharacterFailed:(error:string) => void;

    startLoadingCharacter:()=>void;
    loadedCharacter:(character:Character) => void;
    checkIdInStore:(id:string) => boolean;
}

const characterStore = reactive<Store>({
    characters:{
        count: 0,
        errorMessage:null,
        hasError:false,
        isLoading:true,
        list:[]
    },
    ids:{
        list:  {},
        isLoading:false,
        hasError:false,
        errorMessage:null,
    },
    async startLoadingCharacters(){
        try{
            const {data} = await breakingBadApi.get<ResponseCharacter>('/character');
            this.loadedCharacters(data.results);
        }
        catch(error){
            console.error(error);
            this.loadCharacterFailed('Se presentó un error realizando la petición.');
        }
    },
    loadedCharacters(data){
        this.characters = {
            count: data.length,
            list: data,
            errorMessage:null,
            hasError:false,
            isLoading:false
        };
    },
    loadCharacterFailed(error){
        this.characters = {
            count:0,
            hasError: true,
            errorMessage: error,
            isLoading:false,
            list:[]
        }
    },
    startLoadingCharacter(){
        this.ids = {
            ...this.ids,
            isLoading:true,
            hasError:false,
            errorMessage:null
        };
    },
    loadedCharacter(character){
        this.ids.isLoading = false;
        this.ids.list[character.id] = character;
    },
    checkIdInStore(id){
        return !!this.ids.list[id];
    }
});

characterStore.startLoadingCharacters();

export default characterStore;