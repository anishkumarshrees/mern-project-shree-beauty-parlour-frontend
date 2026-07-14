import { useEffect } from "react";
import AdminLayout from "../AdminLayout";
import CategoryTable from "./components/Table";
// import axios from "axios";

import { fetchCategoryItems } from "../../../store/adminCategorySlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";


export interface ICategory{
    id: string,
    categoryName : string
}
function Categories() {
  // const [categories, setCategories] = useState<ICategory[]>([]);

  // const fetchCategories = async () => {
  //   try {
  //     const response = await API.get("/category");

  //     if (response.status === 200) {
  //       setCategories(response.data.data);
  //     } else {
  //       alert("Something went wrong");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
const dispatch = useAppDispatch()
const {items:categories} = useAppSelector((store)=>store.categories)
  useEffect(() => {
   dispatch( fetchCategoryItems());
  }, []);

  return (
    <AdminLayout>
      <CategoryTable categories={categories} />
    </AdminLayout>
  );
}

export default Categories