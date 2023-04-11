import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { useAppDispatch } from '../../hook';
import { listProductDetails, updateProduct } from '../../actions/productAction';
import axios from 'axios';
import { resetUpdateOrder } from '../../Reducers/productDetailsReducer';
import Footer from '../../components/Footer';

function ProductEditScreen() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const ProductDetails = useSelector(
    (state: RootState) => state.productDetails
  );
  const {
    loading,
    error,
    productDetails: product,
    successUpdate,
  } = ProductDetails;

  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (successUpdate) {
      dispatch(resetUpdateOrder());
      navigate('/admin/productlist');
    }
    if (product?._id !== params.id) {
      if (params.id) {
        dispatch(listProductDetails(params?.id));
      }
    } else {
      if (product) {
        setName(product?.name);
        setBrand(product?.brand);
        setCategory(product?.category);
        setCountInStock(product.countInStock);
        setPrice(product.price);
        setDescription(product.description);
        setImage(product.image);
      }
    }
  }, [dispatch, params, product, successUpdate]);

  const uploadFileHandler = async (e: React.FormEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    const formData = new FormData();
    formData.append('image', file as Blob);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  const updateProductHandle = (e: React.FormEvent) => {
    e.preventDefault();
    if (params.id) {
      dispatch(
        updateProduct({
          _id: params.id,
          name,
          price,
          image,
          brand,
          category,
          description,
          countInStock,
        })
      );
    }
  };

  return (
    <div className="container m-auto px-2 max-w-[1140px]">
      <Link
        className=" text-[13px] text-gray-500 tracking-wide font-semibold hover:bg-stone-200 p-3 rounded"
        to={`/admin/productlist`}
      >
        GO BACK
      </Link>
      <h1 className="uppercase mt-10  text-3xl font-sans  tracking-widest">
        EDIT PRODUCT
      </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <form className="mt-5" onSubmit={updateProductHandle}>
          <div className="mb-3">
            <label className="block text-gray-500 text-sm tracking-wider mb-2">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-500 text-sm tracking-wider mb-2">
              Price
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-500 text-sm tracking-wider mb-2">
              Image
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-3.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter image url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div className="mb-3 flex justify-start ">
            {uploading ? (
              <Loader style="w-5 h-5" />
            ) : (
              <input
                id="image-file"
                type="file"
                className=" w-full py-3 "
                onChange={(e) => uploadFileHandler(e)}
              />
            )}
          </div>
          <div className="mb-3">
            <label className="block text-gray-500 text-sm tracking-wider mb-2">
              Brand
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter brand "
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-500 text-sm tracking-wider mb-2">
              Count In Stock
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              placeholder="Enter countInStock"
              value={countInStock}
              onChange={(e) => setCountInStock(Number(e.target.value))}
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-500 text-sm tracking-wider mb-2">
              Category
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter category "
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-500 text-sm tracking-wider mb-2">
              Description
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter description "
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white text-xs px-6 py-4 tracking-wide"
          >
            UPDATE
          </button>
        </form>
      )}
      <Footer />
    </div>
  );
}

export default ProductEditScreen;
