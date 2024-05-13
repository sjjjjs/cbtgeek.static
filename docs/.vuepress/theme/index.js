


module.exports = (options, ctx) => {
    const { themeConfig, siteConfig } = ctx
    return {
        plugins: [
            '@vuepress/last-updated',
            ['container', {
                type: 'test',
                before: (info) => {
                    return `<test-container color="${info}">`
                },
                after: () => '</test-container>'
            }]
        ],
        // extend: '@vuepress/theme-default'
    }
}