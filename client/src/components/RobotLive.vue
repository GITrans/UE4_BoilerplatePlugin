<template>
    <!-- <iframe
        class="stream"
        frameborder="0"
        :src="stream"
    ></iframe> -->
    <twitch-player
        ref="player"
        class="stream"
        :channel="channel"
        :volume="volume"
        height="100%"
        width="100%"
        @ready="ready"
    />
</template>

<script>
import Vue from 'vue';
import TwitchLive from './TwitchLive';

export default {
    components: {
        'twitch-player': TwitchLive,
    },
    // props: ['stre