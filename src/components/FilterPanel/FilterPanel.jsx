import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import productStore from '../../stores/productStore';
import AppConstants from '../../utils/AppConstants';

const FilterPanel = observer(() => {
  const [localMin, setLocalMin] = useState(productStore.minPrice)
  const [localMax, setLocalMax] = useState(productStore.maxPrice)

  const handleApplyPrice = () => {
    productStore.setMinPrice(localMin);
    productStore.setMaxPrice(localMax);
    productStore.resetPage();
  }

  const handleClearPrice = () => {
    setLocalMin('');
    setLocalMax('');
    productStore.setMinPrice('');
    productStore.setMaxPrice('');
    productStore.resetPage();
  }

  return (
    <aside className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-5 sticky top-6 max-h-[calc(100vh-7rem)] overflow-y-auto">
      {/* show clear button for active filters */}
      {productStore.hasActiveFilters && (
        <button
          onClick={productStore.clearFilters}
          className="text-xs text-blue-600 hover:underline w-full text-right"
        >
          {AppConstants.CLEAR_LABEL}
        </button>
      )}

      {/* Categories */}
      <div>
        <h3 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
          {AppConstants.CATEGORIES_HEADER}
        </h3>
        <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
          {productStore.allCategories.length === 0 && (
            <p className="text-xs text-gray-400 italic"> {AppConstants.CATEGORIES_LOADING_TEXT} </p>
          )}
          {productStore.allCategories.map((cat) => {
            const slug = cat.slug || cat;
            const name = cat.name || cat;
            const checked = productStore.selectedCategories.includes(slug);

            return (
              <div key={slug} className="flex items-center gap-2">
                <Checkbox
                  inputId={`cat-${slug}`}
                  checked={checked}
                  onChange={() => productStore.toggleCategory(slug)}
                />
                <label
                  htmlFor={`cat-${slug}`}
                  className="text-sm text-gray-600 cursor-pointer capitalize leading-none"
                >
                  {String(name).replace(/-/g, ' ')}
                </label>
              </div>
            )
          })}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
          {AppConstants.PRICE_RANGE_HEADER}
        </h3>
        <div className="flex gap-2 mb-2">
          <InputText
            value={localMin}
            onChange={e => setLocalMin(e.target.value)}
            placeholder={AppConstants.MIN_PLACEHOLDER}
            className="w-1/2 text-sm h-8"
            keyfilter="num"
          />
          <InputText
            value={localMax}
            onChange={e => setLocalMax(e.target.value)}
            placeholder={AppConstants.MAX_PLACEHOLDER}
            className="w-1/2 text-sm h-8"
            keyfilter="num"
          />
        </div>
        <Button
          label={AppConstants.APPLY_BUTTON_LABEL}
          onClick={handleApplyPrice}
          className="w-full h-8 text-sm text-white border-0 bg-[#1e3a5f]"
        />
        {(productStore.minPrice || productStore.maxPrice) && (
          <button
            onClick={handleClearPrice}
            className="text-xs text-gray-400 hover:text-red-400 mt-1 w-full text-center transition"
          >
            {AppConstants.CLEAR_PRICE_LABEL}
          </button>
        )}
      </div>

      {/* Brands */}
      <div>
        <h3 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
          {AppConstants.BRANDS_HEADER}
        </h3>
        <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
          {productStore.availableBrands.length === 0 && (
            <p className="text-xs text-gray-400 italic">{AppConstants.NO_BRANDS_TEXT}</p>
          )}
          {productStore.availableBrands.map((brand) => (
            <div key={brand} className="flex items-center gap-2">
              <Checkbox
                inputId={`brand-${brand}`}
                checked={productStore.selectedBrands.includes(brand)}
                onChange={() => productStore.toggleBrand(brand)}
              />
              <label
                htmlFor={`brand-${brand}`}
                className="text-sm text-gray-600 cursor-pointer leading-none"
              >
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
})

export default FilterPanel
