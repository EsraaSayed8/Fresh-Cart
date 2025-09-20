import Products from "@/components/products/Products";
import Categories from "@/components/home/Categories/Categories";
import MainSlider from "@/components/home/MainSlider/MainSlider";

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center'>
      <MainSlider />
      <Categories />
      <Products />
    </div>
  );
}
