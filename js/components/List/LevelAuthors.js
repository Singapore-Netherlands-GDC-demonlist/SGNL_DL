export default {
    props: {
        creators: {
            type: Array,
            required: true,
        },
        verifier: {
            type: String,
            required: true,
        },
    },
    template: `
        <div class="level-authors">
            <template v-if="creators.length > 0">
                <div class="type-title-sm">Creators</div>
                <p class="type-body">
                    <template v-for="(creator, index) in creators" :key="\`creator-\$\{creator\}\`">
                        <span >{{ creator }}</span
                        ><span v-if="index < creators.length - 1">, </span>
                    </template>
                </p>
            </template>
            <div class="type-title-sm">Verifier</div>
            <p class="type-body">
                <span>{{ verifier }}</span>
            </p>
        </div>
    `,
};
