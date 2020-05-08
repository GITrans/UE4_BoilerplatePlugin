# CryptoPlayerOne

Want to play? Go to https://cryptoplayer.one and read our [Game Guide](/HowToPlay.md)

## About

Game: https://www.youtube.com/watch?v=f91oYEWmLWo

Behind the Scenes: https://www.youtube.com/watch?v=vcFf9fDgmfo

Robots Stream: https://www.youtube.com/watch?v=mMCljzH3lVQ

A rock-paper-scissors game where the player does micropayments on the Raiden Network in order to choose a move for his robot friend.
Winners get rewarded.

Unlimited number of users, each user chooses a `player` (`Dark Vader` / `Blue Yoda`) and a `move` (`Rock` / `Paper` / `Scissors`). The `GameGuardian` chooses a move for each of the two players based on the votes of the majority. He then calculates the winning move, the total amount of tokens sent by the users, keeps `10%` for hosting services and rewards all the users who chose the winning move (`winner_reward = total_token_reward / number_of_winners`)

## !Important

This is not production ready - play at your own risk if you want to give a hand at testing the game or the new Raiden Network release.


## How To Play

- install and run a [Raiden Network node](https://raiden-network.readthedocs.io/en/stable/overview_and_guide.html). The current game version only supports the [Red Eyes release](https://github.com/raiden-network/raiden/releases/tag/v0.100.1).
- go to http://cryptoplayer.one/ and follow the instructions, which will ask you to give the game domain access to your Raiden Node (!this is risky, because the game **WILL** make payments on your behalf, so do not deposit more tokens than you are willing to lose)


## Built on

- https://raiden.network
- https://www.makewonder.com's Dash & Cue robots.

## Components

`GameGuardian Server`, `GameGuardian Raiden Node` & `GameGuardian Client` are running on an Ubuntu Virtual Private Server

### `Dark Vader RobotServer` & `Blue Yoda RobotServer`

- Python & Gunicorn
- [WonderPy SDK](https://github.com/playi/WonderPy)
- live streamed

### `GameGuardian Server`

- [Loopback-based server](https://github.com/strongloop/loopback-next)
- manages the games
- keeps track of user chosen moves
- calcula