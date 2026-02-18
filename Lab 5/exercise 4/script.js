let products = [];
fetch("inventory.json")
    .then(response => response.json())
    .then(data => {
        products = data;
        displayProducts();
    })
    .catch(error => alert("Error loading JSON data"));

function displayProducts(list = products) {
    const table = document.getElementById("tableBody");
    table.innerHTML = "";
    let total = 0;

    list.forEach((p, index) => {
        total += p.price * p.stock;

        const row = document.createElement("tr");
        if (p.stock < 5) row.classList.add("low-stock");

        row.innerHTML = `
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>${p.category}</td>
            <td>${p.price}</td>
            <td>${p.stock}</td>
            <td><button onclick="deleteProduct(${index})">Delete</button></td>
        `;
        table.appendChild(row);
    });

    document.getElementById("totalValue").innerText =
        "Total Inventory Value: ₹" + total;
}

function addProduct() {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const category = document.getElementById("category").value;
    const price = document.getElementById("price").value;
    const stock = document.getElementById("stock").value;

    if (!id || !name || !category || !price || !stock) {
        alert("All fields are required");
        return;
    }

    const existing = products.find(p => p.id == id);

    if (existing) {
        existing.price = Number(price);
        existing.stock = Number(stock);
    } else {
        products.push({
            id: Number(id),
            name,
            category,
            price: Number(price),
            stock: Number(stock)
        });
    }

    displayProducts();
}

function deleteProduct(index) {
    products.splice(index, 1);
    displayProducts();
}

function searchCategory() {
    const value = document.getElementById("search").value.toLowerCase();
    const filtered = products.filter(p =>
        p.category.toLowerCase() === value
    );
    displayProducts(filtered);
}
