export default {
    template: `
        <main class="page-add-level">
            <title>Add Level</title>
            <h1>Add a New Level to the Demonlist</h1>
            <p>Fill out the form below to generate a JSON file for a new level. Make sure to follow the instructions in the generated JSON section.</p>
            <form @submit.prevent="generateJson">
                <div class="form-group">
                    <label for="name">Level Name</label>
                    <input type="text" id="name" v-model="level.name" placeholder="e.g. My Awesome Level">
                </div>
                <div class="form-group">
                    <label for="creators">Creators (comma-separated)</label>
                    <input type="text" id="creators" v-model="creators" placeholder="e.g. John Smith, Jane Doe">
                </div>
                <div class="form-group">
                    <label for="verifier">Verifier</label>
                    <input type="text" id="verifier" v-model="level.verifier" placeholder="e.g. John Smith">
                </div>
                <div class="form-group">
                    <label for="verification">Verification Video URL</label>
                    <input type="url" id="verification" v-model="level.verification" placeholder="e.g. https://www.youtube.com/watch?v=...">
                </div>
                <div class="form-group">
                    <label for="percentToQualify">Percent to Qualify</label>
                    <input type="number" id="percentToQualify" v-model.number="level.percentToQualify" min="1" max="100" placeholder="e.g. 75">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="text" id="password" v-model="level.password" placeholder="e.g. 123456">
                </div>
                <button type="submit">Generate Level JSON</button>
            </form>
            <div v-if="generatedJson" class="generated-json" ref="generatedJsonSection">
                <h2>Generated Level JSON</h2>
                <p>Click the "Copy" button to copy the JSON to your clipboard. Then, create a new file in the /data folder named after your level (e.g., My Awesome Level.json) and paste the content. Finally, add the level name to /data/_list.json.</p>
                <button @click="copyJson">Copy JSON</button>
                <span v-if="copied" class="success-message">Copied to clipboard!</span>
            </div>
        </main>
    `,
    data() {
        return {
            level: {
                id: Math.floor(Math.random() * 100000000),
                name: '',
                creators: [],
                verifier: '',
                verification: '',
                percentToQualify: '',
                password: '',
                records: [],
            },
            creators: '',
            generatedJson: null,
            copied: false,
        };
    },
    methods: {
        generateJson() {
            this.level.creators = this.creators.split(',').map(c => c.trim()).filter(c => c);
            if (this.level.password === '') {
                this.level.password = 'Free to Copy';
            }
            if (this.level.percentToQualify === '') {
                this.level.percentToQualify = 100;
            }
            this.generatedJson = JSON.stringify(this.level, null, 4);

            this.$nextTick(() => {
                this.$refs.generatedJsonSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        },
        copyJson() {
            navigator.clipboard.writeText(this.generatedJson).then(() => {
                this.copied = true;
                setTimeout(() => {
                    this.copied = false;
                }, 2000);
            });
        },

    },
};
