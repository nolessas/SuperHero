const apiUrl = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';

function populateHeroes(obj) {
  const section = document.createElement("section");
  section.className = "heroes-container";
  document.body.appendChild(section);
  const heroes = obj.members;

  heroes.forEach((hero, index) => {
    const heroDiv = document.createElement("div");
    heroDiv.className = "hero-column";

    const myH2 = document.createElement("h2");
    const myPara1 = document.createElement("p");
    const myPara2 = document.createElement("p");
    const myPara3 = document.createElement("p");
    const myList = document.createElement("ul");

    myH2.textContent = hero.name;
    myPara1.textContent = `Secret identity: ${hero.secretIdentity}`;
    myPara2.textContent = `Age: ${hero.age}`;
    myPara3.textContent = "Superpowers:";

    hero.powers.forEach(power => {
      const listItem = document.createElement("li");
      listItem.textContent = power;
      myList.appendChild(listItem);
    });

    heroDiv.appendChild(myH2);
    heroDiv.appendChild(myPara1);
    heroDiv.appendChild(myPara2);
    heroDiv.appendChild(myPara3);
    heroDiv.appendChild(myList);

    section.appendChild(heroDiv);
  });

  // Create a container for all buttons at the bottom
  const allButtonsContainer = document.createElement("div");
  allButtonsContainer.className = "all-buttons-container";

  heroes.forEach((hero, index) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";

    const changeIdentityBtn = document.createElement("button");
    changeIdentityBtn.textContent = `Change ${hero.name}'s Identity`;
    changeIdentityBtn.onclick = () => changeSecretIdentity(hero, index);
    buttonContainer.appendChild(changeIdentityBtn);

    const changeAgeBtn = document.createElement("button");
    changeAgeBtn.textContent = `Change ${hero.name}'s Age`;
    changeAgeBtn.onclick = () => changeAge(hero, index);
    buttonContainer.appendChild(changeAgeBtn);

    const addPowerBtn = document.createElement("button");
    addPowerBtn.textContent = `Add ${hero.name}'s Power`;
    addPowerBtn.onclick = () => addSuperpower(hero, index);
    buttonContainer.appendChild(addPowerBtn);

    const removePowerBtn = document.createElement("button");
    removePowerBtn.textContent = `Remove ${hero.name}'s Power`;
    removePowerBtn.onclick = () => removeSuperpower(hero, index);
    buttonContainer.appendChild(removePowerBtn);

    allButtonsContainer.appendChild(buttonContainer);
  });

  document.body.appendChild(allButtonsContainer);
}

function changeSecretIdentity(hero, index) {
  const newIdentity = prompt(`Enter new secret identity for ${hero.name}:`);
  if (newIdentity) {
    hero.secretIdentity = newIdentity;
    updateHeroInfo(index);
  }
}

function changeAge(hero, index) {
  const newAge = prompt(`Enter new age for ${hero.name}:`);
  if (newAge && !isNaN(newAge)) {
    hero.age = parseInt(newAge);
    updateHeroInfo(index);
  }
}

function addSuperpower(hero, index) {
  const newPower = prompt(`Enter new superpower for ${hero.name}:`);
  if (newPower) {
    hero.powers.push(newPower);
    updateHeroInfo(index);
  }
}

function removeSuperpower(hero, index) {
  const powerToRemove = prompt(`Enter superpower to remove from ${hero.name}:`);
  if (powerToRemove) {
    const powerIndex = hero.powers.indexOf(powerToRemove);
    if (powerIndex > -1) {
      hero.powers.splice(powerIndex, 1);
      updateHeroInfo(index);
    }
  }
}

function updateHeroInfo(index) {
  const heroColumns = document.querySelectorAll('.hero-column');
  const hero = heroes[index];
  const heroColumn = heroColumns[index];

  heroColumn.innerHTML = `
    <h2>${hero.name}</h2>
    <p>Secret identity: ${hero.secretIdentity}</p>
    <p>Age: ${hero.age}</p>
    <p>Superpowers:</p>
    <ul>
      ${hero.powers.map(power => `<li>${power}</li>`).join('')}
    </ul>
  `;
}

function displaySquadInfo(squad) {
  const header = document.createElement("header");
  const h1 = document.createElement("h1");
  h1.textContent = squad.squadName;
  h1.className = "font-effect-fire";
  header.appendChild(h1);

  const info = document.createElement("p");
  info.className = "info";
  info.textContent = `Hometown: ${squad.homeTown} // Formed: ${squad.formed}`;
  header.appendChild(info);

  document.body.appendChild(header);

  heroes = squad.members; // Make heroes globally accessible
  populateHeroes(squad);
}

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        displaySquadInfo(data);
    })
    .catch(error => {
        console.error('Error fetching superhero data:', error);
        document.body.textContent = 'Error loading superhero data';
    });
