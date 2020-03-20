<template>
  <div style="padding:30px;">
    <div class="search-div-bar">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <label class="label-input">部门</label>
            <el-input v-model="searchParam.departmentName" class="searchParam-input" size="small" placeholder="请输入内容" />
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
      <el-table-column prop="departmentName" label="部门" width="300" />
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
      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
        <el-form label-width="80px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="部门">
                <el-input v-model="form.departmentName" class="searchParam-input" />
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
          <el-button @click="dialogFormCancel()">取 消</el-button>
          <el-button type="primary" @click="dialogFormSubmit()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import pagination from '@/components/Pagination/pagination'
import { getList, editDepartment, addDepartment } from '@/api/department'

export default {
  name: 'Department',
  components: {
    pagination
  },
  data() {
    return {
      tableData: [],
      searchParam: {
        departmentName: null,
        // 当前页
        page: 1,
        // 每页多少条
        pageSize: 3,
        // 一共多少条数据
        total: 0
      },
      form: {
        id: null,
        departmentName: null,
        description: null
      },
      formLabelWidth: '120px',
      dialogFormVisible: false,
      dialogTitle: '',
      pageSizes: [3, 6, 9]
    }
  },
  mounted() {
    this.getDepartmentList(this.searchParam)
  },
  methods: {
    getDepartmentList: function(param) {
      getList(param).then(res => {
        this.tableData = res.data.pageData
        this.searchParam.total = res.data.total
      })
    },
    pageChange: function(page) {
      // 当前页发生变化时
      this.searchParam.page = page
      this.getDepartmentList(this.searchParam)
    },
    pageSizeChange: function(pageSize) {
      // 一页多少条发生变化时
      this.searchParam.pageSize = pageSize
      this.getDepartmentList(this.searchParam)
    },
    handleSearchButtonClick: function() {
      this.getDepartmentList(this.searchParam)
    },
    handleAddButtonClick: function() {
      // 清除form值
      const clearForm = {
        id: null,
        departmentName: null,
        description: null
      }
      this.form = clearForm
      this.dialogTitle = '新增'
      this.dialogFormVisible = true
    },
    editRow: function(index, data) {
      this.dialogTitle = '编辑'
      const dataConst = data[index]
      this.form = dataConst
      this.dialogFormVisible = true
    },
    handleExportButtonClick: function() {

    },
    dialogFormSubmit: function() {
      // 将dialog form updateTime 更新用来驱动table表格updateTime更新，并传回后台
      // const date = new Date()
      // this.form.updateTime = parseTime(date, '{y}-{m}-{d} {h}:{i}:{s}')
      // 应该在then回调里刷新数据，这样能保证，请求到的是更新后的数据
      if (this.dialogTitle === '新增') {
        addDepartment(this.form).then(res => {
          this.getDepartmentList(this.searchParam)
        })
      }
      if (this.dialogTitle === '编辑') {
        editDepartment(this.form).then(res => {
          this.getDepartmentList(this.searchParam)
        })
      }
      this.dialogFormVisible = false
    },
    dialogFormCancel: function() {
      this.getDepartmentList(this.searchParam)
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
