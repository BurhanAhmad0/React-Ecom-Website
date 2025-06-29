// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext.jsx";

// Create the context
const AppContext = createContext();

// Custom hook for easier use
export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [products, setProducts] = useState(null);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [CartLoading, setCartLoading] = useState(true);

  const handleAddToCart = async (productId) => {
    // Determine the state of the cart *before* the optimistic update
    const originalCartState = cart; // This correctly captures the current array reference

    // --- Start of State Management Fix ---

    // 1. Check if the product already exists in the cart
    const existingItemIndex = cart.findIndex(
      (item) => item.product_id === productId
    );

    let newCartState;

    if (existingItemIndex > -1) {
      // Product already exists: Create a NEW array with the quantity updated for that item
      newCartState = cart.map(
        (item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 } // Create a new object for the updated item
            : item // Keep other items as they are
      );
    } else {
      // Product does NOT exist: Create a NEW array with the new item added
      // IMPORTANT: When adding a new item, you usually need more than just productId and quantity.
      // You'll likely need product_name, product_price, product_image, etc.
      // For this example, I'll just use what's provided, but consider fetching/passing full product details.
      newCartState = [
        ...cart, // Spread the existing items into the new array
        {
          product_id: productId,
          quantity: 1,
          // Add other necessary product details here if you have them,
          // e.g., product_name: 'Fetched Product Name', product_price: 10.00
        },
      ];
    }

    // Optimistically update the cart state with the NEWLY constructed array
    setCart(newCartState);

    // --- End of State Management Fix ---

    try {
      const data = {
        userId: user.userId, // Assuming 'user' is available in scope
        quantity: 1, // This quantity might need to be dynamic if you're sending the *change* or new total
      };

      // Note: The backend API /api/cart/:productId might need to handle
      // both adding a new item and incrementing quantity based on its logic.
      // The 'data' payload might need to reflect this.
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE}/cart/${productId}`,
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        toast.success("Product added to cart successfully");
        // If your backend returns the updated cart or product details,
        // you might want to use that to update the state here for full synchronization.
        // e.g., setCart(response.data.updatedCart);
      }
    } catch (error) {
      // Revert to original cart state if the API call fails
      setCart(originalCartState);
      const message = error.response?.data?.message || error.message;
      toast.error(message);
      console.error("Add product error:", message);
    }
  };

  const handleUpdateQuantity = async (productId, cartEvent, quantity = 1) => {
    const originalCart = cart;

    // Create a NEW array by mapping over the existing cart
    const updatedCart = cart
      .map((item) => {
        // If this is the product we want to update
        if (item.product_id?._id === productId) {
          // Create a NEW item object with the updated quantity
          let newQuantity;
          if (cartEvent === "increaseQuantity") {
            newQuantity = item.quantity + (quantity || 1);
          } else if (cartEvent === "decreaseQuantity") {
            newQuantity = item.quantity - (quantity || 1);
          } else {
            // Handle invalid cartEvent if necessary, or default to current quantity
            console.warn("Invalid cartEvent:", cartEvent);
            return item; // Return item unchanged for invalid event
          }

          // Ensure quantity doesn't go below 0 (or 1 if you prefer)
          if (newQuantity < 0) {
            // If it goes negative, cap at 0
            newQuantity = 0;
          }

          // Return a NEW item object with the updated quantity
          return { ...item, quantity: newQuantity };
        }
        // For all other items, return them as they are (no change needed)
        return item;
      })
      .filter((item) => item.quantity > 0); // Filter out any items whose quantity dropped to 0

    // Update the cart state with the NEWLY constructed array
    setCart(updatedCart);

    try {
      const data = {
        userId: user.userId, // Send userId in the body, as per your backend route
        cartEvent: cartEvent,
        quantity: quantity,
      };

      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE}/cart/${productId}`,
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
    } catch (error) {
      setCart(originalCart);
      const message = error.response?.data?.message || error.message;
      toast.error(message);
      console.error("Delete product error:", message);
    }
  };

  const handleProductDelete = async (productId) => {
    const originalCart = cart;

    // Filter creates a NEW array with all items EXCEPT the one matching productId
    const updatedCart = cart.filter((item) => {
      // Return true for items you want to KEEP in the new array.
      // So, we keep items whose product_id._id does NOT match the productId we want to delete.
      return item.product_id?._id !== productId;
    });

    // Update the cart state with the NEW array
    setCart(updatedCart);

    if (!user || !user.userId) {
      toast.error("You must be logged in to remove items from the cart.");
      return;
    }

    try {
      const data = {
        userId: user.userId, // Send userId in the body, as per your backend route
      };

      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE}/cart/${productId}`,
        {
          data: data, // For DELETE requests, body is passed in the 'data' property of config
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("Product removed from cart successfully!");
        // Live update the cart state with the new cart data from the backend response
      }
    } catch (error) {
      setCart(originalCart);
      const message = error.response?.data?.message || error.message;
      toast.error(message);
      console.error("Delete product error:", message);
    }
  };

  // Optional: Check if user is already logged in
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE}/product`,
          {
            withCredentials: true,
          }
        );
        setProducts(res.data.products);
      } catch (err) {
        setProducts(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user]);

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE}/cart`, {
          withCredentials: true,
        });
        setCart(res.data.cartProducts);
      } catch (err) {
        setCart(null);
      } finally {
        setCartLoading(false);
      }
    };

    fetchCartProducts();
  }, [user]);

  const values = {
    cart,
    setCart,
    products,
    loading,
    CartLoading,
    handleAddToCart,
    handleUpdateQuantity,
    handleProductDelete,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
