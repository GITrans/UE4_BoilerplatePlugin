<template>
    <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide class="swiper-margin no-swipe">
            <v-container>
                    <StartPage v-on:go="tryGoToOpenState()"/>
            </v-container>
        </swiper-slide>
        <swiper-slide class="swiper-margin no-swipe">
            <v-layout text-xs-center wrap>
                <v-flex xs12>
                    <GameOpen
                        v-if="game"
                        :timer="timer"
                        :player="player"
                        :move="move"
                        :players1="players1"
                        :players2="players2"
                        :gameGuardianAmount="gameGuardianAmo