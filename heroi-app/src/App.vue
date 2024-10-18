<template>
  <nav>
    <router-link to="/">Knights</router-link> | 
    <router-link to="/heroes">Hall of Heroes</router-link> |
    <router-link to="/create-knight">Cadastrar Knight</router-link>
  </nav>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style>
nav {
  margin-bottom: 20px;
}
</style>
