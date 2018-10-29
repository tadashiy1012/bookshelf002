<template>
    <div>
        <h2>book</h2>
        <div class="form-group">
            <button id="addCtgrBtn" class="btn btn-primary">add book</button>
        </div>
        <h2>category</h2>
        <div class="form-group">
            <input type="text" id="inCtgr" class="form-control" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary" v-on:click="onAddCategory">add category</button>
        </div>
        <ul>
            <template v-for="(item, idx) in categories">
                <li :key="idx">{{item.name}}</li>
            </template>
        </ul>
    </div>
</template>
<script>
export default {
    computed: {
        categories: function() {
            return this.$store.getters.categories;
        }
    },
    methods: {
        onAddCategory: function() {
            const inCtgr = document.querySelector('#inCtgr');
            const newCtgr = inCtgr.value;
            if (newCtgr.length === 0) return;
            this.$store.dispatch('setCategories', newCtgr);
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
