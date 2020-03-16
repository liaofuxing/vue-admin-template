<template>
  <el-pagination
    :total="total"
    :current-page="page"
    :page-sizes="[3, 6, 9]"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
  />
</template>

<script>
export default {
  props: {
    page: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 3
    },
    total: {
      type: Number,
      default: 5
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('pageSizeChange', val)
    },
    handleCurrentChange(val) {
      this.$emit('pageChange', val)
    }
  }
}
</script>
