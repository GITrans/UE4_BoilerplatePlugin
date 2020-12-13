
<template>
    <v-container fill-height>
        <v-layout wrap text-xs-center>
            <v-flex xs12>
                <Timer
                    :time="timer.intervalGame || 0"
                    :startValue="timer.value || 0"
                    size="100"
                    color="white"
                    v-on:timer-end="$emit('timer-end')"
                />
                <br>
            </v-flex>
            <v-flex xs12>
                <div class="display-1">Choose:</div>
            </v-flex>
            <v-flex xs2 offset-xs4>
                <p class="subheading" text-xs-center wrap>
                    players now: {{players1}}
                </p>
            </v-flex>
            <v-flex xs2>
                <p class="subheading" text-xs-center wrap>
                    players now: {{players2}}
                </p>
            </v-flex>
            <v-flex xs4></v-flex>
            <v-flex xs12>
                <v-avatar class="v-btn v-btn--depressed theme--light v-btn--floating"
                    :size="120"
                    :color="player === PlayerToIndex.vader ? '' : '#1E1E1E'"
                    v-on:click.stop="choosePlayer(PlayerToIndex.vader)"
                >
                    <img src="/vader_t2.png" alt="avatar">
                </v-avatar>
                <v-avatar class="v-btn v-btn--depressed theme--light v-btn--floating"