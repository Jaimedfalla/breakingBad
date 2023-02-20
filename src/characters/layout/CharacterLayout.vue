<script setup lang="ts">
import type { RouterLink } from '@/router/link-routes';
import NavBar from '@/shared/components/NavBar.vue';
import { characterRoute } from '../router';

const routesLink:RouterLink[] = characterRoute.children!
    .filter(route => (route.props as {title:string,visible:boolean}).visible)
    .map(route => {
        return {
            name:route.name as string,
            path: route.path,
            title: (route.props as {title:string,visible:boolean}).title
        }
    });
</script>

<template>
    <h1>Characters</h1>
    <NavBar :links="routesLink" :show-icon="false"></NavBar>
    <!-- <Suspense> -->
        <RouterView></RouterView>
    <!-- </Suspense> -->
</template>

<style scoped>

</style>