<template>
  <div style="padding:30px;">
    <div class="search-div-bar">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <label class="label-input">用户名</label>
            <el-input v-model="searchParam.username" class="searchParam-input" size="small" placeholder="请输入内容" />
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <label class="label-input">账号</label>
            <el-input v-model="searchParam.account" class="searchParam-input" size="small" placeholder="请输入内容" />
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <label class="label-input">电话</label>
            <el-input v-model="searchParam.phone" class="searchParam-input" size="small" placeholder="请输入内容" />
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-button type="primary" icon="el-icon-search" size="small" @click="handleSearchButtonClick">搜索</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      max-height="100%"
    >
      <el-table-column fixed prop="id" label="ID" width="150" />
      <el-table-column prop="account" label="账号" width="140" />
      <el-table-column prop="username" label="用户名" width="120" />
      <el-table-column prop="age" label="年龄" width="120" />
      <el-table-column prop="phone" label="电话" width="120" />
      <el-table-column prop="gender" label="性别" width="120" />
      <el-table-column prop="departmentName" label="部门" width="160" />
      <el-table-column prop="address" label="地址" width="400" />
      <el-table-column
        fixed="right"
        label="操作"
        width="120"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="deleteRow(scope.$index, tableData)"
          >移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-div">
      <pagination
        :page="searchParam.page"
        :page-size="searchParam.pageSize"
        :total="searchParam.total"
        @pageChange="pageChange"
        @pageSizeChange="pageSizeChange"
      />
    </div>
  </div>
</template>

<script>
import pagination from '@/components/Pagination/pagination'
import { getList } from '@/api/table'

export default {
  name: 'User',
  components: {
    pagination
  },
  data() {
    return {
      tableData: [],
      searchParam: {
        account: null,
        username: null,
        phone: null,
        // 当前页
        page: 1,
        // 每页多少条
        pageSize: 3,
        // 一共多少条数据
        total: 0
      }
    }
  },
  mounted() {
    this.getUserList(this.searchParam)
  },
  methods: {
    getUserList: function(param) {
      getList(param).then(res => {
        this.tableData = res.data.pageDate
        this.searchParam.total = res.data.total
      })
    },
    pageChange: function(page) {
      // 当前页发生变化时
      this.searchParam.page = page
      this.getUserList(this.searchParam)
    },
    pageSizeChange: function(pageSize) {
      // 一页多少条发生变化时
      this.searchParam.pageSize = pageSize
      this.getUserList(this.searchParam)
    },
    handleSearchButtonClick: function() {
      this.getUserList(this.searchParam)
    }
  }
}
</script>

<style scope>
  .search-div-bar {
    margin-bottom: 20px;
  }
  .label-input {
    padding: 20px;
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
