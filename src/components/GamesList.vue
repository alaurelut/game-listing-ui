<template>
  <v-container>
    <router-link to="create"
      ><v-btn class="ma-2" color="primary" dark>
        Add a new game
        <v-icon dark right> mdi-plus-circle-outline </v-icon>
      </v-btn></router-link
    >

    <v-row class="pa-6" v-if="games.length > 0"
      ><v-card
        max-width="344"
        class="mb-6 mr-6"
        v-for="game in games"
        :key="game.id"
      >
        <v-img
          v-if="game.images.length > 0"
          :src="game.images[0].url"
          height="200px"
        ></v-img>

        <v-card-title> {{ game.title }} </v-card-title>

        <v-card-subtitle> {{ game.subtitle }} </v-card-subtitle>
      </v-card></v-row
    >

    <v-row v-else class="ma-2">No games found</v-row>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { GameListing } from "../api/game-listing/model";
import { getAllGames } from "../api/game-listing/service";

@Component
export default class GamesList extends Vue {
  games: GameListing[] = [];
  error = "";
  loading = false;

  mounted(): void {
    this.loading = true;
    getAllGames()
      .then((games) => (this.games = games))
      .catch((error) => (this.error = error));
  }
}
</script>
