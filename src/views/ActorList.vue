<template>
  <div>
    <div class="pagination">
      <button>Previous</button>
      <button @click="refetch({page: result.value?.characters!.info!.next as number})">Next</button>
    </div>
    <p v-if="error" class="error">Something went wrong...</p>
    <p v-else-if="loading" class="loader">Loading...</p>
    <div v-else>
      <div class="grid-container">
        <div
          v-for="character in characters"
          @click="redirectToDetail(character.id)"
          :key="character.id"
          class="card"
        >
          <img :src="character.image" :alt="character.name" />
          <div class="container">
            <h4>
              <b>{{ character.name }}</b>
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gql } from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import { computed, ref } from 'vue'
import router from '@/router'

const CHARACTERS_QUERY = gql`
  query Characters {
    characters {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        image
      }
    }
  }
`
const currentPage = ref(1);
const { result, loading, error, refetch } = useQuery(CHARACTERS_QUERY, {
  page: currentPage.value
})

const redirectToDetail = (id: string) => {
  router.push(`/actor/${id}`)
}

const characters = computed(() => result.value?.characters.results ?? [])
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
.pagination {
  margin: 50px;
  display: flex;
  justify-content: center;
}
button {
  cursor: pointer;
  padding: 15px 20px;
  border: none;
  border-radius: 5px;
  background-color: #f2f2f2;
  width: 150px;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 2fr));
  gap: 20px;
  width: 70%;
  margin: 0 auto;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 20px;
  cursor: pointer;
}

img {
  border-radius: 20px 20px 0 0;
  width: 100%;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.container {
  padding: 2px 16px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.pagination button {
  margin: 0 5px;
}
</style>
