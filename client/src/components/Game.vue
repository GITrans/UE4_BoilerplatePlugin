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
                        :gameGuardianAmount="gameGuardianAmount"
                        v-on:player-chosen="setPlayer"
                        v-on:move-chosen="setMove"
                        v-on:play="userPlay"
                        v-on:timer-end="gameTimerEnd"
                    />
                </v-flex>
            </v-layout>
        </swiper-slide>
        <swiper-slide class="swiper-margin no-swipe">
            <GameClosed
                v-if="game"
                :game="game"
                :timer="timer"
                :player="player"
                :move="move"
                :raiden_payment="raiden_payment"
                :winningPayment="winningPayment"
                v-on:timer-end="resolveTimerEnd"
                v-on:restart-game="restartGame()"
            />
        </swiper-slide>
        <swiper-slide class="swiper-margin no-swipe">
            <v-layout text-xs-center wrap fullheight>
                <v-flex xs8>
                    <RobotLive
                        v-if="game"
                        :stream="stream"
                    />
                    <!-- <RobotLive
                        v-if="game"
                        :stream="stream + (gameRevealed ? '&muted=false' : '&muted=true')"
                    /> -->
                </v-flex>
                <v-flex xs4>
                    <GameClosed
                        v-if="game"
                        :game="game"
                        :player="player"
                        :move="move"
      