const mealItemsSection = document.getElementById('mealItemsDiv');                       //Select Meals Item showing Div
const errorMessage = document.getElementById('errorMessage');                           //Select Error Message Showing Div
const showProductItemsDetails = document.getElementById('showMealItemsDetails');        //Select Meals Details Showing div

document.getElementById('searchBtn').addEventListener('click', () => {                  // Search Button Select by Event
    const searchValue = document.getElementById('searchInput')                          //Select Search Input for Input Value

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue.value}`)  //API Call by Meal Name
        .then(res => res.json())
        .then(data => mealItemsFunc(data))

    const mealItemsFunc = allMealItem => {                                              //Meal Name and Meal Picture Show Function by Searching KeyWard
        const mealItems = allMealItem.meals
        mealItemsSection.innerHTML = '';
        showProductItemsDetails.innerHTML = '';


        //Condition for Meal Item Show
        if (mealItems == null || mealItems == undefined ||(searchValue.value == '')) {
            errorMessage.innerHTML = `
            <h1>Sorry sir, Please Enter a Available Meal!</h1>
            `;
            mealItemsSection.innerHTML = '';
            showProductItemsDetails.innerHTML = '';
            searchValue.value = '';
        }
        else {
            mealItems.forEach(singleMealItem => {

                searchValue.value = '';
                errorMessage.innerHTML = '';

                const mealDiv = document.createElement('div');                          //Create Div Tag

                const mealInfo = `
                <div class="singleMealItemDiv" onclick="showMealDetailsFunc('${singleMealItem.strMeal}')" >
                <img src="${singleMealItem.strMealThumb}">
                <h3>${singleMealItem.strMeal}</h3>
                </div>
                `;
                mealDiv.innerHTML = mealInfo;
                mealItemsSection.appendChild(mealDiv)
            });
        }
    }
});

const showMealDetailsFunc = mealItemName => {                                              //API Call Function  for Showing Single Meal Details
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealItemName}`
    fetch(url)
        .then(res => res.json())
        .then(data => mealDetailsFunc(data))
}

const mealDetailsFunc = mealItemDetails => {                                               //Single Meal Details Function
    const MealDetails = mealItemDetails.meals
    MealDetails.forEach(singleMealDetails => {
        //Single Meal Details Template
        showProductItemsDetails.innerHTML = `
            <img src="${singleMealDetails.strMealThumb}" alt="">
                <div class="mealItemDetailsCardBody">
                    <h2>${singleMealDetails.strMeal}</h2>
                    <h4>Ingredient</h4>
                    <ul class="list-unstyled">
                        <li>${singleMealDetails.strMeasure1} ${singleMealDetails.strIngredient1}</li>
                        <li>${singleMealDetails.strMeasure2} ${singleMealDetails.strIngredient2}</li>
                        <li>${singleMealDetails.strMeasure3} ${singleMealDetails.strIngredient3}</li>
                        <li>${singleMealDetails.strMeasure4} ${singleMealDetails.strIngredient4}</li>
                        <li>${singleMealDetails.strMeasure5} ${singleMealDetails.strIngredient5}</li>
                        <li>${singleMealDetails.strMeasure6} ${singleMealDetails.strIngredient6}</li>
                        <li>${singleMealDetails.strMeasure7} ${singleMealDetails.strIngredient7}</li>
                        <li>${singleMealDetails.strMeasure8} ${singleMealDetails.strIngredient8}</li>
                        <li>${singleMealDetails.strMeasure9} ${singleMealDetails.strIngredient9}</li>
                        <li>${singleMealDetails.strMeasure10} ${singleMealDetails.strIngredient10}</li>
                    </ul>
                </div>
    `;
    })
}