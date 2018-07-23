<p align="center">
  <a href="https://frejasari.github.io/SaveThePrincess/">
    <img alt="Save the princess logo" title="Save the princess logo" src="https://kf9kka.dm.files.1drv.com/y4mAeDsOLU_cXKAJc51Uf6YoRbyMhrTBwWTC2IXGoyvZn08lOE5FAOVXgtWA-mnlFKvOGi8sXxihnTbRbwb5lsNfuJX9y7K_8_xZRBIF__GJ4BtqMfayh9iHnVhMGqWtuedFaUW7YTkvr8D4bZUEoCMn3PD0-fLr4uSJritiheA2d8dRqMwL8J7AT6iOE9wlC8Dzb2kWIuqMe-54Lul-SDVyA?width=255&height=256&cropmode=none" width="200px">
  </a>
</p>

# Save the Princess | Frontend Browser Game

[Link to the project](https://frejasari.github.io/SaveThePrincess/ "Play the game!")

Save the princess is a bomberman browser game in minecraft style. I built it as my first web application during the Ironhack full-stack web development bootcamp.

## Why this game?

I loved a game called "Dyna Blaster" when I was younger and kept asking my parents for some more computer time. Even now I still remember the password for the last level of the first world. When it came to the first project I started to think about a game I would enjoy to play **and** to code. After a few hours of searching I suddenly remembered this game and was immediately hooked to bring it to life!

## How to play

### Characters

There are several characters, their main features are described below:

- **Hero** you can move the hero into 4 directions and set bombs, you die if you touch an enemy or by bomb explosion
- **Bomb** will explode after a set time, characters can't pass it, it kills your hero and enemies and destroys walls
- **Enemy** moves in random directions, gets killed by bomb explosion
- **Wall** characters can't pass them, but you can destroy them with a bomb explosion, they will change into a ground tile
- **Invincible Wall** you can't pass or destroy these tiles

![Character info graphic](https://yb0ytq.dm.files.1drv.com/y4mu16yxohFEo8V_MpgM_6bYQrABqCsqo2i2Hk4v_WJ7h6n6_tBl-8815nD7RgOKkO0ThDWrqpmJLDOa3OqvTBORRBQhS6K-i0eIBts9SkATwwqT_WGG0Z6GrODmCtUCQaSOkQU9bqSRqKseEi8_QIO7F3JYcYIw6MsgGTW7qRvKNSTBmv-Pj5mqwIr1_KSYEclvG6Xl-5BIbfqqDoIcEvYAw?width=1024&height=625&cropmode=none)

### Control

There are some custom keybindings implemented so you can control your character:

- `Arrow-Keys` to move your character
- `b` to set a bomb

### How to win?

When you click on **start game** the game will immediately start. There are no time restrictions but be careful: in some levels there might be an enemy in your range even before you destroyed a wall!

The goal is to kill all enemies in the level --> _You will immediately get the chance to start the next level!_

You loose if you get killed - either from touching an enemy or when you're in range of one of your bombs when they explode --> _You will get the chance to try the level again!_

### Want to try it?

Click [here](https://frejasari.github.io/SaveThePrincess/) and enjoy the game!

Clicking the image below will take you to a video of the game in action if you want to enjoy the game savely from the sidelines first.
[![Link to a video to see the game](https://kfpvsw.dm.files.1drv.com/y4mOLN_dQGR8MvFJvK9WBc9UL7iIrzaui9QHqkijJhPtfdRuGJfp3P-OEGKNU7xePMMcDlrEkd1Nhk79w09RHtmLIE4JjjbgHYkIeR-uMoG7zJMNRsvlkqcvIkQNczkGgbE9bUzSbaxSYz_DMVSJf06DhT9GQvgjygsHnSv2r1o4kZitBSn4fZwczsvUBNe22n13Z6Ex-nyi6MtfU3ShCe5Mw?width=1024&height=646&cropmode=none)](http://www.youtube.com/watch?v=UNYsou2y1t4)

## Main goal & biggest challenge in coding

I wanted to create a good user experience when moving the character because what's a game with shitty controls? No one would ever use it and neither would I. I always strive to create things I would personally enjoy using too so this was my main focus.

The second goal was to build it in a way that I can easily implement new levels and add-ons for additional speed / bomb range / invincibility (+ a lot of other features).

Thirdly: Keep it simple but fun! I like clean designs with clear structures so I decided to go for that in this project. Of course I also love the retro style of the original game but I wanted to give the game a personal touch.

## What's next?

The next planned features are:

- **Add different enemies:** There will be other kinds of enemies who will differ in intelligence and speed
- **Add more levels:** There will be more levels to explore
- **Final victory:** There will be an end level so you can win the whole game
