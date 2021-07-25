<template>
  <div id="calculator">
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
  props: {
    type: {
      type: String,
      default: "internal"
    }
  },
  computed: {
    result() {
      return this.$store.getters[this.namespace + "result"];
    },
    namespace() {
      return this.type + "/";
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
          this.$store.dispatch(this.namespace + "inputDigit", value);
          break;

        case CalcOperations.CLEAR:
          this.$store.dispatch(this.namespace + "inputClear");
          break;

        case CalcOperations.CLEAR_ALL:
          this.$store.dispatch(this.namespace + "inputClearAll");
          break;

        case CalcOperations.DECIMAL:
          this.$store.dispatch(this.namespace + "inputDecimal");
          break;

        case CalcOperations.PLUS:
        case CalcOperations.MINUS:
        case CalcOperations.MULTIPLY:
        case CalcOperations.DIVIDE:
        case CalcOperations.EQUALS:
          this.$store.dispatch(this.namespace + "inputOperator", value);
          break;

        default:
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
div #calculator {
  width: 250px;
  margin: auto;
}
</style>
