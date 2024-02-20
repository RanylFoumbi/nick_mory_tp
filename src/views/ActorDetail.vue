<template>
  <div>
    <p v-if="error" class="error">Something went wrong...</p>
    <p v-else-if="loading" class="loader">Loading...</p>
    <div v-else>
      <img :src="character.image" :alt="character.name" />
      <h4><b>{{ character.name }}</b></h4>
      <h3><b>{{ character.status }}</b></h3>
      <h2><b>{{ character.species }}</b></h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { gql } from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';

const CHARACTERS_QUERY = gql`
  query Character($id: ID!) {
    character(id: $id) {
      id
      name
      image
      status
      species
    }
  }
`;

const route = useRoute();
const id = ref(route.params.id);
const { result, loading, error } = useQuery(CHARACTERS_QUERY, { id: id.value });
const character = result.value?.character || {};

</script>

<style scoped>
.error {
  text-align: center;
  margin-top: 150px;
  font-size: 30px;
  font-weight: bold;
  color: red;
}
.loader {
  text-align: center;
  margin-top: 150px;
  font-size: 30px;
  font-weight: bold;
  color: green;
}
</style>