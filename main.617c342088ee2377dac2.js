/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/dom */ \"./src/modules/dom.js\");\n/* harmony import */ var _styles_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/styles.css */ \"./src/styles/styles.css\");\n\n\n(0,_modules_dom__WEBPACK_IMPORTED_MODULE_0__.buildBoards)();\n(0,_modules_dom__WEBPACK_IMPORTED_MODULE_0__.startGameModal)();\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/modules/dom.js":
/*!****************************!*\
  !*** ./src/modules/dom.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"boardController\": () => (/* binding */ boardController),\n/* harmony export */   \"buildBoards\": () => (/* binding */ buildBoards),\n/* harmony export */   \"gameOver\": () => (/* binding */ gameOver),\n/* harmony export */   \"showPlayerShips\": () => (/* binding */ showPlayerShips),\n/* harmony export */   \"startGameModal\": () => (/* binding */ startGameModal),\n/* harmony export */   \"updateBoard\": () => (/* binding */ updateBoard)\n/* harmony export */ });\n/* harmony import */ var _gameloop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameloop */ \"./src/modules/gameloop.js\");\n/* harmony import */ var _randomShips__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./randomShips */ \"./src/modules/randomShips.js\");\n\n\n\n//function to build the game board\nconst buildBoards = () => {\n  const [boardOneContainer, boardTwoContainer] = document.querySelectorAll('.board-container');\n  const boardOne = document.createElement('div');\n  const boardTwo = document.createElement('div');\n  boardOne.classList.add('board-one');\n  boardTwo.classList.add('board-two');\n  for (let i = 10; i > 0; i--) {\n    for (let j = 0; j < 10; j++) {\n      const div1 = document.createElement('div');\n      const div2 = document.createElement('div');\n      div1.classList.add('board-cell');\n      div1.setAttribute('data-coords', `${i},${j}`);\n      div2.classList.add('board-cell');\n      div2.setAttribute('data-coords', `${i},${j}`);\n      boardOne.append(div1);\n      boardTwo.append(div2);\n    }\n  }\n  if (boardOneContainer.childElementCount > 1) boardOneContainer.removeChild(boardOneContainer.lastChild);\n  if (boardTwoContainer.childElementCount > 1) boardTwoContainer.removeChild(boardTwoContainer.lastChild);\n  boardOneContainer.append(boardOne);\n  boardTwoContainer.append(boardTwo);\n};\n//function that lets theplayer make his move by clicking on one of the cells\nconst boardController = gameloop => {\n  const boardTwo = document.querySelector('.board-two');\n  boardTwo.addEventListener('click', e => {\n    if (!e.target.dataset.coords) return;\n    const coords = e.target.dataset.coords.split(',').map(Number);\n    _gameloop__WEBPACK_IMPORTED_MODULE_0__[\"default\"].takeTurn(coords);\n  });\n};\n//function that updates the board cells after an action has been made\nconst updateBoard = (coords, attack, player, enemy) => {\n  const boardOne = document.querySelector('.board-one');\n  const boardTwo = document.querySelector('.board-two');\n  const board = player.name ? boardTwo : boardOne;\n  for (let i = 0; i < board.childNodes.length; i++) {\n    const node = board.childNodes[i];\n    if (node.dataset.coords === coords.toString()) {\n      node.classList.add(attack ? 'hit' : 'miss');\n      break;\n    }\n  }\n  const sunkShips = enemy.board.checkSunk();\n  if (sunkShips) {\n    sunkShips.forEach(ship => {\n      ship.coords.forEach(coord => {\n        for (let i = 0; i < board.childNodes.length; i++) {\n          const node = board.childNodes[i];\n          if (node.dataset.coords === coord.toString()) {\n            node.classList.add('sunk');\n            break;\n          }\n        }\n      });\n    });\n  }\n};\n//function to show the players ships on the board\nconst showPlayerShips = playerShips => {\n  const boardOne = document.querySelector('.board-one');\n  playerShips.forEach(ship => {\n    ship.forEach(coords => {\n      for (let i = 0; i < boardOne.childNodes.length; i++) {\n        const node = boardOne.childNodes[i];\n        if (node.dataset.coords === coords.toString()) {\n          node.classList.add('friendly');\n          break;\n        }\n      }\n    });\n  });\n};\n//function to totate a ship horizontaly or verticaly\nconst rotateShip = ship => {\n  const rotatedShip = [];\n  let outOfBounds = false;\n  if (ship.length < 2) return ship;\n  if (ship[0][0] === ship[1][0]) {\n    ship.forEach((coord, index) => {\n      const x = coord[0] - index;\n      const y = coord[1] - index;\n      if (x < 0 || x > 9 || y < 0 || y > 9) outOfBounds = true;\n      rotatedShip.push([x, y]);\n    });\n  }\n  if (ship[0][1] === ship[1][1]) {\n    ship.forEach((coord, index) => {\n      const x = coord[0] + index;\n      const y = coord[1] + index;\n      if (x < 0 || x > 9 || y < 0 || y > 9) outOfBounds = true;\n      rotatedShip.push([x, y]);\n    });\n  }\n  if (outOfBounds) return ship;\n  return rotatedShip;\n};\n//function to move a ship on the board\nconst moveShip = (ship, newCoords) => {\n  const movedShip = [];\n  let outOfBounds = false;\n  if (ship.length < 2) return [newCoords];\n  if (ship[0][0] === ship[1][0]) {\n    ship.forEach((coord, index) => {\n      const x = newCoords[0];\n      const y = newCoords[1] + index;\n      if (x < 0 || x > 9 || y < 0 || y > 9) outOfBounds = true;\n      movedShip.push([x, y]);\n    });\n  }\n  if (ship[0][1] === ship[1][1]) {\n    ship.forEach((coord, index) => {\n      const x = newCoords[0] - index;\n      const y = newCoords[1];\n      if (x < 0 || x > 9 || y < 0 || y > 9) outOfBounds = true;\n      movedShip.push([x, y]);\n    });\n  }\n  if (outOfBounds) return ship;\n  return movedShip;\n};\n//function to build the modal board\nconst buildModalBoard = (board, ships) => {\n  for (let i = 10; i > 0; i--) {\n    for (let j = 0; j < 10; j++) {\n      const div = document.createElement('div');\n      div.setAttribute('data-coords', `${i},${j}`);\n      div.classList.add('modal-board-cell');\n      board.append(div);\n    }\n  }\n  ships.forEach((ship, index) => {\n    const coords = ship[0];\n    let isVertical = false;\n    if (ship.length > 1) isVertical = ship[0][0] !== ship[1][0];\n    const rotation = isVertical ? 'vertical' : 'horizontal';\n    for (let i = 0; i < board.childNodes.length; i++) {\n      const node = board.childNodes[i];\n      if (node.dataset.coords === coords.toString()) {\n        const div = document.createElement('div');\n        div.classList.add('modal-board-ship');\n        div.classList.add(`${rotation}-${ship.length}`);\n        div.setAttribute('data-index', index);\n        div.setAttribute('draggable', 'true');\n        node.append(div);\n        break;\n      }\n    }\n  });\n};\n//function to place the ships where you want on the board\nconst arrangeShips = ships => {\n  const boardShips = document.querySelectorAll('.modal-board.ship');\n  boardShips.forEach(boardShip => {\n    //rotates the ship on the board when clicked\n    boardShip.addEventListener('click', e => {\n      const ship = ships[boardShip.dataset.index];\n      const rotatedShip = rotateShip(ship);\n      const newShips = [...ships];\n      if (ship.toString() === rotatedShip.toString()) return;\n      newShips.splice(boardShip.dataset.index, 1);\n      const unique = rotatedShip.every(rotatedCoords => {\n        return newShips.every(newShip => {\n          return newShip.every(newCoords => {\n            return newCoords.toString() !== rotatedCoords.toString();\n          });\n        });\n      });\n      if (unique) {\n        ships.splice(e.target.dataset.index, 1, rotatedShip);\n        e.target.classList.toggle(`vertical-${rotatedShip.length}`);\n        e.target.classList.toggle(`horizontal-${rotatedShip.length}`);\n      }\n    });\n    //drages the ship on the board\n    const boardCells = document.querySelectorAll('.modal-board-cell');\n    boardCells.forEach(cell => {\n      cell.addEventListener('dragover', e => {\n        e.preventDefault();\n        const draggable = document.querySelector('.dragging');\n        const ship = ships[draggable.dataset.index];\n        const movedShip = moveShip(ship, cell.dataset.coords.split(',').map(Number));\n        const newShips = [...ships];\n        if (ship.toString() === movedShip.toString() && movedShip.length > 2) return;\n        newShips.splice(draggable.dataset.index, 1);\n        const unique = movedShip.every(movedCoords => {\n          return newShips.every(newShip => {\n            return newShip.every(newCoords => {\n              return newCoords.toString() !== movedCoords.toString();\n            });\n          });\n        });\n        if (unique) {\n          ships.splice(draggable.dataset.index, 1, movedShip);\n          cell.append(draggable);\n        }\n      });\n    });\n    boardShip.addEventListener('dragstart', () => {\n      boardShip.classList.add('dragging');\n    });\n    boardShip.addEventListener('dragend', () => {\n      boardShip.classList.remove('dragging');\n    });\n  });\n};\n//function that starts the game\nconst startGameModal = () => {\n  const board = document.querySelector('.modal-board');\n  const form = document.querySelector('modal-form');\n  const randomBtn = document.querySelector('.modal-random');\n  let ships = (0,_randomShips__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n  buildModalBoard(board, ships);\n  arrangeShips(ships);\n  form.addEventListener('submit', e => {\n    e.preventDefault();\n    const nameInput = document.querySelector('.modal-name-input');\n    const name = document.querySelector('.board-one-title');\n    const modal = document.querySelector('.modal');\n    const newGame = (0,_gameloop__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(nameInput, ships);\n    modal.classList.add('display-none');\n    name.innerText = nameInput.value;\n    boardController(newGame);\n  });\n  randomBtn.addEventListener('click', () => {\n    ships = (0,_randomShips__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n    board.textContent = '';\n    buildModalBoard(board, ships);\n    arrangeShips(ships);\n  });\n};\n//function that called when aplayer has lost and the game is over\nconst gameOver = currentPlayer => {\n  const modal = document.querySelector('.modal');\n  const modalTitle = document.querySelector('.modal-title');\n  const outCome = document.querySelector('.modal-outcome');\n  outCome.innerText = `You ${currentPlayer.name ? 'Won 🥳' : 'Lost 🤷‍♂️'}`;\n  outCome.classList.remove('display-none');\n  modalTitle.innerText = 'Rearrange your ships and go again!';\n  modal.classList.remove('display-none');\n  buildBoards();\n};\n\n\n//# sourceURL=webpack://battleship/./src/modules/dom.js?");

/***/ }),

/***/ "./src/modules/gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/modules/ship.js\");\n\nconst gameBoard = array => {\n  const ships = [];\n  const availableAttacks = [];\n  const missedAttacks = [];\n  array.forEach(coord => {\n    const newShip = (0,_ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(coord.length);\n    newShip.coords = coord;\n    ships.push(newShip);\n  });\n  for (let i = 0; i > 10; i++) {\n    for (let j = 0; j < 10; j++) {\n      availableAttacks.push([i, j]);\n    }\n  }\n  const receiveAttack = attackCoords => {\n    const attackedIndex = availableAttacks.findIndex(item => item.toStirng() === attackCoords.toStirng());\n    availableAttacks.splice(attackedIndex, 1);\n    const isHit = ships.some(ship => {\n      let currentIndex = null;\n      const checkHit = ship.coords.some((coord, index) => {\n        currentIndex = index;\n        return attackCoords.toString() === coord.toString();\n      });\n      if (checkHit) ship.hit(currentIndex);\n      if (!checkHit) missedAttacks.push(attackCoords);\n      return checkHit;\n    });\n    return isHit;\n  };\n  const checkWin = () => {\n    return ships.every(ship => ship.isSunk());\n  };\n  const checkRemaining = () => {\n    const workingShips = [];\n    ships.forEach(ship => {\n      if (!ship.isSunk()) workingShips.push(ship);\n    });\n    return workingShips.length;\n  };\n  const checkSunk = () => {\n    return ships.filter(ship => ship.isSunk());\n  };\n  return {\n    availableAttacks,\n    receiveAttack,\n    checkWin,\n    checkRemaining,\n    checkSunk\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameBoard);\n\n//# sourceURL=webpack://battleship/./src/modules/gameboard.js?");

/***/ }),

/***/ "./src/modules/gameloop.js":
/*!*********************************!*\
  !*** ./src/modules/gameloop.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/modules/player.js\");\n\nconst gameLoop = (name, shipArray) => {\n  let thePlayer = (0,_player__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(name, shipArray);\n  let theEnemy = (0,_player__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  let delay = false;\n  showPlayerShips(thePlayer.playerShips);\n  const updateTurn = () => {\n    const nextPlayer = theEnemy;\n    theEnemy = thePlayer;\n    thePlayer = nextPlayer;\n  };\n  const aiNextAttacks = [];\n  const aiTurn = () => {\n    const randomIndex = Math.floor(Math.random() * theEnemy.board.availableAttacks.length);\n    const randomCoords = theEnemy.board.availableAttacks[randomIndex];\n    const attackCoords = aiNextAttacks.length > 0 ? aiNextAttacks.shift() : randomCoords;\n    const checkCoords = theEnemy.board.availableAttacks.some(item => item.toString() === attackCoords.toString());\n    if (!checkCoords) {\n      aiTurn();\n      return;\n    }\n    const attack = thePlayer.attack(theEnemy.board, attackCoords);\n    if (attack) {\n      aiNextAttacks.push([attackCoords[0] + 1, attackCoords[1]]);\n      aiNextAttacks.push([attackCoords[0], attackCoords[1] + 1]);\n      aiNextAttacks.push([attackCoords[0] - 1, attackCoords[1]]);\n      aiNextAttacks.push([attackCoords[0], attackCoords[1] - 1]);\n    }\n    delay = true;\n    setTimeout(() => {\n      updateBoard(attackCoords, attack, thePlayer, theEnemy);\n      if (theEnemy.board.checkWin()) {\n        gameOver(thePlayer);\n        return;\n      }\n      delay = false;\n      if (!attack) updateTurn();\n      if (attack) aiTurn();\n    }, 250);\n  };\n  const takeTurn = coords => {\n    if (delay) return;\n    const checkCoords = theEnemy.board.availableAttacks.some(item => item.toString() === coords.toString());\n    if (!checkCoords) return;\n    const attack = thePlayer.attack(theEnemy.board, coords);\n    updateBoard(coords, attack, thePlayer, theEnemy);\n    if (theEnemy.board.checkWin()) {\n      gameOver(thePlayer);\n      return;\n    }\n    if (!attack) {\n      updateTurn();\n      aiTurn();\n    }\n  };\n  return {\n    takeTurn\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameLoop);\n\n//# sourceURL=webpack://battleship/./src/modules/gameloop.js?");

/***/ }),

/***/ "./src/modules/player.js":
/*!*******************************!*\
  !*** ./src/modules/player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/modules/gameboard.js\");\n/* harmony import */ var _randomShips__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./randomShips */ \"./src/modules/randomShips.js\");\n\n\nconst player = (name = null, shipArray) => {\n  const playerShips = shipArray || (0,_randomShips__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n  const board = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(playerShips);\n  const attack = (enemyBoard, attackCoords) => {\n    return enemyBoard.receiveAttack(attackCoords);\n  };\n  return {\n    playerShips,\n    board,\n    name,\n    attack\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (player);\n\n//# sourceURL=webpack://battleship/./src/modules/player.js?");

/***/ }),

/***/ "./src/modules/randomShips.js":
/*!************************************!*\
  !*** ./src/modules/randomShips.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst randomCoords = length => {\n  const direction = Math.round(Math.random());\n  const coords = [];\n  if (direction) {\n    const x = Math.floor(Math.random() * (10 - length));\n    const y = Math.floor(Math.random() * 10);\n    for (let i = 0; i < length; i++) {\n      coords.unshift([x + i, y]);\n    }\n  }\n  if (!direction) {\n    const x = Math.floor(Math.random() * 10);\n    const y = Math.floor(Math.random() * (10 - length));\n    for (let i = 0; i < length; i++) {\n      coords.push([x, y + i]);\n    }\n  }\n  return coords;\n};\nconst randomShips = () => {\n  const shipArray = [randomCoords(5)];\n  while (shipArray.length < 5) {\n    const newCoords = randomCoords(5 - shipArray.length);\n    const unique = newCoords.every(newCoord => {\n      return shipArray.every(ship => {\n        return ship.every(shipCoord => {\n          return shipCoord.toString() !== newCoord.toString();\n        });\n      });\n    });\n    if (unique) shipArray.push(newCoords);\n  }\n  return shipArray;\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (randomShips);\n\n//# sourceURL=webpack://battleship/./src/modules/randomShips.js?");

/***/ }),

/***/ "./src/modules/ship.js":
/*!*****************************!*\
  !*** ./src/modules/ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst ship = len => {\n  const length = len;\n  const cells = Array.from({\n    length\n  }, () => false);\n  const hit = hitIndex => {\n    cells[hitIndex] = true;\n  };\n  const isSunk = () => {\n    return cells.every(cell => cell === true);\n  };\n  return {\n    length,\n    cells,\n    hit,\n    isSunk\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ship);\n\n//# sourceURL=webpack://battleship/./src/modules/ship.js?");

/***/ }),

/***/ "./src/styles/styles.css":
/*!*******************************!*\
  !*** ./src/styles/styles.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://battleship/./src/styles/styles.css?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;