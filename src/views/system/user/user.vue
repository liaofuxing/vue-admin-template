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
            @click.native.prevent="editRow(scope.$index, tableData)"
          >修改</el-button>
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
    <div>
      <el-dialog title="编辑" :visible.sync="dialogFormVisible">
        <el-form label-width="80px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="用户名">
                <el-input v-model="form.username" class="searchParam-input" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="账号">
                <el-input v-model="form.account" class="searchParam-input" :disabled="true" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="性别">
                <el-select v-model="form.gender" placeholder="请选择">
                  <el-option
                    v-for="item in genderOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="地址">
                <el-input v-model="form.address" class="searchParam-input" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="年龄">
                <el-input v-model="form.age" class="searchParam-input" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电话">
                <el-input v-model="form.phone" class="searchParam-input" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="角色">
                <el-select v-model="form.role" placeholder="请选择">
                  <el-option
                    v-for="item in roleOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="部门">
                <el-select v-model="form.department" placeholder="请选择">
                  <el-option
                    v-for="item in roleOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import pagination from '@/components/Pagination/pagination'
import { getList } from '@/api/table'

import { getRoleList } from '@/api/user'

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
      },
      form: {
        username: null,
        account: null,
        gender: null,
        age: null,
        address: null,
        phone: null,
        role: null,
        department: null
      },
      formLabelWidth: '120px',
      dialogFormVisible: false,
      genderOption: [
        { label: '男', value: 1 },
        { label: '女', value: 2 }
      ],
      roleOption: []
    }
  },
  mounted() {
    this.getUserList(this.searchParam)
  },
  methods: {
    getUserList: function(param) {
      getList(param).then(res => {
        this.tableData = res.data.pageData
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
    },
    editRow: function(index, data) {
      this.form.account = data[index].account
      this.form.username = data[index].username
      this.form.age = data[index].age
      this.form.address = data[index].address
      this.form.phone = data[index].phone
      this.form.gender = 1
      // 获取角色列表
      getRoleList().then(res => {
        this.roleOption = res.data
      })
      this.dialogFormVisible = true
    },
    dialogFormSubmit: function() {
      console.log(this.form.account)
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
