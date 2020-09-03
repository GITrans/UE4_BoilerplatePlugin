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
                        :winningPayment="winningPayment"
                        v-on:restart-game="restartGame()"
                    />
                </v-flex>
            </v-layout>
        </swiper-slide>

        <!-- <v-btn absolute small top left fab
            color="white"
            slot="button-prev"
            class="nav prev"
        >
            <v-icon>fa-chevron-left</v-icon>
        </v-btn>
        <v-btn absolute small top right fab
            color="white"
            class="nav next"
            slot="button-next"
        >
            <v-icon>fa-chevron-right</v-icon>
        </v-btn> -->
    </swiper>
</template>

<script>
import Vue from 'vue';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

import StartPage from './StartPage';
import GameOpen from './GameOpen';
import GameClosed from './GameClosed';
import RobotLive from './RobotLive';
import { IndexToMoves, GameGuardian, GameState, GameStateIndex, Network } from '../constants';
import { UserRaidenApi } from '../utils';

Vue.use(VueAwesomeSwiper);

const web3Utils = require('web3-utils');

export default {
    props: ['userInfo', 'guardianApi', 'gameGuardianAmount'],
    components: {
        StartPage,
        GameOpen,
        GameClosed,
        RobotLive,
    },
    data() {
        let data = {
            swiperOptions: {
                noSwiping: true,
                navigation: {
                    nextEl: '.next',
                    prevEl: '.prev',
                },
                noSwipingClass: "no-swipe",
                loop: false,
                slidesPerView: "auto",
            },
            userRaidenApi: null,
            GameState,
            stream: GameGuardian.stream,
            timer: {intervalGame: 0, intervalResolve: 0, value: 0},
        }
        this.resetGameData(data);
        return data;
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper
        },
    },
    watch: {
        userInfo() {
            this.setUserRaidenApi();
        },
        game() {
            if (this.game && this.game.winningMove) {
                this.goToResolvedState();
            }
        },
    },
    mounted() {
        this.setUserRaidenApi();
    },
    methods: {
        resetGameData(self) {
            self.game = null;
            self.raiden_payment = null;
            self.winningPayment = null;
            self.player = null;
            self.move = null;
            self.moveStarted = null;
            self.secret = null;
            self.players1 = 0;
            self.players2 = 0;
            self.gameRevealed = false;
        },
        setUserRaidenApi() {
            if (!this.userInfo.ip) return;
            this.userRaidenApi = new UserRaidenApi(
                Vue.axios,
                this.userInfo.ip,
                GameGuardian.token_address[Network],
                GameGuardian.raiden_address[Network]
            );
            this.userRaidenApi.address().then(response => {
                if (!response.data)
                    throw new Error('Could not get your Raiden node Ethereum address');
                this.userInfo.address = response.data.our_address;
            }).catch((error) => {
                alert(`${error} on ${this.userRaidenApi.ip}. Make sure your Raiden node's --rpccorsdomain is set correctly.`);
            });
        },
        restartGame() {
            this.swiper.slideTo(0, 1000, false);
        },
        goToOpenState() {
            this.swiper.slideTo(GameState.open, 1000, false);
            this.setPlayersMoveCou