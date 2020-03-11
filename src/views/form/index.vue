<template>
  <div class="app-container">
    1111111111111111111
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

