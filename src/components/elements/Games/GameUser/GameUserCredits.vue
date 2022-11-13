<template>
  <div>
    <v-simple-table dense fixed-header v-if="userCredits.length">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">Duration<br />(month)</th>
            <th class="text-center">End</th>
            <th class="text-center">Percent<br />(%)</th>
            <th class="text-center">Amount<br />($)</th>
            <th class="text-center">Month pay<br />($)</th>
            <th class="text-center">Total pay<br />($)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(credit, index) in userCredits" :key="index">
            <td width="16%" class="text-center">{{ credit.duration }}</td>
            <td width="20%" class="text-center">{{ credit.end | gameDate }}</td>
            <td width="16%" class="text-center">{{ credit.percent }}</td>
            <td width="16%" class="text-center">{{ credit.cash }}</td>
            <td width="16%" class="text-center">{{ credit.perMonth }}</td>
            <td width="16%" class="text-center">{{ credit.total }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-card-subtitle v-else class="text-center py-0">
      You don't have credits
    </v-card-subtitle>
  </div>
</template>

<script>
export default {
  name: "GameUserCredits",

  computed: {
    userCredits() {
      return this.$gameUserData.credits;
    }
  }
};
</script>

<style scoped></style>
