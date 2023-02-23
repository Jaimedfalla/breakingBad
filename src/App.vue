<script setup lang="ts">
import NavBar from './shared/components/NavBar.vue';
import { routerLinks } from './router/link-routes';
</script>

<template>
  <div class="wrapper">
    <header>
      <NavBar
        title="BreakingBad"
        :links="routerLinks"
        :show-icon="true"
      ></NavBar>
    </header>
    <main>
      <RouterView></RouterView>
    </main>
  </div>
</template>

<style scoped>
.wrapper{
  display: flex;
  flex-direction: column;
}
</style>
