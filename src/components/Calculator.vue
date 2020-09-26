<template>
  <div style="width: 250px">
    <display :result="result" />
    <keypad @click="onClick($event)" />
  </div>
</template>

<script>
import Keypad from "@/components/Keypad.vue";
import Display from "@/components/Display.vue";
import CalcOperations from "@/common/constants.js";

export default {
  name: "Calculator",
  components: {
    keypad: Keypad,
    display: Display
  },
  computed: {
    result() {
      return this.$store.getters.result;
    }
  },
  methods: {
    onClick(value) {
      if (value >= 0 && value <= 9) {
        this.$store.commit("inputDigit", value);
      } else if (value === CalcOperations.CLEAR) {
        this.$store.commit("clear");
      } else if (value === CalcOperations.DECIMAL) {
        this.$store.commit("inputDecimal");
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
