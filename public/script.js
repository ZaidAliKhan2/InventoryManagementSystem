const addItemBtn = document.getElementById("addItemBtn");
const itemTableBody = document.getElementById("itemTableBody");
const template = document.getElementById("newRowTemplate");

addItemBtn.addEventListener("click", () => {
  const clone = template.content.cloneNode(true);
  itemTableBody.prepend(clone);
});

// Handle Save & Cancel
document.addEventListener("click", async function (e) {
  const row = e.target.closest("tr");

  if (e.target.classList.contains("cancelBtn")) {
    row.remove();
  }

  if (e.target.classList.contains("saveBtn")) {
    const itemName = row.querySelector('input[name="itemName"]').value;
    const quantity = row.querySelector('input[name="quantity"]').value;
    const category = row.querySelector('input[name="category"]').value;

    const response = await fetch("/inventory/addItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemName, quantity, category }),
    });

    if (response.ok) {
      window.location.reload(); // Refresh to show new item
    } else {
      alert("Failed to save item.");
    }
  }
});

document.getElementById("filterSelect").addEventListener("change", function () {
  if (this.value) {
    window.location.href = this.value;
  }
});
