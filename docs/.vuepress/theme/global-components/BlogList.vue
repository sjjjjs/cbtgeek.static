<template>
  <div class="blog-list">
    <el-table :data="blogs">
      <el-table-column label="名称">
        <template #default="{ row }">
          <el-link :href="row.path">{{ row.title || "[unknown]" }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="预览图">
        <template #default="{ row }">
          <el-image
            style="width: 100px; height: 100px"
            :src="row.frontmatter.imageUrl"
            :fit="fit"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="key" label="key"></el-table-column>
      <el-table-column
        prop="author"
        label="row.frontmatter.imageUrl.author"
      ></el-table-column>
      <el-table-column
        prop="relativePath"
        label="relativePath"
      ></el-table-column>
      <el-table-column prop="lastUpdated" label="lastUpdated"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "blog-list",
  computed: {
    blogs() {
      return this.$site.pages.filter((page) => {
        return page.regularPath.startsWith("/blog/");
      });
    },
  },
};
</script>

<style>
</style>