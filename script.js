// PROVIDED: use this collection to generate the entries.
const $creatures = [
  {
    "name": "Moss Dragon",
    "description": "A gentle gardener who grows tiny forests wherever it naps.",
    "image": "assets/moss-dragon.svg",
    "alt": "A green dragon with leafy horns and small wings."
  },
  {
    "name": "Cloud Fox",
    "description": "A sky wanderer collecting soft clouds and lost daydreams.",
    "image": "assets/cloud-fox.svg",
    "alt": "A pale blue fox with pointed ears and a fluffy tail."
  },
  {
    "name": "Ember Salamander",
    "description": "A warm little companion that keeps campfires glowing.",
    "image": "assets/ember-salamander.svg",
    "alt": "An orange salamander with a flame at the end of its tail."
  },
  {
    "name": "Moon Owl",
    "description": "A quiet navigator who reads the stories written in stars.",
    "image": "assets/moon-owl.svg",
    "alt": "A purple owl with a crescent moon on its forehead."
  },
  {
    "name": "Crystal Turtle",
    "description": "A patient explorer carrying a sparkling crystal garden.",
    "image": "assets/crystal-turtle.svg",
    "alt": "A mint green turtle with purple crystals on its shell."
  },
  {
    "name": "Mushroom Sprite",
    "description": "A woodland storyteller with a spotted cap and muddy boots.",
    "image": "assets/mushroom-sprite.svg",
    "alt": "A small cream sprite wearing a red spotted mushroom cap."
  }
]

// YOUR WORK ---------------------------------------------------------

// Pseudocode: select the collection list, both controls and the status message
const collectionList = document.querySelector('#collection')
const themeSelect = document.querySelector('#theme')
const layoutSelect = document.querySelector('#layout')
const statusMessage = document.querySelector('#status')

// Assignment-specific Local Storage key
const STORAGE_KEY = 'mtm6302-a4-creature-collection-preferences'

// Pseudocode: loop through the creatures array, build one <li> per creature,
// and add it to the collection list. Called once on load, so no duplicates.
function renderCollection() {
  collectionList.innerHTML = ''

  for (const creature of $creatures) {
    const item = document.createElement('li')
    item.classList.add('creature')

    const image = document.createElement('img')
    image.src = creature.image
    image.alt = creature.alt

    const info = document.createElement('div')
    info.classList.add('creature-info')

    const name = document.createElement('h3')
    name.textContent = creature.name

    const description = document.createElement('p')
    description.classList.add('creature-description')
    description.textContent = creature.description

    info.append(name, description)
    item.append(image, info)
    collectionList.append(item)
  }
}

// Pseudocode: show a short message to the visitor
function showMessage(message) {
  statusMessage.textContent = message
}

// Pseudocode: apply the chosen theme to body and the chosen layout to the list
function applyPreferences(theme, layout) {
  document.body.dataset.theme = theme
  collectionList.dataset.layout = layout
}

// Pseudocode: read both controls, apply them, store them together as one JSON object
function savePreferences() {
  const preferences = {
    theme: themeSelect.value,
    layout: layoutSelect.value
  }

  applyPreferences(preferences.theme, preferences.layout)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences))
  showMessage('Preferences saved.')
}

// Pseudocode: if saved data exists, parse it, set the controls and apply the look.
// If nothing is saved, keep the default look and show a message (no storage write).
function restorePreferences() {
  const savedData = localStorage.getItem(STORAGE_KEY)

  if (savedData === null) {
    showMessage('No saved preferences yet. Showing Enchanted Forest with Cards.')
    return
  }

  const preferences = JSON.parse(savedData)
  themeSelect.value = preferences.theme
  layoutSelect.value = preferences.layout
  applyPreferences(preferences.theme, preferences.layout)
  showMessage('Saved preferences restored.')
}

// Pseudocode: save whenever either control changes
themeSelect.addEventListener('change', savePreferences)
layoutSelect.addEventListener('change', savePreferences)

// Pseudocode: on page load, build the collection, then restore preferences
renderCollection()
restorePreferences()
