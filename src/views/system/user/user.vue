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
            <el-button type="primary" icon="el-icon-search" size="small" @click="handleSearchButtonClick">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="action-div-bar">
      <el-button type="primary" icon="el-icon-circle-plus" size="small" @click="handleAddButtonClick">新增</el-button>
      <el-button type="success" icon="el-icon-download" size="small" @click="handleExportButtonClick">导出</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      max-height="100%"
    >
      <el-table-column type="index" width="100" />
      <el-table-column prop="account" label="账号" width="140" />
      <el-table-column prop="username" label="用户名" width="120" />
      <el-table-column prop="age" label="年龄" width="120" />
      <el-table-column prop="phone" label="电话" width="120" />
      <el-table-column prop="gender" label="性别" :formatter="formatGender" width="120" />
      <el-table-column prop="departmentId" :formatter="formatDepartment" label="部门" width="160" />
      <el-table-column prop="address" label="地址" width="300" />
      <el-table-column prop="enabledFlag" :formatter="formatenabledFlag" label="是否停用" width="120" />
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
        :page-sizes="pageSizes"
        @pageChange="pageChange"
        @pageSizeChange="pageSizeChange"
      />
    </div>
    <div>
      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :show-close="false">
        <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username" class="searchParam-input" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="账号" prop="account">
                <el-input v-model="form.account" class="searchParam-input" :disabled="true" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="性别" prop="gender">
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
              <el-form-item label="地址" prop="address">
                <el-input v-model="form.address" class="searchParam-input" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="年龄" prop="age">
                <el-input v-model="form.age" class="searchParam-input" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电话" prop="phone">
                <el-input v-model="form.phone" class="searchParam-input" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="角色" prop="roleId">
                <el-select v-model="form.roleId" placeholder="请选择">
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
              <el-form-item label="部门" prop="departmentId">
                <el-select v-model="form.departmentId" placeholder="请选择">
                  <el-option
                    v-for="item in departmentOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="是否停用">
                <el-select v-model="form.enabledFlag" placeholder="请选择">
                  <el-option
                    v-for="item in enabledFlagOption"
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
          <el-button @click="dialogFormCancel()">取 消</el-button>
          <el-button type="primary" @click="dialogFormSubmit()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import pagination from '@/components/Pagination/pagination'
import { getRoleSelect, getDepartmentSelect, getList, editUser, addUser, validateUsernameRepeat } from '@/api/user'
import { parseTime } from '@/utils/index'

export default {
  name: 'User',
  components: {
    pagination
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      const validateValue = { 'id': this.form.id, 'username': value }
      if (value === null) {
        callback(new Error('请输入用户名'))
      } else {
        validateUsernameRepeat(validateValue).then(res => {
          if (res.data) {
            callback(new Error('用户名已存在'))
          } else {
            callback()
          }
        })
      }
    }
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
      pageSizes: [3, 6, 9],
      form: {
        id: 0,
        username: null,
        account: null,
        gender: null,
        age: null,
        address: null,
        phone: null,
        roleId: null,
        departmentId: null,
        updateTime: null,
        enabledFlag: null
      },
      rules: {
        username: [
          { required: true, validator: validateUsername, trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入菜单路径', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: '请选择角色', trigger: 'blur' }
        ],
        departmentId: [
          { required: true, message: '请选择部门', trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px',
      dialogFormVisible: false,
      genderOption: [
        { label: '男', value: 1 },
        { label: '女', value: 2 }
      ],
      enabledFlagOption: [
        { label: '否', value: 0 },
        { label: '是', value: 1 }
      ],
      roleOption: [],
      departmentOption: [],
      dialogTitle: ''
    }
  },
  mounted() {
    this.getUserList(this.searchParam)
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
      this.dialogTitle = '编辑'
      this.form = data[index]
      this.dialogFormVisible = true
    },
    handleAddButtonClick: function() {
      // 清除form值
      const clearForm = {
        id: 0,
        username: null,
        account: null,
        gender: null,
        age: null,
        address: null,
        phone: null,
        roleId: null,
        departmentId: null,
        creationTime: null,
        updateTime: null
      }
      this.form = clearForm
      this.form.account = this.getUuid()
      this.dialogTitle = '新增'
      this.dialogFormVisible = true
    },
    handleExportButtonClick: function() {

    },
    dialogFormSubmit: function() {
      // const validate = this.validateRepeat(this.form.username)
      // if (true) {
      // this.$refs['ruleForm'].fields[0].error
      // }
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          const date = new Date()
          const dateParse = parseTime(date, '{y}-{m}-{d} {h}:{i}:{s}')
          if (this.dialogTitle === '新增') {
            this.form.creationTime = dateParse
            this.form.updateTime = dateParse
            addUser(this.form).then(res => {
              this.getUserList(this.searchParam)
            })
          }
          if (this.dialogTitle === '编辑') {
            // 将dialog form updateTime 更新用来驱动table表格updateTime更新，并传回后台
            this.form.updateTime = dateParse
            editUser(this.form).then(res => {
              this.getUserList(this.searchParam)
            })
          }
          this.dialogFormVisible = false
        }
      })
    },
    dialogFormCancel: function() {
      this.resetForm('ruleForm')
      this.getUserList(this.searchParam)
      this.dialogFormVisible = false
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    getUuid: function() {
      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
      }
      return (S4() + S4())
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
