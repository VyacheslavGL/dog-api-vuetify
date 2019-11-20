<template>
    <base-layout class="favorites">
        <h1>Список избранных фото</h1>
<!--        <b-alert show v-if="favorites.length === 0">Список пуст</b-alert>-->
<!--        <img @click="toggleFavorite(item)" v-for="item in favorites" :src="item" :key="item" alt="">-->
        <dogs-list :photos="favorites"/>
    </base-layout>
</template>

<script>
    // import {TOGGLE_FAVORITE_IMAGE} from "../store/action.types";
    import DogsList from "../components/DogsList";
    import BaseLayout from '../components/BaseLayout';

    export default {
        components: {DogsList, BaseLayout},
        /*  methods:{
            async toggleFavorite(image){
                await this.$store.dispatch(TOGGLE_FAVORITE_IMAGE, image);
            }
          },*/
        computed:{
            favorites(){
                return this.$store.state.favorites;
            }
        },

    }
</script>