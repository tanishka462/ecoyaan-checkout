"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { cartData } from "../data/cartData";

const CartContext = createContext();

function getFromStorage(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

export function CartProvider({ children }) {
  const [cart, setCartState] = useState(null);
  const [addresses, setAddressesState] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [checkoutStep, setCheckoutStepState] = useState(1);

  // Load from localStorage on first render
  useEffect(() => {
    setCartState(getFromStorage("ecoyaan_cart", cartData));
    setAddressesState(getFromStorage("ecoyaan_addresses", []));
    setSelectedAddressId(getFromStorage("ecoyaan_selected_address", null));
    setCheckoutStepState(getFromStorage("ecoyaan_step", 1));
  }, []);

  // Persist cart
  const setCart = (value) => {
    setCartState(value);
    localStorage.setItem("ecoyaan_cart", JSON.stringify(value));
  };

  // Persist addresses (array of multiple addresses)
  const addAddress = (newAddress) => {
    const id = Date.now(); // unique id
    const withId = { ...newAddress, id };
    const updated = [...addresses, withId];
    setAddressesState(updated);
    setSelectedAddressId(id);
    localStorage.setItem("ecoyaan_addresses", JSON.stringify(updated));
    localStorage.setItem("ecoyaan_selected_address", JSON.stringify(id));
  };

  const updateAddress = (id, updatedAddress) => {
    const updated = addresses.map((a) => (a.id === id ? { ...updatedAddress, id } : a));
    setAddressesState(updated);
    localStorage.setItem("ecoyaan_addresses", JSON.stringify(updated));
  };

  const deleteAddress = (id) => {
    const updated = addresses.filter((a) => a.id !== id);
    setAddressesState(updated);
    if (selectedAddressId === id) {
      const newSelected = updated.length > 0 ? updated[0].id : null;
      setSelectedAddressId(newSelected);
      localStorage.setItem("ecoyaan_selected_address", JSON.stringify(newSelected));
    }
    localStorage.setItem("ecoyaan_addresses", JSON.stringify(updated));
  };

  const selectAddress = (id) => {
    setSelectedAddressId(id);
    localStorage.setItem("ecoyaan_selected_address", JSON.stringify(id));
  };

  // Persist checkout step
  const setCheckoutStep = (step) => {
    setCheckoutStepState(step);
    localStorage.setItem("ecoyaan_step", JSON.stringify(step));
  };

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId) || null;

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addresses,
        addAddress,
        updateAddress,
        deleteAddress,
        selectAddress,
        selectedAddress,
        selectedAddressId,
        checkoutStep,
        setCheckoutStep,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}