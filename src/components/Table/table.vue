<template>
  <el-table 
    :data="tableData"
    style="width: 100%"
    max-height="100%">
    <el-table-column 
      fixed
      prop="id"
      label="ID"
      width="150">
    </el-table-column>
    <el-table-column
      prop="account"
      label="账号"
      width="140">
    </el-table-column>
    <el-table-column
      prop="username"
      label="用户名"
      width="120">
    </el-table-column>
    <el-table-column 
      prop="age"
      label="年龄"
      width="120">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="电话"
      width="120">
    </el-table-column>
    <el-table-column
      prop="gender"
      label="性别"
      width="120">
    </el-table-column>
    <el-table-column
      prop="departmentName"
      label="部门"
      width="160">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="400">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small"
        >移除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: ['tableData'],
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1)
    }
  }
}
</script>
