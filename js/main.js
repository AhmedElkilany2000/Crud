var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCateInput = document.getElementById("productCate");
var productDescInput = document.getElementById("Description");
var productImageInput = document.getElementById("Image");
var searchInput = document.getElementById("searchInput");
var addbtn = document.getElementById("addbtn");
var updatebtn = document.getElementById("updatebtn");

var productContainer;

if(localStorage.getItem('products') === null){
var productContainer = [];
}else{
    productContainer = JSON.parse(localStorage.getItem("products"));
    displayProduct();
}

var priceRegex = /^[0-9]+(\.[0-9]{1,2})?$/;

function addProduct() {
    if (productNameInput.value === "" || productCateInput.value === "" || productPriceInput.value === "" || productDescInput.value === "") {
        alert("Please fill in all fields.");
        return;
    }

    if (!priceRegex.test(productPriceInput.value)) {
        alert("Please enter a valid price (must be a positive number with an optional number of decimals).");
        return;
    }

    var product = {
        productName: productNameInput.value,
        category: productCateInput.value,
        price: parseFloat(productPriceInput.value), 
        Description: productDescInput.value,
        Image: "images/1.jpg",
    };

    productContainer.push(product);
    clearForm();
    displayProduct();
    localStorage.setItem("products", JSON.stringify(productContainer));
}


function clearForm() {
    productNameInput.value = "";
    productCateInput.value = "";
    productPriceInput.value = "";
    productDescInput.value = "";
    productImageInput.value = "";
}

function displayProduct() {
    var cartona = '';
    for (var i = 0; i < productContainer.length; i++) {
        cartona += `
            <div class="col-md-3 col-sm-6 mb-4">
                <img src="images/1.jpg" alt="product" width="200" class="img-fluid">
                <h2 class="h4 mt-3">${productContainer[i].productName}</h2>
                <p class="text-secondary mb-2">${productContainer[i].Description}</p>
                <h3 class="h5">${productContainer[i].category}</h3>
                <p class="h6">Price: $${productContainer[i].price}</p>
                <button class="btn btn-danger" onclick="deleteProduct(${i})">Delete Product</button>
                <button class="btn btn-warning" onclick="updateProduct(${i})">Edit Product</button>
            </div>
        `;
    }
    document.getElementById("rowData").innerHTML = cartona;
}

function deleteProduct(indexof){
    productContainer.splice(indexof,1)
    displayProduct();
    localStorage.setItem("products" , JSON.stringify(productContainer));
}

function searchProduct() {
    var termRegex = /^[a-zA-Z0-9\s]+$/; 

    if (!termRegex.test(term)) {
        alert("Please enter valid search text");
        return;
    }

    var cartona = ``;
    for (var i = 0; i < productContainer.length; i++) {
        if (productContainer[i].productName.toLowerCase().includes(term.toLowerCase())) {
            cartona += `
            <div class="col-md-3 col-sm-6 mb-4">
                <img src="images/1.jpg" alt="product" width="200" class="img-fluid">
                <h2 class="h4 mt-3">${productContainer[i].productName}</h2>
                <p class="text-secondary mb-2">${productContainer[i].Description}</p>
                <h3 class="h5">${productContainer[i].category}</h3>
                <p class="h6">Price: $${productContainer[i].price}</p>
                <button class="btn btn-danger" onclick="deleteProduct(${i})">Delete Product</button>
                <button class="btn btn-warning" onclick="updateProduct(${i})">Edit Product</button>
            </div>
        `;
        }
    }
    document.getElementById("rowData").innerHTML = cartona;
}


var updateindex; 
function updateProduct(i) {
    updateindex = i;
    addbtn.classList.add('d-none');
    updatebtn.classList.remove('d-none');
    productNameInput.value = productContainer[updateindex].productName;
    productCateInput.value = productContainer[updateindex].category;
    productPriceInput.value = productContainer[updateindex].price;
    productDescInput.value = productContainer[updateindex].Description;
}


function update() {
    if (updateindex === undefined) {
        console.error('updateindex is not defined');
        return;
    }

    var nameRegex = /^[\w\s]+$/; 
    var priceRegex = /^[0-9]+(\.[0-9]{1,2})?$/; 

    if (!nameRegex.test(productNameInput.value) || !nameRegex.test(productCateInput.value)) {
        alert("Please enter the product name and product category correctly.");
        return;
    }

    if (productNameInput.value === "" || productCateInput.value === "" || productPriceInput.value === "" || productDescInput.value === "") {
        alert("Please fill in all fields.");
        return;
    }

    if (!priceRegex.test(productPriceInput.value) || parseFloat(productPriceInput.value) <= 0) {
        alert("Please enter a valid price (must be a positive number with an optional number of decimals).");
        return;
    }

    productContainer[updateindex].productName = productNameInput.value;
    productContainer[updateindex].category = productCateInput.value;
    productContainer[updateindex].price = parseFloat(productPriceInput.value); 
    productContainer[updateindex].Description = productDescInput.value;

    localStorage.setItem("products", JSON.stringify(productContainer));
    updatebtn.classList.add('d-none');
    addbtn.classList.remove('d-none');
    displayProduct();
    clearForm();
}



