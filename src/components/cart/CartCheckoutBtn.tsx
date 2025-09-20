import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function CartCheckoutBtn() {
  return (
    <Link href={`/checkout`}>
      <Button className='cursor-pointer'>Checkout</Button>
    </Link>
  );
}
