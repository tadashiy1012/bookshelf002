<template>
    <div class="container rootContainer">
        <nav class="navbar navbar-light bg-light">
            <a class="navbar-brand" href="#">Navbar</a>
        </nav>
        <div class="row innerContainer">
            <div class="col-sm-2 side">
                <div class="sideContentConteiner">
                    <p>left</p>
                </div>
            </div>
            <div class="col-sm-10 main">
                <div :class="'mainContentContainer ' + (subShow ? 'mainContentContainer-grid' : 'mainContentContainer-block')">
                    <div class="mainContentMain">
                        <p>main</p>
                        <button type="button" class="btn btn-primary" v-on:click="onToggleSub">toggle sub</button>
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
export default {
    data: function() {
        return {
            subShow: false
        };
    },
    methods: {
        onToggleSub: function() {
            this.subShow = !this.subShow;
        }
    }
}
</script>
<style scoped>
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
