"use client";

import { Suspense, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const indianStates = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand",
  "Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur",
  "Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan",
  "Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh",
  "Uttarakhand","West Bengal","Delhi"
];

function AddressContent(){

  const { register, handleSubmit, formState:{errors}, reset } = useForm();
  const { setAddress } = useCart();
  const router = useRouter();

  const [phone,setPhone] = useState("");

  const searchParams = useSearchParams();
  const isEdit = searchParams.get("edit");

  useEffect(()=>{

    if(isEdit === "true"){

      const savedAddress = localStorage.getItem("shippingAddress");

      if(savedAddress){

        const parsed = JSON.parse(savedAddress);

        reset(parsed);
        setPhone(parsed.phone || "");

      }

    }

  },[isEdit, reset]);


  function onSubmit(data){

    data.phone = phone;

    setAddress(data);

    localStorage.setItem(
      "shippingAddress",
      JSON.stringify(data)
    );

    router.push("/payment");

  }

  return(

    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">

      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-6 md:p-8">

        <h1 className="text-2xl md:text-3xl font-semibold text-center mb-8">
          Shipping Address
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >

          <div className="md:col-span-2">
            <input
              {...register("name",{required:"Full name required"})}
              placeholder="Full Name"
              className="border p-3 rounded w-full"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <input
              {...register("email",{
                required:"Email required",
                pattern:{
                  value:/\S+@\S+\.\S+/,
                  message:"Invalid email"
                }
              })}
              placeholder="Email"
              className="border p-3 rounded w-full"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <PhoneInput
              country={"in"}
              value={phone}
              onChange={setPhone}
              containerClass="w-full"
              inputClass="!w-full !h-[44px]"
            />
          </div>

          <div className="md:col-span-2">
            <input
              {...register("address1",{required:"Address required"})}
              placeholder="House No, Building, Street"
              className="border p-3 rounded w-full"
            />
            {errors.address1 && <p className="text-red-500 text-sm">{errors.address1.message}</p>}
          </div>

          <div className="md:col-span-2">
            <input
              {...register("address2")}
              placeholder="Area, Landmark (Optional)"
              className="border p-3 rounded w-full"
            />
          </div>

          <div>
            <input
              {...register("pincode",{
                required:"PIN required",
                pattern:{
                  value:/^[0-9]{6}$/,
                  message:"Invalid PIN"
                }
              })}
              placeholder="PIN Code"
              className="border p-3 rounded w-full"
            />
            {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode.message}</p>}
          </div>

          <div>
            <input
              {...register("city",{required:"City required"})}
              placeholder="City"
              className="border p-3 rounded w-full"
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
          </div>

          <div className="md:col-span-2">
            <select
              {...register("state",{required:"Select state"})}
              className="border p-3 rounded w-full"
            >
              <option value="">Select State</option>

              {indianStates.map((state)=>(
                <option key={state} value={state}>{state}</option>
              ))}

            </select>

            {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
          </div>

          <div className="md:col-span-2 pt-4">

            <button
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium"
            >
              Continue to Payment
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default function AddressPage(){
  return(
    <Suspense fallback={<div>Loading...</div>}>
      <AddressContent/>
    </Suspense>
  )
}