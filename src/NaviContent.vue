<template>
    <div>
        <h2>book</h2>
        <div class="form-group">
            <button class="btn btn-primary" v-on:click="onAddBook">add book</button>
        </div>
        <h2>category</h2>
        <div class="form-group">
            <input type="text" id="inCtgr" class="form-control" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary" v-on:click="onAddCategory">add category</button>
        </div>
        <ul class="list-group list-group-flush">
            <template v-for="(item, idx) in categories">
                <li :key="idx" class="list-group-item">
                    <router-link :to="item.name">{{item.name}}</router-link>
                </li>
            </template>
        </ul>
    </div>
</template>
<script>
import {makeThumbnail} from './service';
export default {
    computed: {
        categories: function() {
            const categories = [{name: 'all', books:[]}, ...this.$store.getters.categories];
            return categories;
        }
    },
    methods: {
        onAddCategory: function() {
            const inCtgr = document.querySelector('#inCtgr');
            const newCtgr = inCtgr.value;
            if (newCtgr.length === 0) return;
            this.$store.dispatch('setCategories', newCtgr);
        },
        onAddBook: function() {
            const inFile = document.createElement('input');
            inFile.type = 'file';
            inFile.addEventListener('change', async (ev) => {
                const file = ev.target.files[0];
                const thumb = await makeThumbnail(file);
                this.$store.dispatch('setBooks', {file, thumb});
            });
            inFile.click();
        }
    }
}
</script>

<style scoped>
h2 {
    font-size: 22px;
}
h3 {
    font-size: 20px;
}
</style>
