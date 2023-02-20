import type { RouteRecordRaw } from "vue-router";

export const characterRoute:RouteRecordRaw = {
    path:'/characters',
    name:'characters',
    component: ()=> import(/* webpackChunkName: "characters"*/ '../layout/CharacterLayout.vue'),
    redirect:{name:'character-list'},
    children: [
        {
            path: 'by/id',
            name: 'character-id',
            props:{title: 'Character by Id',visible:false},
            component: ()=> import(/* webpackChunkName: "CharacterById" */ '@/characters/pages/CharacterId.vue')
        },
        {
            path: 'list',
            name: 'character-list',
            props: {title: 'Characters',visible:true},
            component: ()=> import(/* webpackChunkName: "Characters" */ '@/characters/pages/CharacterList.vue')
        },
        {
            path: 'search',
            name: 'character-search',
            props:{title:'Search',visible:true},
            component: ()=> import(/* webpackChunkName: "CharactersSearch" */ '@/characters/pages/CharacterSearch.vue')
        }
    ]
}