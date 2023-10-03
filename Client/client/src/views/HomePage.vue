<script>
import { mapState, mapActions } from 'pinia';
import { useProjectsStore } from '../stores/projects';

export default {
    computed: {
        ...mapState(useProjectsStore, ['news'])
    },
    methods: {
        ...mapActions(useProjectsStore, ['newsData'])
    },
    created() {
        this.newsData();
    }
}
</script>

<template>
    <div id="home-page">
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-8">
                    <div class="mb-4" v-for="(article, index) in news.articles" :key="index">
                        <div class="card mb-3">
                            <div class="card-body">
                                <h5 class="card-title">{{ article.title }}</h5>
                                <p class="card-text">{{ article.description }}</p>
                                <a :href="article.url" class="btn btn-primary" target="_blank">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style>
    #home-page{
        padding-bottom: 27.7vh;
    }
</style>