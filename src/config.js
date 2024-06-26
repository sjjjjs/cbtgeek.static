import { defineClientConfig } from 'vuepress/client';
import Version from '@/components/Version.vue'
import Layout from '@/layouts/Layout.vue';
import NotFound from '@/layouts/NotFound.vue';
import LayoutArticle from '@/layouts/LayoutArticle.vue';
import ProductDetail from '@/layouts/ProductDetail.vue';
import EmptyLayout from '@/layouts/EmptyLayout.vue';

import '@/styles/index.css';

export default defineClientConfig({
    enhance({ app}) {
        app.component('Version', Version)
    },
    layouts: {
        Layout,
        NotFound,
        LayoutArticle,
        ProductDetail,
        EmptyLayout
    },
})
