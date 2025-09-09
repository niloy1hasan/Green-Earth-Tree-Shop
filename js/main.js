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

loadAllPlant();