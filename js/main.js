// all plant //
const loadAllPlant = async() => {
    const url = 'https://openapi.programming-hero.com/api/plants';
    const load = await fetch(url);
    const json = await load.json();
    displayAllPlant(json.plants);
}

const displayAllPlant= plants => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";
    
    
    plants.forEach(element => {
        const item = document.createElement('div');
        item.innerHTML = `
        <div class="tree-card flex flex-col bg-white p-4 h-full rounded-lg">
                        <img src="${element.image}" loading="lazy" alt="${element.name}" class="w-full mb-2 h-[200px] object-cover rounded-lg">
                        <h2 onclick="showTreeDatail(${element.id})" class="tree-name font-semibold text-lg my-2 cursor-pointer">${element.name}</h2>
                        <p class="text-sm text-[#1F2937] line-clamp-3">${element.description}</p>
                        <div class="flex flex-1 justify-between my-3 pr-2.5">
                            <div class="badge !rounded-full !bg-[#DCFCE7] font-medium !py-3 !px-4 !text-[#15803D]">${element.category}</div>
                            <h1 class="font-semibold text-[16px]">৳${element.price}</h1>
                        </div>
                        <button class="btn primary-btn w-full !bg-[#15803D] !text-white !py-5 my-2 !rounded-full">Add to Cart</button>
                    </div>

        `;

        cardContainer.appendChild(item);
    });
}

// end all plant //

// modal data //

const showTreeDatail = async(id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    const loadData = await fetch(url);
    const json = await loadData.json();

    const modal = document.getElementById('modal-content');
    modal.innerHTML = "";

    const element = document.createElement('div');
    element.innerHTML = `
    <h2 class="tree-name font-semibold text-[20px] my-2">${json.plants.name}</h2>
                        <img src="${json.plants.image}" alt class="w-full my-2 h-[300px] object-cover">
                        <h1 class="text-[16px] my-2"><span class="font-semibold text-black">Category:</span>${json.plants.category}</h1> 
                        <h1 class="text-[16px] my-2"><span class="font-semibold text-black">Price: ৳</span>${json.plants.price}</h1>
                        <p class="text-[16px] text-[#1F2937] my-2"><span class="font-semibold text-black">Description:</span>${json.plants.description}</p>
    `;

    modal.appendChild(element);
    tree_modal.showModal();
}

//end modal data //

// categories //

const loadCategories = () => {
    const url = `https://openapi.programming-hero.com/api/categories`;

    fetch(url).then(res => res.json()).then(data => showCategories(data.categories));
}

const showCategories = (categories) => {
    const categoryContainer = document.getElementById('categories-container');
    categoryContainer.innerHTML = `<div onclick="changeBtnState('categories-btn-all'); loadAllPlant();" id="categories-btn-all" class="bg-[#15803D] categories-btn cursor-pointer text-white py-2 px-2.5 rounded-sm">All Trees</div>`;
    
    categories.forEach(element => {
        const item = document.createElement('div');
        item.innerHTML = `<div onclick="loadByCategory(${element.id})" id="categories-btn-${element.id}" class="categories-btn py-2 px-2.5 cursor-pointer rounded-sm hover:bg-[#CFF0DC]">${element.category_name}</div>`;
        categoryContainer.appendChild(item);
    });

}

const loadByCategory = (id) => {
    changeBtnState(`categories-btn-${id}`);
    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    fetch(url).then(res => res.json()).then(data => displayAllPlant(data.plants));
}

const changeBtnState = (id) => {
    const categoryBtn = document.querySelectorAll('.categories-btn');

    categoryBtn.forEach(element => {
        element.classList.remove('bg-[#15803D]', 'text-white');
        element.classList.add('hover:bg-[#CFF0DC]');
    });
    const btn = document.getElementById(id);
    btn.classList.add('bg-[#15803D]', 'text-white');
    btn.classList.remove('hover:bg-[#CFF0DC]');
}

// end categories //



loadCategories();
loadAllPlant();
