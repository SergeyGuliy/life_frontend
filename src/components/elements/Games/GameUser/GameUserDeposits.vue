<template>
  <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center">Duration<br />(month)</th>
          <th class="text-center">End</th>
          <th class="text-center">Percent<br />(%)</th>
          <th class="text-center">Amount<br />($)</th>
          <th class="text-center">Month income<br />($)</th>
          <th class="text-center">Total income<br />($)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(deposit, index) in userDeposits" :key="index">
          <td width="16%" class="text-center">{{ deposit.duration }}</td>
          <td width="20%" class="text-center">{{ deposit.end | gameDate }}</td>
          <td width="16%" class="text-center">{{ deposit.percent }}</td>
          <td width="16%" class="text-center">{{ deposit.cash }}</td>
          <td width="16%" class="text-center">{{ deposit.perMonth }}</td>
          <td width="16%" class="text-center">{{ deposit.total }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: "GameUserDeposits",

  computed: {
    userDeposits() {
      return this.$gameUserData.deposits;
    }
  }
};
</script>

<style scoped></style>
