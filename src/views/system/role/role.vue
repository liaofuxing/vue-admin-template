<template>
  <div style="padding:30px;">
    <div class="search-div-bar">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <label class="label-input">角色</label>
            <el-input v-model="searchParam.roleName" class="searchParam-input" size="small" placeholder="请输入内容" />
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
      :key="Math.random()"
      :data="tableData"
      style="width: 100%"
      max-height="100%"
    >
      <el-table-column type="index" width="300" />
      <el-table-column prop="roleName" label="角色" width="300" />
      <el-table-column prop="description" label="描述" width="300" />
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
        <el-container style="height: auto;">
          <el-aside width="200px">
            <label>编辑菜单权限</label>
            <tree
              :tree-data="treeData"
              :tree-checked="menuTreeChecked"
              :menu-key="Math.random()"
              @treeCheckChange="treeCheckChange"
            />
          </el-aside>
          <el-container>
            <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="角色" prop="roleName">
                    <el-input v-model="form.roleName" class="searchParam-input" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="描述">
                    <el-input v-model="form.description" class="searchParam-input" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-container>
        </el-container>
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
import tree from '@/components/Tree/tree'
import { getList, editRole, addRole, getRoleMenu, validateRoleNameRepeat } from '@/api/role'
import { getMenuTree } from '@/api/menu'

export default {
  name: 'Role',
  components: {
    pagination,
    tree
  },
  data() {
    const validateRoleName = (rule, value, callback) => {
      const validateValue = { 'id': this.form.id, 'roleName': value }
      if (value === null) {
        callback(new Error('请输入角色名'))
      } else {
        validateRoleNameRepeat(validateValue).then(res => {
          if (res.data) {
            callback(new Error('角色已存在'))
          } else {
            callback()
          }
        })
      }
    }
    return {
      tableData: [],
      searchParam: {
        roleName: null,
        // 当前页
        page: 1,
        // 每页多少条
        pageSize: 5,
        // 一共多少条数据
        total: 0
      },
      rules: {
        roleName: [
          { required: true, validator: validateRoleName, trigger: 'blur' }
        ]
      },
      form: {
        id: 0,
        roleName: null,
        description: null,
        treeChecked: []
      },
      formLabelWidth: '120px',
      dialogFormVisible: false,
      dialogTitle: '',
      pageSizes: [5, 10, 15],
      treeData: [],
      menuTreeChecked: []
    }
  },
  mounted() {
    this.getRoleList(this.searchParam)

    // 获取菜单数据
    getMenuTree().then(res => {
      this.treeData = res.data
    })
  },
  methods: {
    getRoleList: function(param) {
      getList(param).then(res => {
        this.tableData = res.data.pageData
        this.searchParam.total = res.data.total
      })
    },
    pageChange: function(page) {
      // 当前页发生变化时
      this.searchParam.page = page
      this.getRoleList(this.searchParam)
    },
    pageSizeChange: function(pageSize) {
      // 一页多少条发生变化时
      this.searchParam.pageSize = pageSize
      this.getRoleList(this.searchParam)
    },
    handleSearchButtonClick: function() {
      this.getRoleList(this.searchParam)
    },
    handleAddButtonClick: function() {
      // 清除form值
      const clearForm = {
        id: 0,
        roleName: null,
        description: null
      }
      this.menuTreeChecked = []
      this.form = clearForm
      this.dialogTitle = '新增'
      this.dialogFormVisible = true
    },
    editRow: function(index, data) {
      this.dialogTitle = '编辑'
      const dataConst = data[index]
      this.form = dataConst
      // 获取角色对应菜单
      getRoleMenu(this.form).then(res => {
        this.menuTreeChecked = []
        if (res.data.length > 0) {
          this.menuTreeChecked = res.data
        }
      })
      this.dialogFormVisible = true
    },
    handleExportButtonClick: function() {

    },
    dialogFormSubmit: function() {
      // 将dialog form updateTime 更新用来驱动table表格updateTime更新，并传回后台
      // const date = new Date()
      // this.form.updateTime = parseTime(date, '{y}-{m}-{d} {h}:{i}:{s}')
      // 应该在then回调里刷新数据，这样能保证，请求到的是更新后的数据
      if (this.menuTreeChecked.length === 0) {
        this.$notify.error({
          title: '错误',
          message: '必须为角色设置菜单权限'
        })
        return
      }
      this.form.treeChecked = this.menuTreeChecked.toString()
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if (this.dialogTitle === '新增') {
            addRole(this.form).then(res => {
              this.getRoleList(this.searchParam)
            })
          }
          if (this.dialogTitle === '编辑') {
            editRole(this.form).then(res => {
              this.getRoleList(this.searchParam)
            })
          }
          this.dialogFormVisible = false
        }
      })
    },
    dialogFormCancel: function() {
      // 重置页面校验
      this.resetForm('ruleForm')
      this.getRoleList(this.searchParam)
      this.dialogFormVisible = false
    },
    treeCheckChange: function(checkedArr) {
      this.menuTreeChecked = checkedArr
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
  .alert-outer-div {
    text-align: center;
  }
  .alert-div {
    position: absolute;
    width: 250px;
    z-index: 100;
    left: 20%;
    top: 20px;
  }
</style>
