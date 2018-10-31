<template>
    <div class="container rootContainer">
        <nav class="navbar navbar-light bg-light">
            <a class="navbar-brand" href="#"><h1>Navbar</h1></a>
        </nav>
        <div class="row innerContainer">
            <div class="col-sm-2 side">
                <div class="sideContentConteiner">
                    <navi-content />
                </div>
            </div>
            <div class="col-sm-10 main">
                <div :class="'mainContentContainer ' + (subShow ? 'mainContentContainer-grid' : 'mainContentContainer-block')">
                    <div class="mainContentMain">
                        <h2>category:<span>{{category}}</span></h2>
                        <p>main</p>
                        <button type="button" class="btn btn-primary" v-on:click="onToggleSub" :disabled="subShowEnabled">toggle sub</button>
                        <p>{{books.length}}/{{uncategorized.length}}</p>
                    </div>
                    <div :class="'mainContentSub ' + (subShow ? '' : 'mainContentSub-hide')">
                        <p>sub</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import NaviContent from './NaviContent.vue';
export default {
    data: function() {
        return {
            subShow: false,
            subShowEnabled: true
        };
    },
    computed: {
        category: function() {
            const path = this.$route.path.substring(1);
            const category = path === '' ? 'all' : path;
            if (category === 'all') { this.subShowEnabled = true; }
            else { this.subShowEnabled = false; }
            return category;
        },
        books: function() {
            const all = this.$store.getters.books;
            const categories = this.$store.getters.categories;
            const current = this.category;
            const category = categories.find((elm) => elm.name === current);
            if (category === void 0) return all;
            let filtered = [];
            category.books.forEach(elm => {
                const found = all.find(one => one._id === elm);
                if (found) filtered = [...filtered, found];
            });
            return filtered;
        },
        uncategorized: function() {
            const all = this.$store.getters.books;
            const categories = this.$store.getters.categories;
            const current = this.category;
            const category = categories.find((elm) => elm.name === current);
            if (category === void 0) return [];
            let filtered = [];
            category.books.forEach(elm => {
                const found = all.filter(one => one._id !== elm);
                if (found) filtered = [...filtered, ...found];
            });
            return filtered;
        }
    },
    components: {
        NaviContent
    },
    methods: {
        onToggleSub: function() {
            this.subShow = !this.subShow;
        }
    }
}
</script>
<style scoped>
h1 {
    margin: 0px;
    font-size: 24px;
}
.rootContainer {
    height: 100%;
}
.innerContainer {
    height: calc(100% - 56px);
}
.sideContentConteiner, .mainContentContainer {
    margin: 0px 8px;
}
.mainContentContainer {
    height: 100%;
}
.mainContentContainer-block {
    display: block;
}
.mainContentContainer-grid {
    display: grid;
    grid-template-rows: auto auto;
}
.mainContentMain {
    min-height: 200px;
}
.mainContentSub {
    overflow-y: auto;
    min-height: 200px;
}
.mainContentSub-hide {
    display: none;
}
</style>
