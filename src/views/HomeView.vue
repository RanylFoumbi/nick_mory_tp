<template>
  <div>
    <p v-if="error">Something went wrong...</p>
    <p v-else-if="loading">Loading...</p>
    <div v-else>
      <p v-for="character in characters" :key="character.id">
        {{ character.name }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import { gql } from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';

const CHARACTERS_QUERY = gql`
  query Characters {
    characters {
      results {
        id
        name
        image
      }
    }
  }
`;

const { result, loading, error } = useQuery(CHARACTERS_QUERY);
const characters = result?.value?.characters?.results || [];
</script>