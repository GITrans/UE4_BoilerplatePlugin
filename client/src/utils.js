
export class UserRaidenApi {
    constructor(axios, ip, token, target) {
        this.axios = axios;
        this.ip = ip;
        this.token = token;
        this.target = target;
    }

    address() {
        const api = `${this.ip}/api/v1/address`;
        return this.axios.get(api);
    }

    pay(payload) {
        const api = `${this.ip}/api/v1/payments/${this.token}/${this.target}`;
        console.log('pay', api, payload);
        return this.axios.post(api, payload);
    }

    history(fromBlock=0) {
        const api =  `${this.ip}/api/v1/events/channels/${this.token}/${this.target}?from_block=${fromBlock}`;
        console.log('history', api);
        return this.axios.get(api);
    }

    payments() {
        const api = `${this.ip}/api/v1/payments/${this.token}`;
        return this.axios.get(api);
    }
}

export class GuardianApi {
    constructor(axios, ip) {
        this.axios = axios;
        this.ip = ip;
    }

    getAmount() {
        const api = `${this.ip}/game/amount`;
        return this.axios.get(api);
    }

    getGame() {
        const api = `${this.ip}/game?filter={"offset":0,"limit":1,"skip":0,"order":"startTime%20DESC"}`;
        return this.axios.get(api);
    }

    getGameMoveCount(gameId, playerId) {
        const api = `${this.ip}/move/count?where={"gameId":${gameId},"playerId":${playerId}}`;
        return this.axios.get(api);
    }

    startGame() {
        const api = `${this.ip}/game/create`;
        return this.axios.get(api);
    }

    revealGame(gameid) {
        const api = `${this.ip}/game/${gameid}`;
        return this.axios.get(api, {});
    }

    initMove(gameid, move) {
        const api = `${this.ip}/game/${gameid}/move`;
        return this.axios.post(api, move);
    }

    revealMove(moveid, move) {
        const api = `${this.ip}/move/${moveid}`;
        return this.axios.patch(api, move);
    }
}