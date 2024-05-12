<template>
  <MyPage>
    <el-row class="product-page" :gutter="20">
      <el-col :span="6" class="product-page--category">
        <el-table :data="categoryList">
          <el-table-column label="Category">
            <template #default="{ row }">
              <router-link :to="row.path">
                {{ row.frontmatter.category.title || row.title }}
              </router-link>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="18" class="product-page--content">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.path">
            <router-link v-if="item.type === 'dir'" :to="item.path">{{
              item.name
            }}</router-link>
            <span v-else>{{ item.name }}</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
        <div v-if="isDir" class="product-list">
          <el-table :data="productList">
            <el-table-column label="Product List">
              <template #default="{ row }">
                <el-avatar
                  shape="square"
                  :size="80"
                  :src="row.frontmatter.product.thumbnail"
                ></el-avatar>
                <router-link :to="row.path">
                  {{ row.frontmatter.product.title || row.title }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column></el-table-column>
          </el-table>
        </div>
        <ProductDetail v-else>
          <slot></slot>
        </ProductDetail>
      </el-col>
    </el-row>
  </MyPage>
</template>
  
<script>
import MyPage from "./MyPage.vue";
import ProductDetail from "./ProductDetail.vue";
import {
  parsePath,
  isDirectFileOfDir,
  isDirectDirOfDir,
} from "./ProductPage.util";

export default {
  components: {
    MyPage,
    ProductDetail,
  },
  computed: {
    breadcrumbs() {
      return parsePath(this.$page.path).map((item) => {
        item.name = decodeURIComponent(item.name || "home")
          .replace(/\.html$/i, "")
          .toUpperCase();
        return item;
      });
    },
    isDir() {
      return this.$page.relativePath.toLowerCase().endsWith("readme.md");
    },
    productList() {
      return this.$site.pages.filter((page) => {
        return isDirectFileOfDir(page.path, this.$page.path);
      });
    },
    categoryList() {
      return this.$site.pages.filter((page) => {
        return isDirectDirOfDir(page.path, this.$page.path);
      });
    },
  },
};
</script>
  
<style>
</style>