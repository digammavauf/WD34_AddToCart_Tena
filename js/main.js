let catalog = [
    {
        productSKU: "SS001",
        productImage: "https://picsum.photos/seed/1/300/300",
        productName: "Subic Shirt Round Neck",
        productVariant: "Round Aircool Sublimation",
        productDescription: "Personalized Subic round neck Aircool shirt using full sublimation print",
        productPrice: 200
    },
    {
        productSKU: "SS002",
        productImage: "https://picsum.photos/seed/2/300/300",
        productName: "Subic Shirt V Neck",
        productVariant: "V Aircool Sublimation",
        productDescription: "Personalized Subic V neck Aircool shirt using full sublimation print",
        productPrice: 250
    },
    {
        productSKU: "PS001",
        productImage: "https://picsum.photos/seed/3/300/300",
        productName: "Poco A Poco Hotel Shirt Round Neck",
        productVariant: "Round Aircool Sublimation",
        productDescription: "Personalized Agoda round neck Aircool shirt using full sublimation print",
        productPrice: 300
    },
    {
        productSKU: "PS002",
        productImage: "https://picsum.photos/seed/4/300/300",
        productName: "Poco A Poco Hotel Shirt V Neck",
        productVariant: "V Aircool Sublimation",
        productDescription: "Personalized Poco A Poco Hotel V neck Aircool shirt using full sublimation print",
        productPrice: 350
    }
];

let cart = [
    {
        productName: "Sample1",
        productPrice: 200
    }
];

function showCatalog() {
    let productsHTML = "";
    for(let item of catalog) {
        productsHTML += `
                <div class="col-md-3 col-sm-6 col-12">
                    <div class="card h-100">
                        <img class="card-img-top" src="${item.productImage}">
                        <div class="card-header">
                            <h4 class="card-title">${item.productName} <span class="fs-5 text-warning">SKU: ${item.productSKU}</span></h4>
                            <h6 class="card-subtitle text-muted">${item.productVariant}</h6>
                        </div>
                        <div class="card-body">
                            <div class="card-text">${item.productDescription}</div>
                        </div>
                        <div class="card-footer">
                            <div class="row d-flex flex-row flex-wrap pe-1 justify-content-between">
                                <div class="fs-4 fw-bold col-md-6 col-sm-6 col-12">&#x20B1; ${item.productPrice}</div>
                                <button id="addtocart" class="btn btn-warning col-md-6 col-sm-6 col-12" onclick="addToCart('${item.productSKU}|${item.productName}|${item.productVariant}', ${item.productPrice})"><span class="fa-solid fa-cart-plus"></span> Add to Cart</span></button>
                            </div>
                        </div>
                    </div>
                </div>
`;
    }
    if(!document.querySelector("#catalog")) return;
    document.querySelector("#catalog").innerHTML = productsHTML;
}

showCatalog();

function showCart() {
    let productsHTML = `
                <caption>List of products</caption>
                <thead class="bg-warning">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Particulars</th>
                        <th scope="col">Price</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
`;
    let amountDue = 0;
    if(localStorage.getItem("cart")) cart = JSON.parse(localStorage.getItem("cart"));
    let itemIndex = 0;
    for(let item of cart) {
        let product = item.productName.split("|");
        productsHTML += `
                    <tr>
                        <th scope="row">${itemIndex+1}</th>
                        <td>
                            <span class="bg-secondary text-warning p-1 rounded">SKU: ${product[0]}</span>
                            <span class="fs-5 fw-semibold">${product[1]}</span>
                            <span class="text-muted">${product[2]}</span>
                        </td>
                        <td>${item.productPrice}</td>
                        <td><button class="btn btn-danger" onclick="removeFromCart(${itemIndex++})"><span class="fa-solid fa-cart-minus"></span> Remove</button></td>
                    </tr>
`;
        amountDue += item.productPrice;
    }
    productsHTML += `
                </tbody>
`;
    if(amountDue > 0) {
        productsHTML += `
                <tfoot class="bg-warning">
                    <tr>
                        <td>&nbsp;</td>
                        <td>Amount Due</td>
                        <td>${amountDue}</td>
                        <td><button class="btn btn-success" onclick="checkout"><span class="fa-solid fa-cart-check"></span> Checkout</button></td>
                    </tr>
                </tfoot>
`;
    }
    if(!document.querySelector("#cartItemCount")) return;
    document.querySelector("#cartItemCount").innerText = itemIndex;
    if(!document.querySelector("#cart")) return;
    document.querySelector("#cart").innerHTML =  productsHTML;
}

showCart();

function addToCart(name, price) {
    cart.push({productName: name, productPrice: price});
    localStorage.setItem("cart", JSON.stringify(cart));
    showCart();
}

function removeFromCart(itemIndex) {
    cart.splice(itemIndex, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    showCart();
}