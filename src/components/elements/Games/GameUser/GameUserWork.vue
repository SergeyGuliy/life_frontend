<template>
  <div>
    <v-card-title class="py-0">
      Current work:
      <v-spacer></v-spacer>
      {{ getWorkName }}
    </v-card-title>

    <v-simple-table v-if="isWorkExist">
      <template v-slot:default>
        <thead>
          <tr>
            <th>Scope of work</th>
            <th>Salary</th>
            <th>Taxes</th>
            <th class="text-right">Salary including taxes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ workMock.scope }}</td>
            <td>{{ workMock.salary_excludes_taxes }}</td>
            <td>{{ workMock.taxes }}</td>
            <td class="text-right">{{ workMock.salary_includes_taxes }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-card-actions>
      <v-btn v-if="isWorkExist" @click="quitYourJob" block>
        Quit your job
      </v-btn>
      <v-btn v-else @click="findJob" block>
        Find job
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  name: "GameUserWork",

  props: {
    work: {}
  },

  data() {
    return {
      workMock: {
        name: "FrontEnd",
        scope: "IT",
        salary_excludes_taxes: 1000,
        taxes: "10 %",
        salary_includes_taxes: 900
      }
    };
  },

  computed: {
    isWorkExist() {
      return !!this.workMock?.name;
    },
    getWorkName() {
      return this.isWorkExist ? this.workMock.name : "Unemployed";
    }
  },

  methods: {
    quitYourJob() {
      this.workMock = null;
    },
    findJob() {
      this.workMock = {
        name: "FrontEnd",
        scope: "IT",
        salary_excludes_taxes: "1000 $",
        taxes: "10 %",
        salary_includes_taxes: "900 $"
      };
    }
  }
};
</script>
