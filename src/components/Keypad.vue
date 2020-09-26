<template>
  <div>
    <b-container>
      <b-row>
        <b-col cols="9" class="pad">
          <b-row>
            <b-col cols="6" style="padding-right: 1px">
              <calc-button
                :keyCap="CalcOperations.CLEAR"
                @click="onClick($event)"
              />
            </b-col>
            <b-col cols="6" style="padding-left: 1px">
              <calc-button
                :keyCap="CalcOperations.CLEAR_ALL"
                @click="onClick($event)"
              />
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="3" class="pad">
          <calc-button
            :keyCap="CalcOperations.DIVIDE"
            @click="onClick($event)"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="3" class="pad">
          <calc-button :keyCap="CalcDigits.ONE" @click="onClick($event)" />
        </b-col>
        <b-col cols="3" class="pad">
          <calc-button :keyCap="CalcDigits.TWO" @click="onClick($event)" />
        </b-col>
        <b-col cols="3" class="pad">
          <calc-button :keyCap="CalcDigits.THREE" @click="onClick($event)" />
        </b-col>
        <b-col cols="3" class="pad">
          <calc-button
            :keyCap="CalcOperations.MULTIPLY"
            @click="onClick($event)"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="3" class="pad">
          <calc-button :keyCap="CalcDigits.FOUR" @click="onClick($event)" />
        </b-col>
        <b-col cols="3" class="pad">
          <calc-button :keyCap="CalcDigits.FIVE" @click="onClick($event)" />
        </b-col>
        <b-col cols="3" class="pad">
          <calc-button :keyCap="CalcDigits.SIX" @click="onClick($event)" />
        </b-col>
        <b-col cols="3" class="pad">
          <calc-button
            :keyCap="CalcOperations.MINUS"
            @click="onClick($event)"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="3" class="pad">
          <calc-button :keyCap="CalcDigits.SEVEN" @click="onClick($event)" />
        </b-col>
        <b-col cols="3" class="pad">
          <calc-button :keyCap="CalcDigits.EIGHT" @click="onClick($event)" />
        </b-col>
        <b-col cols="3" class="pad">
          <calc-button :keyCap="CalcDigits.NINE" @click="onClick($event)" />
        </b-col>
        <b-col cols="3" class="pad">
          <calc-button :keyCap="CalcOperations.PLUS" @click="onClick($event)" />
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6" class="pad">
          <calc-button :keyCap="CalcDigits.ZERO" @click="onClick($event)" />
        </b-col>
        <b-col cols="3" class="pad">
          <calc-button
            :keyCap="CalcOperations.DECIMAL"
            @click="onClick($event)"
          />
        </b-col>
        <b-col cols="3" class="pad">
          <calc-button
            :keyCap="CalcOperations.EQUALS"
            @click="onClick($event)"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import CalcButton from "@/components/CalcButton.vue";
import { CalcDigits, CalcOperations } from "@/common/constants.js";

export default {
  name: "Keypad",
  components: {
    "calc-button": CalcButton
  },
  created() {
    this.CalcDigits = CalcDigits;
    this.CalcOperations = CalcOperations;
  },
  methods: {
    onClick(value) {
      this.$emit("click", value);
    }
  }
};
</script>

<style lang="scss" scoped>
.pad {
  padding: 2px;
}
</style>
