<template>
  <teleport to="body">
      <transition name="animateDialog">
        <dialog open v-if="show" >

          <header>
            <slot name="header">
              <h2>{{ title }} {{ dialogText }}</h2>
            </slot>
          </header>

          <div v-if="mode === 'info'" >
            <p>{{ info }}</p>
            <button
              type="button"
              class="btn btn-outline-secondary centre"
              @click="closeDialog"
            >
              Quit
            </button>
          </div>

          <form class="justify-content-center" v-if="mode === 'form'" >
            <div class="mb-4">
              <label for="amount" class="form-label" >Amount</label>
              <input
                type="number"
                class="form-control"
                v-model="amount"
                @blur="validateInput"
                :class="{ invalid: amountValid ==='invalid' }"
              />
              <h4 v-if="amountValid === 'invalid'">
                Please enter the amount! No negative values
              </h4>
            </div>
            <div class="row mb-4">
              <button
                type="button"
                class="btn btn-outline-success"
                @click="submitForm"
              >
                Confirm
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="quitDialog"
              >
                Quit
              </button>
            </div>
          </form>
        </dialog>
      </transition>
  </teleport>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  emits: ['close', 'completeTransaction'],
  data() {
    return {
      amount: null,
      amountValid: 'pending',
    };
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    dialogText: {
      type: String,
      required: true,
    },
    accountId: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
    info: {
      type: String,
      required: false,
    },
  },
  methods: {
    closeDialog() {
      this.amountValid = 'pending';
      this.$emit('close');
    },
    quitDialog() {
      this.amount = null;
      this.amountValid = 'pending';
      this.$emit('close');
    },
    submitForm() {
  
      this.validateInput()
      if(this.amountValid === 'invalid') return;
      this.closeDialog();
      this.$emit('completeTransaction', this.amount);
      this.amount = null;
    },
    validateInput() {
      if (!this.amount || this.amount < 0) {
        this.amountValid = 'invalid';
      } else {
        this.amountValid = 'valid';
      }
    },
  },
});
</script>

<style scoped>

.animateDialog-enter-from,
.animateDialog-leave-to {
  opacity: 0;
  transform: scale(0.6);
}

.animateDialog-enter-active {
  transition: all .3s ease-out;
}

.animateDialog-leave-active {
  transition: all .3s ease-in;
}

.animateDialog-enter-to,
.animateDialog-leave-from {
  opacity: 1;
  transform: scale(1);
}

.centre{
  width: 50%;
  margin: 0 auto;
}

p {
  font-size: 2rem;
}

form {
  padding-left: 4rem;
}
input {
  width: 33rem;
}

button {
  display: flex;
  justify-content: space-evenly;
  width: 13rem;
  margin: 0 20px;
}

input.form-control.invalid {
  border-color: red;
}


dialog {
  position: fixed;
  top: 35vh;
  min-height: 15rem;
  left: 10%;
  width: 80%;
  z-index: 100;
  border-radius: 4px;
  border: 1px solid;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;
}

header {
  background-color: #e9dd70;
  color: black;
  width: 100%;
  padding: 1rem;
}

header h2 {
  margin: 0;
}

section {
  padding: 1rem;
}

menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}



@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>