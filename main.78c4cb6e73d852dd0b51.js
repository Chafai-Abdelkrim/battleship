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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"boardController\": () => (/* binding */ boardController),\n/* harmony export */   \"buildBoards\": () => (/* binding */ buildBoards),\n/* harmony export */   \"gameOver\": () => (/* binding */ gameOver),\n/* harmony export */   \"showPlayerShips\": () => (/* binding */ showPlayerShips),\n/* harmony export */   \"startGameModal\": () => (/* binding */ startGameModal),\n/* harmony export */   \"updateBoard\": () => (/* binding */ updateBoard)\n/* harmony export */ });\n/* harmony import */ var _gameloop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameloop */ \"./src/modules/gameloop.js\");\n/* harmony import */ var _randomShips__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./randomShips */ \"./src/modules/randomShips.js\");\n\n\n\n//function to build the game board\nconst buildBoards = () => {\n  const [boardOneContainer, boardTwoContainer] = document.querySelectorAll('.board-container');\n  const boardOne = document.createElement('div');\n  const boardTwo = document.createElement('div');\n  boardOne.classList.add('board-one');\n  boardTwo.classList.add('board-two');\n  for (let i = 9; i >= 0; i--) {\n    for (let j = 0; j <= 9; j++) {\n      const div1 = document.createElement('div');\n      const div2 = document.createElement('div');\n      div1.classList.add('board-cell');\n      div1.setAttribute('data-coords', `${i},${j}`);\n      div2.classList.add('board-cell');\n      div2.setAttribute('data-coords', `${i},${j}`);\n      boardOne.append(div1);\n      boardTwo.append(div2);\n    }\n  }\n  if (boardOneContainer.childElementCount > 1) boardOneContainer.removeChild(boardOneContainer.lastChild);\n  if (boardTwoContainer.childElementCount > 1) boardTwoContainer.removeChild(boardTwoContainer.lastChild);\n  boardOneContainer.append(boardOne);\n  boardTwoContainer.append(boardTwo);\n};\n//function that lets theplayer make his move by clicking on one of the cells\nconst boardController = gameloop => {\n  const boardTwo = document.querySelector('.board-two');\n  boardTwo.addEventListener('click', e => {\n    if (!e.target.dataset.coords) return;\n    const coords = e.target.dataset.coords.split(',').map(Number);\n    gameloop.takeTurn(coords);\n  });\n};\n//function that updates the board cells after an action has been made\nconst updateBoard = (coords, attack, player, enemy) => {\n  const boardOne = document.querySelector('.board-one');\n  const boardTwo = document.querySelector('.board-two');\n  const board = player.name ? boardTwo : boardOne;\n  for (let i = 0; i < board.childNodes.length; i++) {\n    const node = board.childNodes[i];\n    if (node.dataset.coords === coords.toString()) {\n      node.classList.add(attack ? 'hit' : 'miss');\n      break;\n    }\n  }\n  const sunkShips = enemy.board.checkSunk();\n  if (sunkShips) {\n    sunkShips.forEach(ship => {\n      ship.coords.forEach(coord => {\n        for (let i = 0; i < board.childNodes.length; i++) {\n          const node = board.childNodes[i];\n          if (node.dataset.coords === coord.toString()) {\n            node.classList.add('sunk');\n            break;\n          }\n        }\n      });\n    });\n  }\n};\n//function to show the players ships on the board\nconst showPlayerShips = playerShips => {\n  const boardOne = document.querySelector('.board-one');\n  playerShips.forEach(ship => {\n    ship.forEach(coords => {\n      for (let i = 0; i < boardOne.childNodes.length; i++) {\n        const node = boardOne.childNodes[i];\n        if (node.dataset.coords === coords.toString()) {\n          node.classList.add('friendly');\n          break;\n        }\n      }\n    });\n  });\n};\n//function to totate a ship horizontaly or verticaly\nconst rotateShip = ship => {\n  const rotatedShip = [];\n  let outOfBounds = false;\n  if (ship.length < 2) return ship;\n  if (ship[0][0] === ship[1][0]) {\n    ship.forEach((coord, index) => {\n      const x = coord[0] - index;\n      const y = coord[1] - index;\n      if (x < 0 || x > 9 || y < 0 || y > 9) outOfBounds = true;\n      rotatedShip.push([x, y]);\n    });\n  }\n  if (ship[0][1] === ship[1][1]) {\n    ship.forEach((coord, index) => {\n      const x = coord[0] + index;\n      const y = coord[1] + index;\n      if (x < 0 || x > 9 || y < 0 || y > 9) outOfBounds = true;\n      rotatedShip.push([x, y]);\n    });\n  }\n  if (outOfBounds) return ship;\n  return rotatedShip;\n};\n//function to move a ship on the board\nconst moveShip = (ship, newCoords) => {\n  const movedShip = [];\n  let outOfBounds = false;\n  if (ship.length < 2) return [newCoords];\n  if (ship[0][0] === ship[1][0]) {\n    ship.forEach((coord, index) => {\n      const x = newCoords[0];\n      const y = newCoords[1] + index;\n      if (x < 0 || x > 9 || y < 0 || y > 9) outOfBounds = true;\n      movedShip.push([x, y]);\n    });\n  }\n  if (ship[0][1] === ship[1][1]) {\n    ship.forEach((coord, index) => {\n      const x = newCoords[0] - index;\n      const y = newCoords[1];\n      if (x < 0 || x > 9 || y < 0 || y > 9) outOfBounds = true;\n      movedShip.push([x, y]);\n    });\n  }\n  if (outOfBounds) return ship;\n  return movedShip;\n};\n//function to build the modal board\nconst buildModalBoard = (board, ships) => {\n  for (let i = 9; i >= 0; i--) {\n    for (let j = 0; j <= 9; j++) {\n      const div = document.createElement('div');\n      div.setAttribute('data-coords', `${i},${j}`);\n      div.classList.add('modal-board-cell');\n      board.append(div);\n    }\n  }\n  ships.forEach((ship, index) => {\n    const coords = ship[0];\n    let isVertical = false;\n    if (ship.length > 1) isVertical = ship[0][0] !== ship[1][0];\n    const rotation = isVertical ? 'vertical' : 'horizontal';\n    for (let i = 0; i < board.childNodes.length; i++) {\n      const node = board.childNodes[i];\n      if (node.dataset.coords === coords.toString()) {\n        const div = document.createElement('div');\n        div.classList.add('modal-board-ship');\n        div.classList.add(`${rotation}-${ship.length}`);\n        div.setAttribute('data-index', index);\n        div.setAttribute('draggable', 'true');\n        node.append(div);\n        break;\n      }\n    }\n  });\n};\n//function to place the ships where you want on the board\nconst arrangeShips = ships => {\n  const boardShips = document.querySelectorAll('.modal-board-ship');\n  boardShips.forEach(boardShip => {\n    //rotates the ship on the board when clicked\n    boardShip.addEventListener('click', e => {\n      const ship = ships[boardShip.dataset.index];\n      const rotatedShip = rotateShip(ship);\n      const newShips = [...ships];\n      if (ship.toString() === rotatedShip.toString()) return;\n      newShips.splice(boardShip.dataset.index, 1);\n      const unique = rotatedShip.every(rotatedCoords => {\n        return newShips.every(newShip => {\n          return newShip.every(newCoords => {\n            return newCoords.toString() !== rotatedCoords.toString();\n          });\n        });\n      });\n      if (unique) {\n        ships.splice(e.target.dataset.index, 1, rotatedShip);\n        e.target.classList.toggle(`vertical-${rotatedShip.length}`);\n        e.target.classList.toggle(`horizontal-${rotatedShip.length}`);\n      }\n    });\n    //drages the ship on the board\n    const boardCells = document.querySelectorAll('.modal-board-cell');\n    boardCells.forEach(cell => {\n      cell.addEventListener('dragover', e => {\n        e.preventDefault();\n        const draggable = document.querySelector('.dragging');\n        const ship = ships[draggable.dataset.index];\n        const movedShip = moveShip(ship, cell.dataset.coords.split(',').map(Number));\n        const newShips = [...ships];\n        if (ship.toString() === movedShip.toString() && movedShip.length > 2) return;\n        newShips.splice(draggable.dataset.index, 1);\n        const unique = movedShip.every(movedCoords => {\n          return newShips.every(newShip => {\n            return newShip.every(newCoords => {\n              return newCoords.toString() !== movedCoords.toString();\n            });\n          });\n        });\n        if (unique) {\n          ships.splice(draggable.dataset.index, 1, movedShip);\n          cell.append(draggable);\n        }\n      });\n    });\n    boardShip.addEventListener('dragstart', () => {\n      boardShip.classList.add('dragging');\n    });\n    boardShip.addEventListener('dragend', () => {\n      boardShip.classList.remove('dragging');\n    });\n  });\n};\n//function that starts the game\nconst startGameModal = () => {\n  const board = document.querySelector('.modal-board');\n  const form = document.querySelector('.modal-form');\n  const randomBtn = document.querySelector('.modal-random');\n  let ships = (0,_randomShips__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n  buildModalBoard(board, ships);\n  arrangeShips(ships);\n  form.addEventListener('submit', e => {\n    e.preventDefault();\n    const nameInput = document.querySelector('.modal-name-input');\n    const name = document.querySelector('.board-one-title');\n    const modal = document.querySelector('.modal');\n    const newGame = (0,_gameloop__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(nameInput, ships);\n    modal.classList.add('display-none');\n    name.innerText = nameInput.value;\n    boardController(newGame);\n  });\n  randomBtn.addEventListener('click', () => {\n    ships = (0,_randomShips__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n    board.textContent = '';\n    buildModalBoard(board, ships);\n    arrangeShips(ships);\n  });\n};\n//function that called when aplayer has lost and the game is over\nconst gameOver = currentPlayer => {\n  const modal = document.querySelector('.modal');\n  const modalTitle = document.querySelector('.modal-title');\n  const outCome = document.querySelector('.modal-outcome');\n  outCome.innerText = `You ${currentPlayer.name ? 'Won 🥳' : 'Lost 🤷‍♂️'}`;\n  outCome.classList.remove('display-none');\n  modalTitle.innerText = 'Rearrange your ships and go again!';\n  modal.classList.remove('display-none');\n  buildBoards();\n};\n\n\n//# sourceURL=webpack://battleship/./src/modules/dom.js?");

/***/ }),

/***/ "./src/modules/gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/modules/ship.js\");\n\nconst gameBoard = array => {\n  const ships = [];\n  const availableAttacks = [];\n  const missedAttacks = [];\n  array.forEach(coord => {\n    const newShip = (0,_ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(coord.length);\n    newShip.coords = coord;\n    ships.push(newShip);\n  });\n  for (let i = 0; i < 10; i++) {\n    for (let j = 0; j < 10; j++) {\n      availableAttacks.push([i, j]);\n    }\n  }\n  const receiveAttack = attackCoords => {\n    const attackedIndex = availableAttacks.findIndex(item => item.toString() === attackCoords.toString());\n    availableAttacks.splice(attackedIndex, 1);\n    const isHit = ships.some(ship => {\n      let currentIndex = null;\n      const checkHit = ship.coords.some((coord, index) => {\n        currentIndex = index;\n        return attackCoords.toString() === coord.toString();\n      });\n      if (checkHit) ship.hit(currentIndex);\n      if (!checkHit) missedAttacks.push(attackCoords);\n      return checkHit;\n    });\n    return isHit;\n  };\n  const checkWin = () => {\n    return ships.every(ship => ship.isSunk());\n  };\n  const checkRemaining = () => {\n    const workingShips = [];\n    ships.forEach(ship => {\n      if (!ship.isSunk()) workingShips.push(ship);\n    });\n    return workingShips.length;\n  };\n  const checkSunk = () => {\n    return ships.filter(ship => ship.isSunk());\n  };\n  return {\n    availableAttacks,\n    receiveAttack,\n    checkWin,\n    checkRemaining,\n    checkSunk\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameBoard);\n\n//# sourceURL=webpack://battleship/./src/modules/gameboard.js?");

/***/ }),

/***/ "./src/modules/gameloop.js":
/*!*********************************!*\
  !*** ./src/modules/gameloop.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/modules/player.js\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ \"./src/modules/dom.js\");\n\n\nconst gameLoop = (name, shipArray) => {\n  let thePlayer = (0,_player__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(name, shipArray);\n  let theEnemy = (0,_player__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  let delay = false;\n  (0,_dom__WEBPACK_IMPORTED_MODULE_1__.showPlayerShips)(thePlayer.playerShips);\n  const updateTurn = () => {\n    const nextPlayer = theEnemy;\n    theEnemy = thePlayer;\n    thePlayer = nextPlayer;\n  };\n  const aiNextAttacks = [];\n  const aiTurn = () => {\n    const randomIndex = Math.floor(Math.random() * theEnemy.board.availableAttacks.length);\n    const randomCoords = theEnemy.board.availableAttacks[randomIndex];\n    const attackCoords = aiNextAttacks.length > 0 ? aiNextAttacks.shift() : randomCoords;\n    const checkCoords = theEnemy.board.availableAttacks.some(item => item.toString() === attackCoords.toString());\n    if (!checkCoords) {\n      aiTurn();\n      return;\n    }\n    const attack = thePlayer.attack(theEnemy.board, attackCoords);\n    if (attack) {\n      aiNextAttacks.push([attackCoords[0] + 1, attackCoords[1]]);\n      aiNextAttacks.push([attackCoords[0], attackCoords[1] + 1]);\n      aiNextAttacks.push([attackCoords[0] - 1, attackCoords[1]]);\n      aiNextAttacks.push([attackCoords[0], attackCoords[1] - 1]);\n    }\n    delay = true;\n    setTimeout(() => {\n      (0,_dom__WEBPACK_IMPORTED_MODULE_1__.updateBoard)(attackCoords, attack, thePlayer, theEnemy);\n      if (theEnemy.board.checkWin()) {\n        (0,_dom__WEBPACK_IMPORTED_MODULE_1__.gameOver)(thePlayer);\n        return;\n      }\n      delay = false;\n      if (!attack) updateTurn();\n      if (attack) aiTurn();\n    }, 250);\n  };\n  const takeTurn = coords => {\n    if (delay) return;\n    const checkCoords = theEnemy.board.availableAttacks.some(item => item.toString() === coords.toString());\n    if (!checkCoords) return;\n    const attack = thePlayer.attack(theEnemy.board, coords);\n    (0,_dom__WEBPACK_IMPORTED_MODULE_1__.updateBoard)(coords, attack, thePlayer, theEnemy);\n    if (theEnemy.board.checkWin()) {\n      (0,_dom__WEBPACK_IMPORTED_MODULE_1__.gameOver)(thePlayer);\n      return;\n    }\n    if (!attack) {\n      updateTurn();\n      aiTurn();\n    }\n  };\n  return {\n    takeTurn\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameLoop);\n\n//# sourceURL=webpack://battleship/./src/modules/gameloop.js?");

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

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/_reset.css":
/*!*********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/_reset.css ***!
  \*********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"/*\\n1. Use a more-intuitive box-sizing model.\\n*/\\n*, *::before, *::after {\\n    box-sizing: border-box;\\n}\\n/*\\n2. Remove default margin\\n*/\\n* {\\n    margin: 0;\\n}\\n/*\\n3. Allow percentage-based heights in the application\\n*/\\nhtml, body {\\n    height: 100%;\\n}\\n/*\\nTypographic tweaks!\\n4. Add accessible line-height\\n5. Improve text rendering\\n*/\\nbody {\\n    line-height: 1.5;\\n    -webkit-font-smoothing: antialiased;\\n}\\n/*\\n6. Improve media defaults\\n*/\\nimg, picture, video, canvas, svg {\\n    display: block;\\n    max-width: 100%;\\n}\\n/*\\n7. Remove built-in form typography styles\\n*/\\ninput, button, textarea, select {\\n    font: inherit;\\n}\\n/*\\n8. Avoid text overflows\\n*/\\np, h1, h2, h3, h4, h5, h6 {\\n    overflow-wrap: break-word;\\n}\\n/*\\n9. Create a root stacking context\\n*/\\n#root, #__next {\\n    isolation: isolate;\\n}\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://battleship/./src/styles/_reset.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/styles.css":
/*!*********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/styles.css ***!
  \*********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./_reset.css */ \"./node_modules/css-loader/dist/cjs.js!./src/styles/_reset.css\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ \"./node_modules/css-loader/dist/runtime/getUrl.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3__);\n// Imports\n\n\n\n\nvar ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../imgs/rocket-left.svg */ \"./src/imgs/rocket-left.svg\"), __webpack_require__.b);\nvar ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../imgs/rocket-right.svg */ \"./src/imgs/rocket-right.svg\"), __webpack_require__.b);\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\n___CSS_LOADER_EXPORT___.push([module.id, \"@import url(https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap);\"]);\nvar ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3___default()(___CSS_LOADER_URL_IMPORT_0___);\nvar ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3___default()(___CSS_LOADER_URL_IMPORT_1___);\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \":root {\\n    --clr-background: #9ab8ba;\\n    --clr-light-background: #ddf7f8;\\n    --clr-important-text: #045256;\\n    --clr-text: #0b1516;\\n}\\n\\nbody {\\n    display: flex;\\n    flex-direction: column;\\n    justify-content: space-between;\\n    align-items: center;\\n    font-family: 'Poppins', sans-serif;\\n    color: var(--clr-text);\\n    background: var(--clr-background);\\n}\\n/* Header */\\n.header {\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    background-color: var(--clr-light-background);\\n    color: var(--clr-important-text);\\n    width: 75%;\\n    height: 6rem;\\n    border-radius: 2rem;\\n    margin-top: 3rem;\\n    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,\\n        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,\\n        rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;\\n}\\n\\n.header-title {\\n    letter-spacing: 8px;\\n}\\n\\n.header-title::before {\\n    content: '';\\n    display: inline-block;\\n    vertical-align: middle;\\n    width: 2rem;\\n    height: 2rem;\\n    background-image: url(\" + ___CSS_LOADER_URL_REPLACEMENT_0___ + \");\\n    background-size: contain;\\n}\\n\\n.header-title::after {\\n    content: '';\\n    display: inline-block;\\n    vertical-align: middle;\\n    width: 2rem;\\n    height: 2rem;\\n    background-image: url(\" + ___CSS_LOADER_URL_REPLACEMENT_1___ + \");\\n    background-size: contain;\\n}\\n\\n/* Main */\\n.main {\\n    display: flex;\\n    justify-content: space-around;\\n    align-items: center;\\n    flex-wrap: wrap;\\n    width: 100%;\\n    max-width: 1100px;\\n    padding: 1rem 0;\\n    margin-bottom: 2rem;\\n    overflow-y: auto;\\n    overflow-y: overlay;\\n}\\n\\n.board-container {\\n    display: flex;\\n    flex-direction: column;\\n    align-items: center;\\n    width: 100%;\\n    max-width: 350px;\\n    padding: 1rem;\\n}\\n\\n.board-one-title,\\n.board-two-title {\\n    font-size: 1.7rem;\\n}\\n\\n.board-one,\\n.board-two {\\n    display: grid;\\n    grid-template-columns: repeat(10, 1fr);\\n    grid-template-rows: repeat(10, 1fr);\\n    aspect-ratio: 1;\\n    width: 100%;\\n    max-width: 350px;\\n    background-color: var(--clr-light-background);\\n    margin: 1rem;\\n    border-radius: 1rem;\\n    box-shadow: rgba(14, 30, 37, 0.3) 0px 2px 4px 0px,\\n        rgba(14, 30, 37, 0.5) 0px 2px 16px 0px;\\n}\\n\\n.board-cell {\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    border: 1px solid grey;\\n}\\ndiv[data-coords='9,0'] {\\n    border-radius: 1rem 0 0 0;\\n}\\ndiv[data-coords='9,9'] {\\n    border-radius: 0 1rem 0 0;\\n}\\ndiv[data-coords='0,0'] {\\n    border-radius: 0 0 0 1rem;\\n}\\ndiv[data-coords='0,9'] {\\n    border-radius: 0 0 1rem 0;\\n}\\n.board-cell.friendly {\\n    background-color: var(--clr-important-text);\\n}\\n.board-cell.hit::before {\\n    content: '';\\n    width: 50%;\\n    height: 50%;\\n    border-radius: 100vmax;\\n    background-color: #a80b44;\\n}\\n.board-cell.sunk {\\n    background-color: #a80b44;\\n}\\n.board-cell.miss::before {\\n    content: '';\\n    width: 50%;\\n    height: 50%;\\n    border-radius: 100vmax;\\n    background-color: var(--clr-text);\\n}\\n\\n.board-two .board-cell:hover:not(.friendly, .hit, .sunk, .miss) {\\n    background-color: rgba(0, 0, 0, 0.1);\\n    cursor: crosshair;\\n}\\n\\n/* Modal  */\\n.modal {\\n    position: absolute;\\n    inset: 0;\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    background-color: rgba(221,247,248, .3);\\n    backdrop-filter: blur(15px);\\n    z-index: 1;\\n}\\n\\n.modal-container {\\n    display: flex;\\n    flex-direction: column;\\n    align-items: center;\\n    gap: 1rem;\\n    position: relative;\\n    padding: 2rem;\\n    background-color: var(--clr-background);\\n    border-radius: 1.5rem;\\n    box-shadow: 0 0 22pt 5pt var(--clr-important-text);\\n    width: 90%;\\n    max-width: 400px;\\n}\\n\\n.modal-outcome {\\n    font-size: 1.8rem;\\n}\\n\\n.modal-title {\\n    font-size: 1.5rem;\\n    text-align: center;\\n}\\n\\n.modal-board {\\n    display: grid;\\n    grid-template-columns: repeat(10, 1fr);\\n    grid-template-rows: repeat(10, 1fr);\\n    aspect-ratio: 1;\\n    width: 100%;\\n    max-width: 350px;\\n    background-color: var(--clr-light-background);\\n    margin: 1rem;\\n    border-radius: 1rem;\\n    box-shadow: rgba(14, 30, 37, 0.3) 0px 2px 4px 0px,\\n        rgba(14, 30, 37, 0.5) 0px 2px 16px 0px;\\n}\\n\\n.modal-board-cell {\\n    border: 1px solid grey;\\n}\\n\\n.modal-board-ship {\\n    position: relative;\\n    width: 100%;\\n    aspect-ratio: 1;\\n    background-color: var(--clr-important-text);\\n    cursor: move;\\n}\\n.modal-board-ship::after {\\n    content: '';\\n    position: absolute;\\n    width: 100%;\\n    height: 100%;\\n    background-color: var(--clr-important-text);\\n}\\n.modal-board-ship.horizontal-1::after {\\n    width: 0;\\n}\\n.modal-board-ship.horizontal-2::after {\\n    left: 100%;\\n    width: calc(100% + 2px);\\n}\\n.modal-board-ship.horizontal-3::after {\\n    left: 100%;\\n    width: calc(200% + 4px);\\n}\\n.modal-board-ship.horizontal-4::after {\\n    left: 100%;\\n    width: calc(300% + 6px);\\n}\\n.modal-board-ship.horizontal-5::after {\\n    left: 100%;\\n    width: calc(400% + 8.5px);\\n}\\n.modal-board-ship.vertical-2::after {\\n    bottom: calc(-100% - 2px);\\n    height: calc(100% + 2px);\\n}\\n.modal-board-ship.vertical-3::after {\\n    bottom: calc(-200% - 4px);\\n    height: calc(200% + 4px);\\n}\\n.modal-board-ship.vertical-4::after {\\n    bottom: calc(-300% - 6px);\\n    height: calc(300% + 6px);\\n}\\n.modal-board-ship.vertical-5::after {\\n    bottom: calc(-400% - 8px);\\n    height: calc(400% + 8px);\\n}\\n\\n.modal-inputs {\\n    display: flex;\\n    flex-direction: column;\\n    justify-content: center;\\n    align-items: center;\\n}\\n\\n.modal-random {\\n    margin-top: -1rem;\\n    margin-bottom: 1rem;\\n    border: none;\\n    background: none;\\n    cursor: pointer;\\n    color: var(--clr-text);\\n    transition: .5s;\\n}\\n\\n.modal-random:hover svg {\\n    transition: .5s ease-in-out;\\n    transform: rotate(360deg);\\n    color: var(--clr-important-text);\\n}\\n\\n.modal-form {\\n    display: flex;\\n    flex-direction: column;\\n    align-items: center;\\n    gap: 1.7rem;\\n    padding: 1rem 1rem 0 1rem;\\n}\\n\\n.modal-name-input {\\n    all: unset;\\n    width: 80%;\\n    font-size: 1.2rem;\\n    text-align: center;\\n    border-bottom: 2px solid var(--clr-important-text);\\n}\\n\\n.modal-submit {\\n    width: 80%;\\n    height: 2.2rem;\\n    border: none;\\n    border-radius: 10px;\\n    background-color: var(--clr-light-background);\\n    color: var(--clr-important-text);\\n    font-weight: 800;\\n    font-size: 1.2rem;\\n    cursor: pointer;\\n    transition: .5s;\\n}\\n.modal-submit:hover {\\n    color: var(--clr-light-background);\\n    background-color: var(--clr-important-text);\\n    transform: translateY(-3px);\\n    box-shadow: 0 0 5pt 2pt var(--clr-light-background);\\n}\\n\\n\\n\\n/* Footer */\\nfooter {\\n    display: flex;\\n    justify-content: center;\\n    margin-bottom: 1rem;\\n    z-index: 0;\\n}\\n\\n.footer-link {\\n    text-decoration: none;\\n    width: 250px;\\n    height: 70px;\\n    border-radius: 15px;\\n    background-color: var(--clr-light-background);\\n    align-items: center;\\n    text-align: center;\\n    display: flex;\\n    flex-direction: row;\\n    justify-content: center;\\n    position: relative;\\n    cursor: pointer;\\n    overflow: hidden;\\n    transition: .5s;\\n}\\n\\n.footer-link svg {\\n    transition: .5s;\\n    width: 60px;\\n    height: 60px;\\n    color: var(--clr-important-text);\\n    position: absolute;\\n    top: 5px;\\n    right: 90px;\\n}\\n\\n.footer-link p {\\n    color: var(--clr-text);\\n    opacity: 0;\\n    position: absolute;\\n    top: 0;\\n    letter-spacing: 1.5px;\\n    transition: .5s;\\n}\\n\\n.footer-link:hover {\\n    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,\\n        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,\\n        rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;\\n}\\n\\n.footer-link:hover p {\\n    font-size: larger;\\n    font-weight: bolder;\\n    top: 25px;\\n    opacity: 1;\\n}\\n\\n.footer-link:hover svg {\\n    opacity: .2;\\n    top: 0px;\\n    right: 5px;\\n    height: 90px;\\n    width: 90px;\\n}\\n\\n/* hide  */\\n.display-none {\\n    display: none;\\n}\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://battleship/./src/styles/styles.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://battleship/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (url, options) {\n  if (!options) {\n    options = {};\n  }\n  if (!url) {\n    return url;\n  }\n  url = String(url.__esModule ? url.default : url);\n\n  // If url is already wrapped in quotes, remove them\n  if (/^['\"].*['\"]$/.test(url)) {\n    url = url.slice(1, -1);\n  }\n  if (options.hash) {\n    url += options.hash;\n  }\n\n  // Should url be wrapped?\n  // See https://drafts.csswg.org/css-values-3/#urls\n  if (/[\"'() \\t\\n]|(%20)/.test(url) || options.needQuotes) {\n    return \"\\\"\".concat(url.replace(/\"/g, '\\\\\"').replace(/\\n/g, \"\\\\n\"), \"\\\"\");\n  }\n  return url;\n};\n\n//# sourceURL=webpack://battleship/./node_modules/css-loader/dist/runtime/getUrl.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://battleship/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/styles/styles.css":
/*!*******************************!*\
  !*** ./src/styles/styles.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./styles.css */ \"./node_modules/css-loader/dist/cjs.js!./src/styles/styles.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://battleship/./src/styles/styles.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n\n  return updater;\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n/* istanbul ignore next  */\n\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n\n    memo[target] = styleTarget;\n  }\n\n  return memo[target];\n}\n/* istanbul ignore next  */\n\n\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n\n  target.appendChild(style);\n}\n\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\n\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\n\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n\n  var needLayer = typeof obj.layer !== \"undefined\";\n\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n\n  css += obj.css;\n\n  if (needLayer) {\n    css += \"}\";\n  }\n\n  if (obj.media) {\n    css += \"}\";\n  }\n\n  if (obj.supports) {\n    css += \"}\";\n  }\n\n  var sourceMap = obj.sourceMap;\n\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  options.styleTagTransform(css, styleElement, options.options);\n}\n\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n\n  styleElement.parentNode.removeChild(styleElement);\n}\n/* istanbul ignore next  */\n\n\nfunction domAPI(options) {\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\n\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\n\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/imgs/rocket-left.svg":
/*!**********************************!*\
  !*** ./src/imgs/rocket-left.svg ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"imgs/rocket-left.57b2ad0714c5c2a5adbe..svg\";\n\n//# sourceURL=webpack://battleship/./src/imgs/rocket-left.svg?");

/***/ }),

/***/ "./src/imgs/rocket-right.svg":
/*!***********************************!*\
  !*** ./src/imgs/rocket-right.svg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"imgs/rocket-right.d6c0a90472a92244899f..svg\";\n\n//# sourceURL=webpack://battleship/./src/imgs/rocket-right.svg?");

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
/******/ 			id: moduleId,
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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
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