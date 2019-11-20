<template>
    <v-app :key="$store.state.user.uid" id="app">
<!--        clipped - опускает ниже app-->
        <router-view/>
    </v-app>
</template>


