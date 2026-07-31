import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import StarRating from '../components/common/StarRating';
import QuantityStepper from '../components/common/QuantityStepper';
import productStore from '../stores/productStore';
import cartStore from '../stores/cartStore';
import AppConstants from '../utils/AppConstants';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import ProductReview from '../components/ProductReview/ProductReview';

const ProductDetailPage = observer(() => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const toastRef = useRef(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    productStore.fetchProductDataById(productId);
    setQuantity(1);
  }, [productId]);

  if (productStore.detailLoading) {
    return <LoadingSpinner message={AppConstants.PRODUCT_DETAIL_LOADING_TEXT} />;
  }

  if (productStore.detailError) {
    return <ErrorMessage
      message={productStore.detailError}
      onRetry={() => productStore.fetchProductDataById(productId)}
    />;
  }

  const product = productStore.selectedProduct;
  if (!product) {
    return null;
  }

  const handleAddToCart = () => {
    cartStore.addToCart(product, quantity);
    toastRef.current?.show({
      severity: 'success',
      summary: AppConstants.ADD_TO_CART_TOAST_SUMMARY,
      detail: `${product.title} ${AppConstants.ADD_TO_CART_TOAST_DETAIL_SUFFIX}`,
      life: 2500,
    });
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-6">
      <Toast ref={toastRef} />
      <Button
        label={AppConstants.BACK_LABEL}
        icon="pi pi-arrow-left"
        onClick={() => navigate(-1)}
        className="mb-4 h-9 text-sm color-[#1e3a5f] border-[#1e3a5f]"
        outlined
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/5 bg-gray-50 flex items-center justify-center p-8 min-h-72">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="max-h-64 w-full object-contain"
            />
          </div>

          <div className="md:w-3/5 p-6 space-y-4">
            <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>

            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              <StarRating rating={product.rating} />
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
              {product.brand && (
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-800">{`${AppConstants.BRAND_HEADER}: `}</span>{product.brand}
                </p>
              )}
              <p className="text-gray-600 capitalize">
                <span className="font-semibold text-gray-800">{`${AppConstants.CATEGORY_HEADER}: `}</span>{String(product.category).replace(/-/g, ' ')}
              </p>
              {product.stock && (
                <p className={product.stock > 0 ? 'text-green-600' : 'text-red-500'}>
                  <i
                    className={`pi ${product.stock > 0 ? 'pi-check-circle' : 'pi-times-circle'} mr-1`}
                  />
                  {product.stock > 0 ? `${product.stock} ${AppConstants.IN_STOCK_POSTFIX}` : AppConstants.OUT_OF_STOCK_POSTFIX}
                </p>
              )}
            </div>

            <div>
              <h2 className="font-semibold text-gray-800 mb-1">{AppConstants.DESCRIPTION_HEADER}</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {product.reviews?.length > 0 && (
              <div>
                <h2 className="font-semibold text-gray-800 mb-2">{AppConstants.REVIEWS_HEADER}</h2>
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {product.reviews.map((review, i) => (
                    <ProductReview key={i} review={review} />
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-2 items-center flex-wrap">
              <QuantityStepper
                value={quantity}
                onChange={setQuantity}
                min={1}
                max={product.stock || undefined}
              />
              <Button
                label={AppConstants.ADD_TO_CART_LABEL}
                icon="pi pi-shopping-cart"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-[#1e3a5f] border-0 text-white"
              />
              <Button
                icon="pi pi-heart"
                aria-label={AppConstants.ADD_TO_WISHLIST_LABEL}
                className='text-[#1e3a5f] border-[#1e3a5f]'
                outlined
              />
            </div>
          </div>
        </div>

        {(product.images?.length > 1) && (
          <div className="border-t border-gray-100 p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">{AppConstants.MORE_IMAGES_LABEL}</h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${product.title} view ${i + 1}`}
                  className="h-20 w-20 object-contain border border-gray-200 rounded-lg bg-gray-50 shrink-0 p-1 hover:border-[#1e3a5f] transition-colors cursor-pointer"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
})

export default ProductDetailPage
