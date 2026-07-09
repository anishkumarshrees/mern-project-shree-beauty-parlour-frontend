import { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import CategoryTable from "./components/Table";
import axios from "axios";
import { API } from "../../../http";


export interface ICategory{
    id: string,
    categoryName : string
}
function Categories() {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await API.get("/category");

      if (response.status === 200) {
        setCategories(response.data.data);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <AdminLayout>
      <CategoryTable categories={categories} />
    </AdminLayout>
  );
}

export default Categories