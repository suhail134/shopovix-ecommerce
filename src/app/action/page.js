"use server"
export const Initiate = async (amount, form, products, customerName,customerAddress) => {
  try {
    const res = await fetch("/api/customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form, // Customer ka data
        products, // product array [{productId, quantity}]
        totalAmount: amount, // total price
        razorpayOrderId: "", // Placeholder for Razorpay order ID
        image: products.length > 0 ? products[0].image : "", // First product image or empty string
        customerName: form.firstName,
        email: form.email,
        customerAddress: form.fullAddress,// full address
        paymentMethod: "ONLINE", // Payment method

      }),
    });

    const data = await res.json();
    if (data.success) {
      return data.order; // Razorpay ka order return karega
    } else {
      alert("Failed to initiate payment");
      return null;
    }
  } catch (err) {
    console.error("Error in initiate:", err);
    return null;
  }
};
