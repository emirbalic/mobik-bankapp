<template>
  <base-dialog 
    :show="dialogOpened" 
    :title="title" 
    :accountId="accountId"
    :dialogText="dialogText" 
    :mode="mode"
    :info="info"
    @close="closeDialog" 
    @completeTransaction="completeTransaction"></base-dialog>


  <div class="container" v-if="!transactionsShown">
    <div class="row h-100 d-flex align-items-center justify-content-center">
      <div class="col-10">
        <h3>ACCOUNT LIST</h3>
        <table class="table table-bordered text-center">
          <thead>
            <tr>
              <th scope="col">TYPE</th>
              <th scope="col">ID</th>
              <th scope="col">BALANCE</th>
              <th scope="col">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="account in accounts" :key="account.id">
              <td>{{ account.type }}</td>
              <td>{{ account.id }}</td>
              <td>{{ account.balance }}</td>
              <td>
                <button
                  type="button"
                  @click="withdraw(account.type, account.id)"
                  class="btn btn-outline-secondary"
                >
                  Withdraw
                </button>
                <button
                  type="button"
                  @click="deposit(account.type, account.id)"
                  class="btn btn-outline-success"
                >
                  Deposit
                </button>
                  <button
                    type="button"
                    @click="seeTransactions(account.id)"
                    class="btn btn-outline-success"
                  >
                    Transactions
                  </button>
                  <button
                    type="button"
                    @click="seeGraphs(account.id)"
                    class="btn btn-outline-success"
                  >
                    Visualize
                  </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <transaction-list :transactions='transactionToShow' @go-back="homePage" v-if="transactionsShown"></transaction-list>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import BaseDialog from '@/components/ui/BaseDialog.vue';
import TransactionList from './TransactionList.vue';
import { IAccount } from '../models/account';
import { ITransaction } from '../models/transaction';
export default defineComponent({
  components: { 
    BaseDialog, 
  TransactionList },
  props: {
    accounts: Object, 
    transactions: Object,
  },
  data() {
    return {
      dialogOpened: false,
      transactionsShown: false,
      dialogText: '',
      title: '',
      transactionToShow: [] as ITransaction[],
      accountId: '',
      mode: '',
      info: ''
    };
  },


  methods: {

    withdraw(accountType: string, accountId: string) {
     
     this.dialogText  = "Withdrawing";
     this.accountId = accountId;
     this.mode = 'form';
     this.dialogOpened = true;
     this.title = accountType + " account -";
      
    },
    deposit(accountType: string, accountId: string) {
      this.dialogText = "Depositing";
      this.accountId = accountId;
      this.mode = 'form';
      this.dialogOpened = true;
      this.title = accountType + " account -";
    },
    seeTransactions(id: string) {
      this.transactionToShow = [];

      if (this.accounts && this.accounts.length > 0) {
        const account = this.accounts.find((a: IAccount) => a.id === id);
        const transactionIds = account.transactions;

        if (
          this.transactions &&
          transactionIds &&
          this.transactions.length > 0
        ) {
          for (let i = 0; i < this.transactions.length; i++) {
            for (let y = 0; y < transactionIds.length; y++) {
              if (this.transactions[i].id === transactionIds[y])
                this.transactionToShow.push(this.transactions[i]);
            }
          }
        }
      }
      this.transactionsShown = true;
    },
    closeDialog() {
      this.dialogOpened = false;
    },
    setForm(info: string) {
        this.dialogOpened = true;
        this.title = 'FOR YOUR';
        this.dialogText = 'INFO';
        this.mode = 'info';
        this.info = info;
    },
    homePage(){
        this.transactionsShown = false;
    },
    seeGraphs()
    {
        //...do stuff
    },
    completeTransaction(amount: number){
         if (this.accounts && this.accounts.length > 0) {

            const account: IAccount = this.accounts.find((a: IAccount) => a.id === this.accountId)
          
            if(account.type === 'Savings')
            {
                if(this.dialogText === 'Withdrawing'){
                    
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    if(account.balance! - amount < account.minimumBalance!){
                        this.setForm('Transaction not allowed, insufficient funds!');
                    } else {
                        account.balance -= amount;
                        this.setForm('Transaction successfull');
                    }

                } else {
                    account.balance += amount;
                    this.setForm('Transaction successfull');
                }
            } else {
                if(this.dialogText === 'Withdrawing'){
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    if(account.balance - amount < account.allowedOverdraftLimit! ){
                        this.setForm('Transaction not allowed, insufficient funds!');
                    } else {
                        account.balance -= amount;
                        this.setForm('Transaction successfull');
                    }

                } else {
                    account.balance += amount;
                    this.setForm('Transaction successfull');
                }
            }
         }
    }
  },
 
});
</script>

<style scoped>
.container {
  padding: 2rem 0rem;
}
.btn {
  --bs-btn-padding-y: 0.25rem;
  --bs-btn-padding-x: 2rem;
  --bs-btn-font-size: 1rem;
}

h4 {
  margin: 2rem 0rem 1rem;
}
</style>