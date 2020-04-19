<template>
  <div>
    <label v-if="label"> {{ label }} </label>
    <select @input="handleSelect" v-bind="$attrs">
      <option v-if="optionPlaceholder" value="">
        {{ optionPlaceholder }}
      </option>
      <option
        v-for="option in options"
        :value="option"
        :key="option"
        :selected="option === value"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
  export default {
    name: 'BaseSelect',
    inheritAttrs: false,
    props: {
      label: {
        type: String,
        default: ''
      },
      options: {
        type: Array,
        required: true,
        validator(options) {
          return options.length > 0;
        }
      },
      optionPlaceholder: {
        type: String
      },
      value: {
        type: [String, Number]
      }
    },
    methods: {
      handleSelect(e) {
        this.$emit('input', e.target.value);
      }
    }
  };
</script>
