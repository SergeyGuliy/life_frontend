<template>
  <v-card>
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th>Duration:</th>
            <th class="text-center">Inflation</th>
            <th class="text-center">Key rate</th>
            <th class="text-center">Unemployment</th>
            <th class="text-center">GDP</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="([key, string], index) in Object.entries(tableKeys)"
            :key="index"
          >
            <td width="24%">{{ string }}</td>
            <td width="19%" class="text-center">
              {{ tickModifiers.inflation[key] }} %
            </td>
            <td width="19%" class="text-center">
              {{ tickModifiers.keyRate[key] }} %
            </td>
            <td width="19%" class="text-center">
              {{ tickModifiers.unemployment[key] }} %
            </td>
            <td width="19%" class="text-center">
              {{ tickModifiers.GDP[key] }} %
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-card-text>
      <GameModificationGraph
        :inflation="inflation.history"
        :keyRate="keyRate.history"
        :unemployment="unemployment.history"
        :GDP="GDP.history"
      />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "GameModification",

  data() {
    return {
      tableKeys: {
        month1: "Last month",
        month3: "Last 3 month",
        month6: "Last 6 month",
        month12: "Last 12 month"
      }
    };
  },

  components: {
    GameModificationGraph: () => import("./GameModificationGraph")
  },

  computed: {
    inflation() {
      return this.$gameModifiers?.inflation;
    },
    keyRate() {
      return this.$gameModifiers?.keyRate;
    },
    unemployment() {
      return this.$gameModifiers?.unemployment;
    },
    GDP() {
      return this.$gameModifiers?.GDP;
    },
    basic() {
      return this.$gameModifiers?.basic;
    },
    tickModifiers() {
      return {
        inflation: this.$gameModifiers.inflation,
        keyRate: this.$gameModifiers.keyRate,
        unemployment: this.$gameModifiers.unemployment,
        GDP: this.$gameModifiers.unemployment
      };
    }
  },

  methods: {}
};
</script>
