


module.exports = (options, ctx) => {
    const { themeConfig, siteConfig } = ctx
    return {
        plugins: ['@vuepress/last-updated'],
        // extend: '@vuepress/theme-default'
    }
}