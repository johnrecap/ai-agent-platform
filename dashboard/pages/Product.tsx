import React, { useState, useEffect } from 'react';
import { Plus, Filter, MoreHorizontal, Package, Search, Trash2, Edit, X } from 'lucide-react';
import { productsData } from '../constants/mockData';
import { Product as ProductType } from '../types';

const Product = () => {
  const [products, setProducts] = useState<ProductType[]>(productsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);

  // New Product Form State
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    stock: '',
    category: 'Software'
  });

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveMenuId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleMenu = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
        setProducts(products.filter(p => p.id !== id));
        setActiveMenuId(null);
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const productToAdd: ProductType = {
        id: newId,
        name: newProduct.name,
        price: newProduct.price.startsWith('$') ? newProduct.price : `$${newProduct.price}`,
        stock: newProduct.stock, // In real app ensure number vs string consistency
        category: newProduct.category
    };
    setProducts([...products, productToAdd]);
    setIsAddModalOpen(false);
    setNewProduct({ name: '', price: '', stock: '', category: 'Software' });
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-6" onClick={() => setActiveMenuId(null)}>
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
        <div className="flex items-center gap-3 w-full sm:w-auto">
             <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-full sm:w-64 pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 transition-colors" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none whitespace-nowrap"
            >
                <Plus size={16} /> Add Product
            </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
         {filteredProducts.map((product) => (
             <div key={product.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all group relative">
                 <div className="h-40 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
                     <Package size={48} className="text-gray-300 dark:text-gray-500" />
                 </div>
                 
                 {/* Dropdown Trigger */}
                 <div className="absolute top-6 right-6 z-10">
                     <button 
                        onClick={(e) => toggleMenu(e, product.id)}
                        className={`p-1.5 rounded-md transition-all ${
                            activeMenuId === product.id 
                            ? 'bg-white text-gray-900 opacity-100 shadow-sm' 
                            : 'bg-white/80 dark:bg-gray-800/80 text-gray-500 dark:text-gray-300 opacity-0 group-hover:opacity-100 hover:bg-white dark:hover:bg-gray-600'
                        }`}
                     >
                         <MoreHorizontal size={16} />
                     </button>
                     
                     {/* Dropdown Menu */}
                     {activeMenuId === product.id && (
                        <div className="absolute right-0 top-full mt-1 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 z-20 animate-in fade-in zoom-in duration-200 overflow-hidden">
                            <button className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
                                <Edit size={12} /> Edit
                            </button>
                            <button 
                                onClick={() => handleDelete(product.id)}
                                className="w-full text-left px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                            >
                                <Trash2 size={12} /> Delete
                            </button>
                        </div>
                     )}
                 </div>

                 <div className="flex justify-between items-start mb-2">
                     <div>
                         <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded-full">{product.category}</span>
                         <h3 className="font-bold text-gray-900 dark:text-white mt-2 line-clamp-1">{product.name}</h3>
                     </div>
                 </div>
                 <div className="flex justify-between items-center mt-4">
                     <span className="text-lg font-bold text-gray-900 dark:text-white">{product.price}</span>
                     <span className="text-xs text-gray-500 dark:text-gray-400">{product.stock} in stock</span>
                 </div>
             </div>
         ))}
         {filteredProducts.length === 0 && (
             <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400">
                 No products found matching "{searchTerm}"
             </div>
         )}
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-gray-700" onClick={(e) => e.stopPropagation()}>
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-700/50">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Add New Product</h2>
                    <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <X size={20} />
                    </button>
                </div>
                
                <form onSubmit={handleAddProduct} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product Name</label>
                        <input 
                            required
                            type="text" 
                            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="e.g. Analytics Pro"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price</label>
                            <input 
                                required
                                type="text" 
                                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="$0.00"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stock</label>
                            <input 
                                required
                                type="text" 
                                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="100 or 'Unlimited'"
                                value={newProduct.stock}
                                onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                        <select 
                            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={newProduct.category}
                            onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                        >
                            <option value="Software">Software</option>
                            <option value="Service">Service</option>
                            <option value="Add-on">Add-on</option>
                            <option value="Support">Support</option>
                            <option value="Plugin">Plugin</option>
                        </select>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button 
                            type="button" 
                            onClick={() => setIsAddModalOpen(false)}
                            className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none"
                        >
                            Create Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default Product;