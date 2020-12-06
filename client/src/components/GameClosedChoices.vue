<template>
    <v-layout wrap>
        <v-flex xs2 offset-xs4>
            <v-avatar
                class="v-btn v-btn--depressed v-btn--floating"
                :size="80"
                :color="us === 1 ? 'white' : 'grey darken-1'"
                v-on:click.stop="choosePlayer(PlayerToIndex.vader)"
            >
                <img :src="`./${IndexToPlayer[player]}_t2.png`" alt="avatar">
            </v-avatar>
            <p class="subheading" text-xs-center wrap v-if="player_info">{{player_info}}</p>
        </v-flex>
        <v-flex xs2>
            <v-btn v-if="move"
                class="move-btn"
                large fab light :color="us === 1 ? 'white' : 'grey darken-1'"
            >
                <v-icon dark x-large>{{ `fa-hand-${IndexToMoves[move]}` }}</v-icon>
            </v-btn>
            <p class="subheading" text-xs-center wrap v-if="move && move_info">{{move_info}}</p>
            <Timer v-else-if="timer"
                :time="timer.interval