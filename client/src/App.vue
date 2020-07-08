<template>
  <v-app dark>
    <v-content class="backgr">
        <Game
            :userInfo="userInfo"
            :guardianApi="guardianApi"
            :gameGuardianAmount="gameGuardianAmount"
            v-on:needs-info="needsInfo()"
        />
        <HelpMenu
            :infoRequired="infoRequired"
            :userInfo="userInfo"
            :gameAddresses="gameAddresses"
            :chatUrl="chatUrl"
            :amount="gameGuardianAmount"
            v-on:set-info="setInfo"
        />
        <v-btn absolute small top right fab
            class="menu chat-btn"
            @click="openChat()"
        >
            <v-icon>fa-comments</v-icon>
        </v-btn>
    </v-content>
  </v-app>
</template>

<script>
import Vue from 'vue';
import HelpMenu from './components/H