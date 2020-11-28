
<template>
    <v-container fill-height nomargin>
        <v-layout text-xs-center wrap v-if="move && raiden_payment && !winningMove">
            <youtube
                video-id="_lB6bvv_TpA"
                :player-vars="{ autoplay: 1 }"
                :class="[videoPlaying ? 'backgr-vid-play' : 'backgr-vid-end', 'full']"
                @ended="videoEnded"
                @ready="videoReady"
                player-width="98%"
                player-height="100%"
            ></youtube>
        </v-layout>
        <v-layout
            text-xs-center wrap
            :class="[(!videoPlaying || winningMove) ? '' : 'backr-text']"
        >
            <v-flex xs12>
                <div class="subheading">Outcome: </div>
            </v-flex>
            <v-flex xs12>
                <GameClosedChoices

                    :player="player"
                    :move="MovesToIndex[our_player.move] || move"
                    :us="our_player.move ? (MovesToIndex[our_player.move] === move ? 1 : 0) : 1"
                    :player_info="our_player.count ? `${our_player.count} players` : ''"
                    :move_info="(our_player.move_count && our_player.count) ? `${our_player.move_count[IndexToMoves[move]]}/${our_player.count} votes` : ''"
                />
            </v-flex>

            <v-flex xs8 offset-xs2 v-if="our_player.move_values">
                <!-- <v-flex xs12>
                    <bars
                      :data="our_player.move_values || []"
                      :gradient="['#ffffff', '#ffffff']"
                      :barWidth="30"
                      :height="70"
                      >
                    </bars>
                </v-flex> -->
                <v-layout row>
                    <v-flex xs2 offset-xs2>
                        <v-icon :color="`${IndexToMoves[move] === 'rock' ? 'white' : 'grey darken-1'}`">fa-hand-rock</v-icon>
                        <p class="subheading" text-xs-center wrap>{{our_player.move_count.rock}}</p>
                    </v-flex>
                    <v-flex xs2 offset-xs2>
                        <v-icon :color="`${IndexToMoves[move] === 'paper' ? 'white' : 'grey darken-1'}`">fa-hand-paper</v-icon>
                        <p class="subheading" text-xs-center wrap>{{our_player.move_count.paper}}</p>
                    </v-flex>
                    <v-flex xs2 offset-xs2>
                        <v-icon :color="`${IndexToMoves[move] === 'scissors' ? 'white' : 'grey darken-1'}`">fa-hand-scissors</v-icon>
                        <p class="subheading" text-xs-center wrap>{{our_player.move_count.scissors}}</p>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex xs12 v-if="winningMove">
                <p class="display-2">{{ `You ${MovesToIndex[winningMove] === move ? 'won!': 'lost...'}`}}</p>
                <p class="subheading" v-if="MovesToIndex[winningMove] === move">
                    Wait for the off-chain reward.
                </p>
            </v-flex>
            <v-flex xs12></v-flex>
            <v-flex xs12>
                <div class="subheading">Opponents: </div>
            </v-flex>
            <v-flex xs12>
                <GameClosedChoices
                    :player="opponent()"
                    :move="opponentMove"
                    :timer="timer"
                    :us="0"
                    :player_info="opponent_player.count || ''"
                    :move_info="(opponent_player.move_count && opponent_player.count) ? `${opponent_player.move_count[IndexToMoves[opponentMove]]}/${opponent_player.count}` : ''"
                    v-on:timer-end="$emit('timer-end')"
                />
            </v-flex>

            <v-flex xs8 offset-xs2 v-if="opponent_player.move_values">
                <!-- <bars
                  :data="opponent_player.move_values || []"
                  :gradient="['#ffffff', '#ffffff']"
                  :barWidth="30"
                  :height="70"
                  >
                </bars> -->
                <v-layout row>
                    <v-flex xs2 offset-xs2>
                        <v-icon color="grey darken-1">fa-hand-rock</v-icon>
                        <p class="subheading" text-xs-center wrap>{{opponent_player.move_count.rock}}</p>
                    </v-flex>
                    <v-flex xs2 offset-xs2>
                        <v-icon color="grey darken-1">fa-hand-paper</v-icon>
                        <p class="subheading" text-xs-center wrap>{{opponent_player.move_count.paper}}</p>
                    </v-flex>
                    <v-flex xs2 offset-xs2>
                        <v-icon color="grey darken-1">fa-hand-scissors</v-icon>
                        <p class="subheading" text-xs-center wrap>{{opponent_player.move_count.scissors}}</p>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex xs12 v-if="winningPayment">
                <div v-if="MovesToIndex[winningMove] === move">
                    <p class="subheading" text-xs-center wrap>
                        {{displayWinningPayment()}}
                    </p>
                </div>
                <v-btn
                    large round
                    v-on:click="$emit('restart-game')"
                >Duel Again!</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { IndexToPlayer, MovesToIndex, IndexToMoves, GameGuardian, Network } from '../constants';
import GameClosedChoices from './GameClosedChoices';

export default {
    components: {
        GameClosedChoices,
    },
    props: ['game', 'timer', 'player', 'move', 'winningPayment', 'raiden_payment'],
    data: () => ({
        IndexToPlayer,
        MovesToIndex,
        IndexToMoves,
        winningMove: null,
        opponentMove: null,
        videoPlaying: false,
        our_player: {},
        opponent_player: {},