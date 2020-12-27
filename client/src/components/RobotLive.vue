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
      