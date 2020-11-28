
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
