import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useAppDispatch, useAppSelector } from "../../../../store/hooks"
import { fetchCategoryItems } from "../../../../store/adminCategorySlice"
import { Status } from "../../../../globals/types/type"
import { addProducts, resetStatus } from "../../../../store/adminProductSlice"

interface ModalProps{
    closeModal : ()=>void
}
export interface IProduct{
    productName : string,
    productDescription : string,
  productTotalStock : number,
    productPrice : number,
    discount : number,
    categoryId : string,
    productImage : File | null
}

const ProductModal:React.FC<ModalProps>=({closeModal} : ModalProps)=>
// function Modal({closeModal} : {closeModal : ()=>void}){

{
    const [data,setData]= useState<IProduct>({
        productName : "",
    productDescription : "",
    productTotalStock : 0,
    productPrice : 0,
    discount : 0,
    categoryId : "",
    productImage : null

    })
    const handleChange = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const target = e.target as HTMLInputElement;
  const { name, value } = target;

  if (name === "productImage") {
    console.log(target.files);
    console.log(target.files?.[0]);

    setData({
      ...data,
      productImage: target.files?.[0] || null,
    });

    return;
  }

  setData({
    ...data,
    [name]: target.type === "number" ? Number(value) : value,
  });
};
    const dispatch = useAppDispatch()
    // const [categoryName,setCategoryName] = useState<string>("")
    const{items} = useAppSelector((store)=>store.categories)
     const{status} = useAppSelector((store)=>store.adminProducts)
    const [loading, setLoading] = useState(false)
    const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setLoading(true)
        try {
          dispatch(addProducts(data as any))
        } catch (error) {
            console.log(error)}

//         }finally{
//  setLoading(false)
//             closeModal()
//         }
//     }
    
  }
  const fetchCategories = ()=>{
    dispatch(fetchCategoryItems())
  }
  useEffect(()=>{
      if(status === Status.SUCCESS){
        setLoading(false)
        closeModal()
        dispatch(resetStatus())
      }return
    },[status])

    return(
      <div id="modal" className="fixed inset-0 z-50 flex items-center justify-center">
  <div className="fixed inset-0 bg-black/50" />
  
  <div className="relative w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Product</h3>
      <button id="closeModalButton" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" onClick={closeModal}>
        <svg className="h-4 w-4 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <div className="space-y-4">
    <form action="submit" onSubmit={handleSubmit}>
          <div>
        <label htmlFor="website_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product Name</label>
        
        <input name="productName" type="text" id="website_url" className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500" placeholder="category" required onChange={handleChange} />
      
       
      </div>
       <div>
        <label htmlFor="website_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product Price</label>
        
        <input name="productPrice" type="number" id="number" className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500" placeholder="category" required onChange={handleChange} />
      </div>
       <div>
        <label htmlFor="website_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product Total Stock</label>
        
        <input name="productTotalStock" type="number" id="website_url" className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500" placeholder="category" required onChange={handleChange} />
      </div>
       <div>
        <label htmlFor="website_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product Discount</label>
        
        <input name="discount" type="number" id="website_url" className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500" placeholder="category" required onChange={handleChange} />
      </div>
       <div>
        <label htmlFor="website_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product Description</label>
        
        <textarea name="productDescription" id="website_url" className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500" placeholder="category" required onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="website_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product Image</label>
        
        <input name="productImage" type="file" id="website_url" className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500" placeholder="category" required onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="website_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product Category</label>
        
      <select  onChange={handleChange} onClick={fetchCategories} name="categoryId" id="" className="w-[170px] h-[50px]">
      {
        items.length > 0 && items.map((item)=>{
            return(
                <option key={item.id} value={item.id}>{item.categoryName}</option>
            )
        })
      }
      </select>
      </div>
      <div className="flex justify-end gap-3"> 
        <button id="cancelButton" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600" onClick={closeModal}>
          Cancel
        </button>
        <button id="submitUrlButton" className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-md bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 dark:from-indigo-500 dark:to-violet-500 dark:hover:from-indigo-600 dark:hover:to-violet-600" disabled={loading}>
         {
            loading ? "adding..." : "Add"
         }
          <svg className="h-4 w-4 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </form>
    </div>
  </div>
</div>

    )
}

export default ProductModal
