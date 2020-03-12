<template>
  <div style="padding:30px;">
    <tablecomponent :table-data="tableData" />
  </div>
</template>

<script>
import tablecomponent from '@/components/Table/table'
import { getList } from '@/api/table'

export default {
  name: 'User',
  components: {
    tablecomponent
  },
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    const param = {}
    this.getUserList(param)
  },
  methods: {
    getUserList: function(param) {
      getList(param).then(res => {
        this.tableData = res.data
      })
    }
  }
}
</script>

