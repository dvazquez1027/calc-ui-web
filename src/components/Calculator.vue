<template>
  <div style="width: 250px">
    <display :result="result" />
    <keypad @click="onClick($event)" />
  </div>
</template>

<script>
import Keypad from "@/components/Keypad.vue";
import Display from "@/components/Display.vue";
import { CalcDigits, CalcOperations } from "@/common/constants.js";

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
      switch (value) {
        case CalcDigits.ONE:
        case CalcDigits.TWO:
        case CalcDigits.THREE:
        case CalcDigits.FOUR:
        case CalcDigits.FIVE:
        case CalcDigits.SIX:
        case CalcDigits.SEVEN:
        case CalcDigits.EIGHT:
        case CalcDigits.NINE:
        case CalcDigits.ZERO:
          this.$store.dispatch("inputDigit", value);
          break;

        case CalcOperations.CLEAR:
          this.$store.dispatch("inputClear");
          break;

        case CalcOperations.DECIMAL:
          this.$store.dispatch("inputDecimal");
          break;

        case CalcOperations.PLUS:
        case CalcOperations.MINUS:
        case CalcOperations.MULTIPLY:
        case CalcOperations.DIVIDE:
        case CalcOperations.EQUALS:
          this.$store.dispatch("inputOperator", value);
          break;

        default:
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
