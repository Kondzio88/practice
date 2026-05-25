
// Api pexels KEY

const apiKey = 'Wi02Xt0oW6OLVje3MTfEHmoAZRYDKzXAQuCqYLvxrjLqCNHKkd1j2B07'

const app = () => {

    // Variables

    const mainContainer = document.querySelector('.container')
    const foodName = document.querySelector('#food')
    const proteinInp = document.querySelector('#protein')
    const carbInp = document.querySelector('#carb')
    const fatInp = document.querySelector('#fat')
    const displayFoodText = document.querySelector('.display-food-text')
    const popUp = document.querySelector('.pop-up-box')
    const mealBoxDisplay = document.querySelector('.box-meal-display')

    const addBtn = document.querySelector('.add-btn')
    const displayBtn = document.querySelector('.display-btn')

    let imageBackground = null

    const mealList = []

    // Function Input and Create Object

    const inputObject = () => {

        const protein = Number(proteinInp.value);
        const carb = Number(carbInp.value);
        const fat = Number(fatInp.value);

        if (!foodName.value || !proteinInp.value || !carbInp.value || !fatInp.value) {
            popUpFunc(`<p><i data-lucide="x"></i> Podaj dane</p>`,false)
            return
        }

        const mealObj = {
            name: foodName.value,
            protein: protein,
            carb: carb,
            fat: fat,
            totalKcal: (protein * 4) + (carb * 4) + (fat * 9)
        }

        mealList.push(mealObj)


        // Pop up Active
        if (!popUp.classList.contains('active')) {

            foodName.value = ''
            proteinInp.value = ''
            carbInp.value = ''
            fatInp.value = ''

            popUpFunc(`<p><i data-lucide="check"></i> Posiłek dodany</p>`, true)
        }
    }

    // Async function to getting Image from Api Pexels

    async function fetchFoodImage(key) {

        const searchTerm = 'food meal'

        if (!searchTerm) {
            return
        }

        const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchTerm)}&per_page=1`

        const res = await fetch(url, {
            headers: { Authorization: key }
        })

        const data = await res.json()
        const image = data.photos[0]?.src?.large2x

        // Return image form fetch to var
        imageBackground = image
        mainContainer.style.background = `url("${image}") center / cover no-repeat`
    }

    // Func to UpperCase First Letter
    const formatName = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1)
    }

    // Function Dispaly Meal and Image

    const displayfunction = (list) => {

        if (mealList.length === 0) {
            popUpFunc(`<p><i data-lucide="x"></i> Nie ma posiłku</p>`,false)
            return
        }

        displayFoodText.style.display = 'none'
        mealBoxDisplay.innerHTML = ''

        if (!imageBackground || list.length === 0) {
            return
        }

        list.forEach(el => {


            const mealDiv = document.createElement('div')
            mealDiv.innerHTML =
                `<div class="meal">
                                <h2 class="name-food-text">${formatName(el.name)}  <i data-lucide="soup"></i></h2>
                                <p class="text">${el.protein} g<span> białko </span><i data-lucide="egg"></i></p>
                                <p class="text">${el.carb} g<span> węgle </span><i data-lucide="wheat"></i></p>
                                <p class="text">${el.fat} g<span> tłuszcz</span><i data-lucide="droplet"></i></p>
                                <p class="text">${el.totalKcal} <span>Kcal</span> <i data-lucide="flame"></i></p>
                                </div>`
            mealBoxDisplay.appendChild(mealDiv)
        }
        );
        lucide.createIcons()
    }

    // Pop Up Function

    const popUpFunc = (message, bool) => {
        if (bool === true) {
            popUp.style.border = 'solid 1px #6bfb04'
            popUp.style.color = '#6bfb04'
        } else {
            popUp.style.border = 'solid 1px #ed0739'
            popUp.style.color = '#ed0739'
        }
        popUp.classList.add('active')
        popUp.innerHTML = ''
        popUp.innerHTML = `${message}`
        setTimeout(() => {
            popUp.classList.remove('active')
        }, 2500)

        lucide.createIcons()
    }

    // Fetch image set

    fetchFoodImage(apiKey)

    //  Event Listener to Create Obj and Push to mealList

    addBtn.addEventListener('click', inputObject)
    displayBtn.addEventListener('click', () => displayfunction(mealList))

    // Func Lucide create Icons
    lucide.createIcons()
}

app()


