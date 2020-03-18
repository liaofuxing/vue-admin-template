<template>
  <el-tree
    ref="menuTree"
    :key="menuKey"
    :data="treeData"
    show-checkbox
    node-key="id"
    :default-checked-keys="treeChecked"
    :default-expanded-keys="treeChecked"
    @check-change="handleCheckChange"
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
    },
    treeChecked: {
      type: Array,
      default: function() {
        return []
      }
    },
    menuKey: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleCheckChange: function(data, checked, indeterminate) {
      this.$emit('treeCheckChange', this.$refs.menuTree.getCheckedKeys())
    }
  }
}
</script>

<style scoped>

</style>

