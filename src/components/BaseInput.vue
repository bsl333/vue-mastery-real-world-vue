<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input v-bind="$attrs" v-on="listeners" :value="value" step=".01" />
  </div>
</template>

<script>
  export default {
    name: 'BaseInput',
    inheritAttrs: false,
    props: {
      label: {
        type: String,
        default: ''
      },
      value: {
        type: [String, Number],
        default: ''
      }
    },
    methods: {
      handleInput(e) {
        this.$emit('input', e.target.value);
      }
    },
    computed: {
      listeners() {
        return {
          ...this.$listeners,
          input: this.handleInput
        };
      }
    }
  };
</script>

<style></style>
