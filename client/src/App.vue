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
            v-