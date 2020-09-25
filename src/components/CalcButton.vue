<template>
    <div>
        <b-button variant="secondary" @click="onClick()">{{ text }}</b-button>
    </div>
</template>

<script>
    export default {
        name: "CalcButton",
        props: {
            text: {
                type: String,
                required: true
            },
            value: {
                type: Number,
                required: true
            }
        },
        methods: {
            onClick () {
                this.$emit('click', this.value);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>