<template>
  <the-navbar></the-navbar>
  <account-list :accounts='accounts' :transactions='transactions'></account-list>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import TheNavbar from "./components/layout/TheNavbar.vue";
import AccountList from "./pages/AccountList.vue";

import { IAccount } from "./models/account";
import { ITransaction } from "./models/transaction";

export default defineComponent({
  name: "App",
  components: {
    TheNavbar,
    AccountList,
  },
  data() {
    return {
      accounts: [
        { id: "a1", type: "Savings", balance: 1000, minimumBalance: 1000, transactions:['t1', 't2'] },
        { id: "a2", type: "Current", balance: 6000, maximumOverdraftLimit: -100000, allowedOverdraftLimit: -10000, transactions:['t3', 't4'] },
        { id: "a3", type: "Current", balance: 0, maximumOverdraftLimit: -100000, allowedOverdraftLimit: -15000, transactions:['t5', 't6']  },
        { id: "a4", type: "Savings", balance: 10000, minimumBalance: 1000, },
      ] as IAccount[],

      transactions: [
        {id: 't1', amount: 500, currentBalance: 1500, date: new Date(Date.now()).toLocaleString()},
        {id: 't2', amount: 500, currentBalance: 1000, date: new Date(Date.now()).toLocaleString()},
        {id: 't3', amount: 500, currentBalance: 4500, date: new Date(Date.now()).toLocaleString()},
        {id: 't4', amount: 1500, currentBalance: 6000, date: new Date(Date.now()).toLocaleString()},
        {id: 't5', amount: 500, currentBalance: 1000, date: new Date(Date.now()).toLocaleString()},
        {id: 't6', amount: 500, currentBalance: 0, date: new Date(Date.now()).toLocaleString()},
      ] as ITransaction[],

    };
  },
});
</script>

