import EmptyLayout from '@/layouts/EmptyLayout.vue';
import MockContent from '@/components/MockContent.vue';

EmptyLayout.components = {
    ...EmptyLayout.components,
    Content: MockContent
}

export default {
    title: 'Layouts/EmptyLayout',
    component: EmptyLayout,
    tags: ['autodocs'],
}

export const Standard = {
    render: (args) => ({
        components: { EmptyLayout },
        setup() {
            return { args };
        },
        template: '<EmptyLayout v-bind="args"></EmptyLayout>',
    }),
    args: {
        primary: true,
        label: 'Button',
    },
};
