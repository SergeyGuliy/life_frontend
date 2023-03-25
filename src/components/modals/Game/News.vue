<template>
  <v-dialog persistent class="p-2" :model-value="!!component" width="625">
    <v-card class="news">
      <v-form ref="News">
        <v-tabs v-model="tabIndex" fixed-tabs>
          <v-tab v-for="tabName in tabs" :key="tabName">
            {{ tabName }}
          </v-tab>
        </v-tabs>

        <v-data-table
          v-if="tabIndex === 0"
          :headers="headers"
          :items="tableUserNews"
          item-key="source"
          v-model:expanded="expanded"
          show-expand
          hide-default-footer
          fixed-header
        >
          <template v-slot:item.data-table-expand="{ item, isExpanded }">
            <v-icon
              v-if="item.items?.length"
              @click="handleExpansion(item, isExpanded)"
            >
              {{ isExpanded ? "mdi-chevron-up" : "mdi-chevron-down" }}
            </v-icon>
          </template>
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length" class="px-0">
              <v-simple-table class="pl-14">
                <template v-slot:default>
                  <tbody>
                    <tr v-for="(i, index) in item.items" :key="index">
                      <td width="200px">{{ i.source }}</td>
                      <td class="text-center" width="120px">{{ i.brutto }}</td>
                      <td class="text-center" width="120px">{{ i.tax }}</td>
                      <td class="text-right" width="120px">{{ i.netto }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </td>
          </template>
          <template v-slot:footer>
            <v-simple-table class="pl-14 cash-table">
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td class="text-right" width="440px">cashIncome</td>
                    <td class="text-right" width="120px">
                      {{ cashIncome }}
                    </td>
                  </tr>
                  <tr>
                    <td class="text-right" width="440px">cash</td>
                    <td class="text-right" width="120px">
                      {{ cash }}
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </template>
        </v-data-table>
        <GameModification v-else-if="tabIndex === 1" />
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineAsyncComponent } from "vue";

import { $mChain } from "@utils/mathjs";
import { useModal, useGame } from "@composable";

export default {
  name: "News",

  setup() {
    const { data, component, closeModal } = useModal();
    const { gameUserNews } = useGame();

    return { data, component, closeModal };
  },
  components: {
    GameModification: defineAsyncComponent(() =>
      import("../../elements/Games/GameModification/GameModification.vue")
    ),
  },

  created() {
    this.tabIndex = this.data.type;
  },

  data() {
    return {
      tabs: ["Monthly cash flow", "Monthly news"],
      tabIndex: 0,

      expanded: [],

      headers: [
        {
          text: "Source of income",
          sortable: false,
          value: "source",
          width: "200px",
        },

        {
          text: "Brutto",
          sortable: false,
          value: "brutto",
          width: "120px",
          align: "center",
        },

        {
          text: "Tax",
          sortable: false,
          value: "tax",
          width: "120px",
          align: "center",
        },

        {
          text: "Netto",
          sortable: false,
          value: "netto",
          width: "120px",
          align: "end",
        },
      ],
    };
  },

  methods: {
    handleExpansion(item, state) {
      const itemIndex = this.expanded.indexOf(item);
      state ? this.expanded.splice(itemIndex, 1) : this.expanded.push(item);
    },

    pushAllItems(items, tableData, source, itemName) {
      if (!items.length) return;

      tableData.push({
        source,
        netto: $mChain(items.reduce((acc, cur) => acc + cur.netto, 0))
          .round(2)
          .done(),
        items: items.map((i) => ({
          source: itemName,
          brutto: i.brutto,
          tax: i.tax,
          netto: i.netto,
        })),
      });
    },
  },

  computed: {
    cashIncome() {
      return this.gameUserNews?.cashIncome;
    },
    cash() {
      return this.gameUserNews?.cash;
    },

    tableUserNews() {
      let { creditTick, creditEnd, depositTick, depositEnd, expanses, salary } =
        this.gameUserNews;

      let tableData = [];

      if (salary?.netto) {
        tableData.push({
          source: "salary",
          ...salary,
        });
      }
      this.pushAllItems(creditTick, tableData, "creditTick", "creditTick");
      this.pushAllItems(creditEnd, tableData, "creditEnd", "creditEnd");
      this.pushAllItems(depositTick, tableData, "depositTick", "depositTick");
      this.pushAllItems(depositEnd, tableData, "depositEnd", "depositEnd");

      tableData.push({
        source: "expanses",
        netto: $mChain(
          Object.values(expanses).reduce((acc, cur) => acc + cur, 0)
        )
          .round(2)
          .done(),
        items: Object.entries(expanses).map(([source, netto]) => ({
          source,
          brutto: 10,
          tax: 10,
          netto,
        })),
      });

      return tableData;
    },
  },
};
</script>

<style lang="scss">
.news .cash-table.v-data-table td {
  border-bottom: none !important;
}
</style>
