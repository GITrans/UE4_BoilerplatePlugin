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

- install and run a [Raiden Network node](https://raiden-network.readthedocs.io/en/stable/overview_and_guide.html). The current game version only supports the [Red Eyes release](https://github.com/raiden-network/raiden/releases/tag/v