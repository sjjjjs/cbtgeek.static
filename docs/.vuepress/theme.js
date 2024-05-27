import { isPlainObject } from 'vuepress/shared';
import { seoPlugin } from '@vuepress/plugin-seo';
import { sitemapPlugin } from '@vuepress/plugin-sitemap';
import { getDirname, path } from 'vuepress/utils';

const __dirname = getDirname(import.meta.url);
const baseDir = path.resolve(__dirname, '../../');

const localTheme = ({
    hostname,
    seo,
    sitemap
}) => {
    return {
        name: 'vuepress-theme-local',
        alias: {
            '@': path.resolve(baseDir, 'src'),
        },
        clientConfigFile: path.resolve(baseDir, 'src/config.js'),
        define: {
            __APP_VERSION__: '1.0.0'
        },
        templateBuild: path.resolve(baseDir, 'src/templates/build.html'),
        // https://vuepress.vuejs.org/zh/reference/plugin-api.html#extendspage
        extendsPage: (page) => {
            // save title into route meta to generate navbar and sidebar
            page.routeMeta.title = page.title;
        },
        plugins: [
            // @vuepress/plugin-seo
            hostname && seo !== false
                ? seoPlugin({
                    hostname,
                    ...(isPlainObject(seo) ? seo : {}),
                })
                : [],
            // @vuepress/plugin-sitemap
            hostname && sitemap !== false
                ? sitemapPlugin({
                    hostname,
                    ...(isPlainObject(sitemap)
                        ? sitemap
                        : {}),
                })
                : [],
        ]
    }
};

export default localTheme