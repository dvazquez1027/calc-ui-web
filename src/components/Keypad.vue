<template>
  <div>
    <b-container>
      <b-row>
        <b-col cols="9" class="pad">
          <b-row>
            <b-col cols="6" style="padding-right: 1px">
              <calc-button
                text="C"
                :value="CalcOperations.CLEAR"
                @click="onClick($event)"
              />
            </b-col>
            <b-col cols="6" style="padding-left: 1px">
              <calc-button
                text="AC"
                :value="CalcOperations.CLEAR_ALL"
                @click="onClick($event)"
              />
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="3" class="pad">
          <calc-button
            text="/"
            :value="CalcOperations.DIVIDE"
            @click="onClick($event)"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="3" class="pad">
          <calc-button text="1" :value="1" @click="onClick($event)" />
        </b-col>
        <b-col cols="3" class="pad">
          <calc-button text="2" :value="2" @click="onClick($event)" />
        </b-col>
        <b-col cols="3" class="pad">
          <calc-button text="3" :value="3" @click="onClick($event)" />
        </b-col>
        <b-col cols="3" class="pad">
          <calc-button
            text="*"
            :value="CalcOperations.MULTIPLY"
            @click="onClick($event)"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="3" class="pad">
          <calc-button text="4" :value="4" @click="onClick($event)" />
        </b-col>
        <b-col cols="3" class="pad">
          <calc-button text="5" :value="5" @click="onClick($event)" />
        </b-col>
        <b-col cols="3" class="pad">
          <calc-button text="6" :value="6" @click="onClick($event)" />
        </b-col>
        <b-col cols="3" class="pad">
          <calc-button
            text="-"
            :value="CalcOperations.MINUS"
            @click="onClick($event)"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="3" class="pad">
          <calc-button text="7" :value="7" @click="onClick($event)" />
        </b-col>
        <b-col cols="3" class="pad">
          <calc-button text="8" :value="8" @click="onClick($event)" />
        </b-col>
        <b-col cols="3" class="pad">
          <calc-button text="9" :value="9" @click="onClick($event)" />
        </b-col>
        <b-col cols="3" class="pad">
          <calc-button
            text="+"
            :value="CalcOperations.PLUS"
            @click="onClick($event)"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6" class="pad">
          <calc-button text="0" :value="0" @click="onClick($event)" />
        </b-col>
        <b-col cols="3" class="pad">
          <calc-button
            text="."
            :value="CalcOperations.DECIMAL"
            @click="onClick($event)"
          />
        </b-col>
        <b-col cols="3" class="pad">
          <calc-button
            text="="
            :value="CalcOperations.EQUALS"
            @click="onClick($event)"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import CalcButton from "@/components/CalcButton.vue";
import CalcOperations from "@/common/constants.js";

export default {
  name: "Keypad",
  components: {
    "calc-button": CalcButton
  },
  created() {
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
