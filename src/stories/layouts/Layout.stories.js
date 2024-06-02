import Layout from '@/layouts/Layout.vue';
import MockContent from '@/components/MockContent.vue';

Layout.components = {
    ...Layout.components,
    Content: MockContent
}

export default {
    title: 'Layouts/Layout',
    component: Layout,
    tags: ['autodocs'],
}

export const Standard = {
    render: (args) => ({
        components: { Layout },
        setup() {
            return { args };
        },
        template: '<Layout v-bind="args"></Layout>',
    }),
    args: {
        primary: true,
        label: 'Button',
    },
};
