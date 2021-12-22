<template>
  <v-container>
    <router-link to="/"
      ><v-btn class="ma-2" color="primary" dark>
        Back to game list
      </v-btn></router-link
    >
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="game.title"
        label="Title"
        :rules="stringRules"
        required
      ></v-text-field>
      <v-text-field
        v-model="game.subtitle"
        label="Subtitle"
        :rules="stringRules"
        required
      ></v-text-field>
      <v-text-field
        v-model="game.description"
        label="Description"
        :rules="stringRules"
        required
      ></v-text-field>
      <v-text-field
        v-model="game.category"
        label="Category"
        :rules="stringRules"
        required
      ></v-text-field>
      <v-text-field
        v-model="game.author"
        label="Author"
        :rules="stringRules"
        required
      ></v-text-field>
      <v-text-field
        v-model="imageUrl"
        label="Image URL"
        :rules="requiredRules"
        required
      ></v-text-field>
      <v-select
        v-model="game.type"
        :items="gameTypes"
        item-text="label"
        item-value="value"
        label="Type"
        outlined
      ></v-select>
      <v-checkbox
        v-model="game.isDownloadable"
        label="Is Downloadable"
        required
      ></v-checkbox>
      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="submitForm"
      >
        Submit
      </v-btn>
    </v-form>

    <v-snackbar
      v-model="showSnackbar"
      :timeout="timeout"
      :color="succeed ? 'success' : 'error'"
    >
      <span v-if="succeed">
        Success creating game
        <router-link to="/" v-if="succeed">See game list</router-link></span
      >
      <span v-else>
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul></span
      >

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="showSnackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
<style lang="scss" scoped>
.v-form {
  max-width: 600px;
}
</style>
<script lang="ts">
import { GameImage, GameListing, GameTypes } from "@/api/game-listing/model";
import { createGame } from "@/api/game-listing/service";
import { Vue, Component } from "vue-property-decorator";
@Component
export default class GameCreateForm extends Vue {
  valid = true;
  error = "";
  timeout = 15000;
  showSnackbar = false;
  errors: string[] = [];

  requiredRules = [(v: string) => !!v || "Field is required"];

  stringRules = [
    ...this.requiredRules,
    (v: string) => (v && v.length <= 80) || "Must be less than 80 characters",
  ];

  gameTypes: {
    value: GameTypes;
    label: string;
  }[] = [
    {
      value: GameTypes.FPS,
      label: "FPS",
    },
    {
      value: GameTypes.RPG,
      label: "RPG",
    },
    {
      value: GameTypes.PLATFORM,
      label: "PLATFORM",
    },
    {
      value: GameTypes.SIMULATION,
      label: "SIMULATION",
    },
  ];

  $refs!: {
    form: HTMLFormElement;
  };

  succeed = false;
  game: GameListing = {
    category: "",
    title: "",
    subtitle: "",
    description: "",
    images: [],
    type: 1,
    tags: [],
    author: "",
  };
  imageUrl = "";

  submitForm() {
    this.game.images = [{ url: this.imageUrl } as GameImage];
    this.succeed = false;
    this.showSnackbar = false;

    if (this.$refs.form.validate()) {
      createGame(this.game)
        .then(() => {
          this.succeed = true;
        })
        .catch((error) => {
          console.log("error", error);
          this.errors = error;
        })
        .finally(() => (this.showSnackbar = true));
    }
  }
}
</script>
