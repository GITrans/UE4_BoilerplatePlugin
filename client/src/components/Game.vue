<template>
    <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide class="swiper-margin no-swipe">
            <v-container>
                    <StartPage v-on:go="tryGoToOpenState()"/>
            </v-