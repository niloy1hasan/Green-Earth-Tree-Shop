// product data //
const cartProduct = [];
// product data //

// all plant //
const loadAllPlant = async() => {
    manageSpinner(true);
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
                        <button onclick="addToCart({id : ${element.id},name : '${element.name}',price : ${element.price}})" class="btn primary-btn w-full !bg-[#15803D] !text-white !py-5 my-2 !rounded-full">Add to Cart</button>
                    </div>

        `;

        cardContainer.appendChild(item);
    });

    manageSpinner(false);
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
    manageSpinner(true);
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

// spinner //

const manageSpinner = (status) =>{
  const spinner = document.getElementById('loading-spinner');
  const cardContainer = document.getElementById('card-container');
  if(status == true){
    spinner.classList.remove('hidden');
    cardContainer.classList.add('hidden');
    cardContainer.classList.remove('grid');
    spinner.classList.add('flex');
  } else {
    spinner.classList.remove('flex');
    cardContainer.classList.remove('hidden');
    cardContainer.classList.add('grid');
    spinner.classList.add('hidden');
  }
}

// end spinner //

// add to cart btn //
const addToCart = (data) => {
    const found = cartProduct.find(item => item.id === data.id);
    if(found){
        found.quantity++;
    } else {
        cartProduct.push({...data, quantity : 1});
        document.getElementById('product-amount-badge').innerText = cartProduct.length.toString();
    }

    updateCart();
}

const updateCart = () => {
    const container = document.getElementById('cart-item-container');
    container.innerHTML = "";

    let total = 0;

    cartProduct.forEach(element => {
        total += element.price * element.quantity;
        const item = document.createElement('div');
        item.innerHTML = `
        <div class="cart-item flex justify-between items-center bg-[#F0FDF4] py-2 px-3 rounded-lg">
                            <div>
                                <h1 class="font-semibold">${element.name}</h1>
                                <p class="text-[#1F2937]/50">৳<span>${element.price}</span> <i class="fa-solid fa-xmark text-[#1F2937]/30 font-thin text-sm"></i> <span>${element.quantity}</span></p>
                            </div>
                            <div class="cursor-pointer"><i class="fa-solid fa-xmark text-[#1F2937]/30"></i></div>
                        </div>
        `;

        container.appendChild(item);
    });

    document.getElementById('total-amount-id').innerText = total.toString();
};


// end add to cart btn //


loadCategories();
loadAllPlant();
