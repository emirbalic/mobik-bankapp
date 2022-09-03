<template>
  <div class="container">
    <div class="row h-100 d-flex align-items-center justify-content-center">
      <div class="col-10" v-if="transactions && transactions.length > 0">
        <h3>TRANSACTIONS</h3>
        <table class="table table-bordered text-center">
          <thead>
            <tr>
              <th scope="col">BALANCE</th>
              <th scope="col">AMOUNT</th>
              <th scope="col">DATE</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in transactions" :key="transaction.id">
              <td>{{ transaction.currentBalance }}</td>
              <td>{{ transaction.amount }}</td>
              <td>{{ transaction.date }}</td>
              <td>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-10" v-else-if="transactions.length === 0">
        <h2>You have not made any transactions to this account yet!</h2>
      </div>
                <button
                  type="button"
                  @click="homePage"
                  class="btn btn-outline-secondary float-right"
                >
                  Back
                </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    emits: ['go-back'],
    props: ['transactions'],
    methods: {
        tratosh() {

            console.log(this.transactions)
        },
        homePage(){
            this.$emit('go-back');
        }
    }

});
</script>

<style scoped>
button{
    min-width: 13rem;
    max-width: 13rem;
    margin-right: 0;
}
</style>