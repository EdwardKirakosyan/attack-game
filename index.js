import characterData from "./data.js"
import Character from "./Character.js"

let monstersArray = ["orc", "demon", "goblin"]
let isWaiting = false

function getNewMonster() {
  const nextMonsterData = characterData[monstersArray.shift()]
  return nextMonsterData ? new Character(nextMonsterData) : {}
}

function attack() {
  if (!isWaiting) {
    robot.setDiceHtml()
    monster.setDiceHtml()
    robot.takeDamage(monster.currentDiceScore)
    monster.takeDamage(robot.currentDiceScore)
    render()

    if (robot.dead) {
      endGame()
    } else if (monster.dead) {
      isWaiting = true
      if (monstersArray.length > 0) {
        setTimeout(() => {
          monster = getNewMonster()
          render()
          isWaiting = false
        }, 1500)
      } else {
        endGame()
      }
    }
  }
}

function endGame() {
  isWaiting = true
  const endMessage =
    robot.health === 0 && monster.health === 0
      ? "💀 Everyone is dead 💀"
      : robot.health > 0
      ? "The Robot Wins"
      : "The monsters are Victorious"

  const endEmoji = robot.health > 0 ? "🦾" : "☠️"
  setTimeout(() => {
    document.body.innerHTML = `
                <div class="end-game">
                    <h2>Game Over</h2> 
                    <h3>${endMessage}</h3>
                    <p class="end-emoji">${endEmoji}</p>
                </div>
                `
  }, 1500)
}

document.getElementById("attack-button").addEventListener("click", attack)

function render() {
  document.getElementById("hero").innerHTML = robot.getCharacterHtml()
  document.getElementById("monster").innerHTML = monster.getCharacterHtml()
}

const robot = new Character(characterData.hero)
let monster = getNewMonster()
render()
