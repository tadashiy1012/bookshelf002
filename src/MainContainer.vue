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
                        <div class="contentHeader">
                            <h2>category:<span>{{category}}</span> <span>count:{{books.length}}</span></h2>
                            <button type="button" class="btn btn-primary"
                                :disabled="subShowEnabled"
                                v-on:click="onToggleSub">
                                add or remove book
                            </button>
                        </div>
                        <ul class="booksWrapper" v-on:dragstart="dragStartAdd" v-on:dragover="over" v-on:dragleave="leave" v-on:drop="dropAdd">
                            <template v-for="(item, idx) in books">
                                <li :key="idx">
                                    <img class="bookImg" :src="item.objUrl" draggable="true" :data-book="JSON.stringify(item)" />
                                </li>
                            </template>
                        </ul>
                    </div>
                    <div :class="'mainContentSub ' + (subShow ? '' : 'mainContentSub-hide')">
                        <div class="contentHeader">
                            <h2>uncategorized:<span>{{uncategorized.length}}</span></h2>
                            <button type="button" class="btn btn-primary" v-on:click="onCloseSub">close sub</button>
                        </div>
                        <ul class="booksWrapper" v-on:dragstart="dragStartRm" v-on:dragover="over" v-on:dragleave="leave" v-on:drop="dropRm">
                            <template v-for="(item, idx) in uncategorized">
                                <li :key="idx">
                                    <img class="bookImg" :src="item.objUrl" draggable="true" :data-book="JSON.stringify(item)" />
                                </li>
                            </template>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {fetchBookThumb} from './service';
import NaviContent from './NaviContent.vue';
const getBookData = (dataStr) => {
    const div = document.createElement('div');
    div.innerHTML = dataStr;
    return JSON.parse(div.firstElementChild.dataset['book']);
};
export default {
    data: function() {
        return {
            subShow: false,
            subShowEnabled: true,
            currentPath: this.$route.path,
            addStart: false,
            rmStart: false
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
            let result = null;
            if (category === void 0) { 
                result = all;
            } else {
                let filtered = [];
                category.books.forEach(elm => {
                    const found = all.find(one => one._id === elm);
                    if (found) filtered = [...filtered, found];
                });
                result = filtered;
            }
            result.forEach(async (elm) => {
                const blob = await fetchBookThumb(elm);
                elm.objUrl = window.URL.createObjectURL(blob);
            });
            return result;
        },
        uncategorized: function() {
            const all = this.$store.getters.books;
            const categories = this.$store.getters.categories;
            const current = this.category;
            const category = categories.find((elm) => elm.name === current);
            let result = null;
            if (category === void 0) { 
                result = [];
            } else {
                let filtered = [];
                category.books.forEach(elm => {
                    const found = all.filter(one => one._id !== elm);
                    if (found) filtered = [...filtered, ...found];
                });
                result = filtered;
            }
            result.forEach(async (elm) => {
                const blob = await fetchBookThumb(elm);
                elm.objUrl = window.URL.createObjectURL(blob);
            });
            return result;
        },
    },
    components: {
        NaviContent
    },
    methods: {
        onToggleSub: function() {
            this.subShow = true;
            this.addStart = false;
            this.rmStart = false;
        },
        onCloseSub: function() {
            this.subShow = false;
            this.addStart = false;
            this.rmStart = false;
        },
        dragStartAdd: function(ev) {
            this.addStart = true;
            this.rmStart = false;
            let tgt = ev.target;
            ev.dataTransfer.setData('rm', tgt.outerHTML);
        },
        dragStartRm: function(ev) {
            this.rmStart = true;
            this.addStart = false;
            let tgt = ev.target;
            ev.dataTransfer.setData('add', tgt.outerHTML);
        },
        over: function(ev) {
            ev.preventDefault();
            ev.dataTransfer.dropEffect = 'move';
        },
        leave: function(ev) {
            ev.preventDefault();
        },
        dropAdd: function(ev) {
            ev.stopPropagation();
            if (!this.rmStart) { return; }
            this.rmStart = false;
            this.addStart = false;
            const data = ev.dataTransfer.getData('add');
            const book = getBookData(data);
            console.log(book);
        },
        dropRm: function(ev) {
            ev.stopPropagation();
            if (!this.addStart) { return; }
            this.rmStart = false;
            this.addStart = false;
            const data = ev.dataTransfer.getData('rm');
            const book = getBookData(data);
            console.log(book);
        }
    },
    updated: function() {
        const path = this.$route.path;
        if (this.currentPath !== path) {
            this.currentPath = path;
            this.subShow = false;
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
.booksWrapper {
    display: flex;
    flex-direction: row;
    padding-left: 0px;
}
.booksWrapper > li {
    list-style-type: none;
    margin: 2px;
}
.bookImg {
    border: solid 1px gray;
}
.contentHeader {
    display: flex;
    flex-direction: row;
}
.contentHeader > * {
    margin-right: 8px;
}
</style>
