<template>
  <el-tree
    :data="treeData"
    show-checkbox
    node-key="id"
    :default-expanded-keys="[1, 2]"
    :default-checked-keys="[5]"
    :props="defaultProps"
  />
</template>

<script>
export default {
  props: {
    treeData: {
      type: Array,
      default: function() {
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>

