const searchInput = document.getElementById("search");
const resultsDiv = document.getElementById("results");

let debounceTimer;

searchInput.addEventListener("input", () => {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
        const query = searchInput.value.toLowerCase();

        fetch("products.json")
            .then(response => response.json())
            .then(data => {
                const filtered = data.products.filter(product =>
                    product.name.toLowerCase().includes(query)
                );

                resultsDiv.innerHTML = "";

                if (filtered.length === 0) {
                    resultsDiv.innerHTML = "<p>No results found</p>";
                    return;
                }

                filtered.forEach(product => {
                    resultsDiv.innerHTML += `
                        <p>
                            <strong>${product.name}</strong><br>
                            Price: ₹${product.price}<br>
                            Category: ${product.category}
                        </p>
                        <hr>
                    `;
                });
            })
            .catch(() => {
                resultsDiv.innerHTML = "<p>Error fetching products</p>";
            });
    }, 500); // 500ms debounce
});
