<template>
  <v-dialog persistent class="p-2" :model-value="!!component" width="700">
    <v-card class="WorkList" v-if="works">
      <v-card-title class="pb-0"> Available works: </v-card-title>

      <v-list-item v-for="(work, index) in works" :key="index">
        <v-list-item-media>
          <v-icon class="blue" dark text="mdi-gesture-tap-button"></v-icon>
        </v-list-item-media>

        <v-list-item-title>
          <v-list-item-title> Position: {{ work.name }} </v-list-item-title>

          <v-list-item-subtitle>
            Sector: {{ work.economicSectors }}
          </v-list-item-subtitle>
          <v-list-item-subtitle v-if="work.salary && work.interviewPassed">
            Salary: {{ work.salary }} $
          </v-list-item-subtitle>
          <v-list-item-subtitle v-else>
            Salary: {{ work.baseSalary.min }} $ - {{ work.baseSalary.max }} $
          </v-list-item-subtitle>
        </v-list-item-title>

        <v-list-item-action>
          <v-btn
            v-if="!work.interviewVisited"
            large
            @click="goToJobInterview(work.key)"
          >
            Go to interview
          </v-btn>
          <v-btn
            v-else-if="work.interviewPassed"
            large
            @click="acceptWork(work.key)"
          >
            Accept invoice
          </v-btn>
          <v-btn v-else large> You had fail interview </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-card>
  </v-dialog>
</template>

<script>
import { useModal, useGame } from "@composable";

export default {
  name: "WorkList",

  setup() {
    const { data, component, closeModal } = useModal();
    const { gameDate, gameAction, gameUserData, gameUserWork } = useGame();

    return {
      data,
      component,
      closeModal,
      gameAction,
      gameUserData,
      gameUserWork,
      gameDate,
    };
  },

  created() {
    if (this.gameUserWork) this.closeModal();
    this.fetchWorksList();
  },

  watch: {
    gameDate() {
      if (this.gameUserWork) this.closeModal();
      this.fetchWorksList();
    },
  },

  data() {
    return {
      works: null,
    };
  },

  methods: {
    fetchWorksList() {
      this.gameAction("gamesWork", "getWorksList").then((worksList) => {
        this.works = worksList;
      });
    },

    goToJobInterview(key) {
      this.gameAction("gamesWork", "goToJobInterview", key).then(
        (worksList) => {
          this.works = worksList;
        }
      );
    },

    acceptWork(key) {
      this.gameAction("gamesWork", "acceptWork", key).then((userData) => {
        this.gameUserData = userData;
        this.closeModal();
      });
    },
  },
};
</script>
