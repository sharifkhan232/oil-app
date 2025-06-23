// JavaScript to handle product selection, price calculation, and bill generation
document.addEventListener('DOMContentLoaded', () => {
    const productDropdown = document.getElementById('product-name');
    const priceInput = document.getElementById('product-price');
    const quantityInput = document.getElementById('product-quantity');
    const addProductButton = document.querySelector('.add-product-btn');
    const productTableBody = document.getElementById('product-table-body');
    const totalPriceSpan = document.getElementById('total-price');
    const generateBillButton = document.getElementById('generate-bill-btn');
    
    let totalPrice = 0;

    // Define product prices
    const productPrices = {
        'premium-oil': 50,
        'engine-cleaner': 25,
        'car-wash': 15
    };

    // Update price when product is selected
    productDropdown.addEventListener('change', () => {
        const selectedProduct = productDropdown.value;
        if (selectedProduct) {
            priceInput.value = productPrices[selectedProduct];
        }
    });

    // Add product to the order summary
    addProductButton.addEventListener('click', () => {
        const selectedProduct = productDropdown.value;
        const productPrice = parseFloat(priceInput.value);
        const quantity = parseInt(quantityInput.value);

        if (selectedProduct && !isNaN(productPrice) && quantity > 0) {
            const totalProductPrice = productPrice * quantity;

            // Add product row to table
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${selectedProduct.replace('-', ' ').toUpperCase()}</td>
                <td>${quantity}</td>
                <td>$${productPrice.toFixed(2)}</td>
                <td>$${totalProductPrice.toFixed(2)}</td>
            `;
            productTableBody.appendChild(row);

            // Update the total price
            totalPrice += totalProductPrice;
            totalPriceSpan.textContent = totalPrice.toFixed(2);

            // Reset the form
            document.getElementById('product-form').reset();
        } else {
            alert('Please fill in all the fields correctly.');
        }
    });

    // Generate bill
    generateBillButton.addEventListener('click', () => {
        const customerName = document.getElementById('customer-name').value;
        const customerPhone = document.getElementById('customer-phone').value;

        if (totalPrice > 0 && customerName && customerPhone) {
            alert(`
                Bill for ${customerName} (${customerPhone})\n
                Total Amount: $${totalPrice.toFixed(2)}\n
                Thank you for your purchase!
            `);
            // Optionally, you can clear the table and reset total price
            productTableBody.innerHTML = '';
            totalPrice = 0;
            totalPriceSpan.textContent = '0';
        } else {
            alert('Please add products and fill in customer details.');
        }
    });
});
