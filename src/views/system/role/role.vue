<template>
  <div style="padding:30px;">
    <div class="search-div-bar">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <label class="label-input">角色</label>
            <el-input v-model="searchParam.roleName" class="searchParam-input" size="small" placeholder="请输入内容" />
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-button type="primary" icon="el-icon-search" size="small" @click="handleSearchButtonClick">查询</el-button>
            <el-button type="primary" icon="el-icon-circle-plus" size="small" @click="handleAddButtonClick">新增</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      max-height="100%"
    >
      <el-table-column fixed prop="id" label="ID" width="300" />
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
        :page-sizes="pageSize"
        @pageChange="pageChange"
        @pageSizeChange="pageSizeChange"
      />
    </div>
    <div>
      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
        <el-form label-width="80px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="角色">
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
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormSubmit()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import pagination from '@/components/Pagination/pagination'
import { getList, editRole, addRole } from '@/api/role'

export default {
  name: 'Role',
  components: {
    pagination
  },
  data() {
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
      form: {
        id: null,
        roleName: null,
        description: null
      },
      formLabelWidth: '120px',
      dialogFormVisible: false,
      dialogTitle: '',
      pageSizes: [5, 10, 15]
    }
  },
  mounted() {
    this.getRoleList(this.searchParam)
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
        id: null,
        roleName: null,
        description: null
      }
      this.form = clearForm
      this.dialogTitle = '新增'
      this.dialogFormVisible = true
    },
    editRow: function(index, data) {
      this.dialogTitle = '编辑'
      this.form = data[index]
      this.dialogFormVisible = true
    },
    dialogFormSubmit: function() {
      // 将dialog form updateTime 更新用来驱动table表格updateTime更新，并传回后台
      // const date = new Date()
      // this.form.updateTime = parseTime(date, '{y}-{m}-{d} {h}:{i}:{s}')
      if (this.dialogTitle === '新增') {
        addRole(this.form)
        this.getRoleList(this.searchParam)
      }
      if (this.dialogTitle === '编辑') {
        editRole(this.form)
      }
      this.dialogFormVisible = false
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
