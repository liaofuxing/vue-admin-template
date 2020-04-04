<template>
  <div style="padding:30px;">
    <el-table
      :data="tableData"
      style="width: 100%"
      max-height="100%"
    >
      <el-table-column type="index" width="100" />
      <el-table-column prop="account" label="账号" width="240" />
      <el-table-column prop="username" label="用户名" width="220" />
      <el-table-column prop="phone" label="电话" width="220" />
      <el-table-column prop="departmentId" :formatter="formatDepartment" label="部门" width="160" />
      <el-table-column prop="updateTime" label="更新时间" width="200" />
      <el-table-column
        fixed="right"
        label="操作"
        width="120"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="forceOffline(scope.$index, tableData)"
          >强制下线</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getRoleSelect, getDepartmentSelect, getUserOnline, userForceOffline } from '@/api/user'

export default {
  name: 'UserOnline',
  data() {
    return {
      tableData: [],
      genderOption: [
        { label: '男', value: 1 },
        { label: '女', value: 2 }
      ],
      enabledFlagOption: [
        { label: '是', value: 1 },
        { label: '否', value: 0 }
      ],
      roleOption: [],
      departmentOption: [],
      dialogTitle: ''
    }
  },
  mounted() {
    this.getUserOnlineList()
    // 获取角色列表（下拉框）
    getRoleSelect().then(res => {
      this.roleOption = res.data
    })
    // 获取部门下拉
    getDepartmentSelect().then(res => {
      this.departmentOption = res.data
    })
  },
  methods: {
    formatGender: function(row, column) {
      return row.gender === 1 ? '男' : row.gender === 2 ? '女' : '未知'
    },
    formatDepartment: function(row, column) {
      let label = ''
      this.departmentOption.forEach(element => {
        if (row.departmentId === element.value) {
          label = element.label
        }
      })
      return label
    },
    formatenabledFlag: function(row, column) {
      return row.enabledFlag === 0 ? '否' : row.enabledFlag === 1 ? '是' : '否'
    },
    getUserOnlineList: function() {
      getUserOnline().then(res => {
        this.tableData = res.data
      })
    },
    forceOffline(index, tableData) {
      this.$confirm('确定要将该用户强制下线吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = { userId: tableData[index].id }
        userForceOffline(params).then(res => {
          this.tableData = res.data
        })
      }).catch(() => {
        console.log('取消操作')
      })
    }
  }
}
</script>

<style scope>
  .search-div-bar {
    margin-bottom: 20px;
  }
  .label-input {
    padding-right: 50px;
    color: #909399;
  }
  .searchParam-input {
    width: 200px;
  }
  .pagination-div {
    margin-top: 20px;
    text-align: center;
  }
</style>
