'use client'
import BanksFilter from '@/components/Bank/bankFilter'
import { AddBankButton } from '@/components/Bank/createButton'
import { PageRange } from '@/components/PageRange'
import BasicTable from '@/components/Table'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { Button, CircularProgress } from '@mui/material'
import { Pagination } from '@payloadcms/ui'
import React, { useCallback, useEffect, useState } from 'react'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import ClearIcon from '@mui/icons-material/Clear'
import CustomTable from '@/components/CustomTable'
import BasicSimpleTreeView from '@/components/CategoryTree'
import { CustomButton } from '@/components/common/Button'
import CustomFilter from '@/components/Product/productFilter'
import { Products } from '@/collections/Products'
import ProductFilter from '@/components/Product/productFilter'
import CircularWithValueLabel from '@/components/common/Loader'
import ProductAddEditModal from '@/components/Product/productAddEditDialog'
import CategoryTree from '@/components/Product/categoryTree/CategoryTree'

const PageClient: React.FC = () => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  const [filters, setFilters] = useState({ code: '', title: '', brand: '' })
  const [products, setProducts] = useState({ docs: [], page: 1, totalPages: 1, totalDocs: 0 })
  const [loading, setLoading] = useState(true)
  const [productCategories, setProductCategories] = useState<any>({ docs: [] })
  const [openModal, setOpenModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null)

  const fetchCategories = useCallback(async () => {
    try {
      //   const productCategories = await getProductCategories()
      const response = await fetch('/api/categories')
      const data = await response.json()
      console.log('Check categories', data)
      setProductCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const fetchProducts = useCallback(
    async (filters?: { code?: string; title?: string; brand?: string; categoryId?: string }) => {
      setLoading(true)

      const queryParams = new URLSearchParams()

      if (filters?.code) queryParams.append('where[code][contains]', filters.code)
      if (filters?.title) queryParams.append('where[title][contains]', filters.title)
      if (filters?.brand) queryParams.append('where[brand][contains]', filters.brand)
      if (filters?.categoryId) queryParams.append('where[category][equals]', filters.categoryId)

      const endPoint = queryParams.toString()
        ? `/api/products?${queryParams.toString()}`
        : '/api/products'

      try {
        const response = await fetch(endPoint) //'/api/products'
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error('Failed to fetch banks:', error)
        setProducts({ docs: [], page: 1, totalPages: 1, totalDocs: 0 })
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleClear = () => {
    fetchProducts()
  }

  const handleSearch = () => {
    fetchProducts(filters)
  }

  const handleCategorySelect = (categoryId: string) => {
    fetchProducts({ ...filters, categoryId })
  }

  const handleOpenModal = (product?: any) => {
    setSelectedProduct(product || null)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setSelectedProduct(null)
  }

  const handleSaveProduct = async () => {
    await fetchProducts()
    handleCloseModal()
  }

  const handleCategoryUpdate = (updatedCategories: any) => {
    console.log('Updated categories:', updatedCategories)
    setProductCategories(updatedCategories)
  }

  if (loading) {
    return (
      <div className="flex justify-center w-30">
        <CircularWithValueLabel />
      </div>
    )
  }

  return (
    <>
      <div className="container mb-16 flex  justify-between items-center">
        <div className="prose dark:prose-invert max-w-none ">
          <h1 className="text-black dark:text-white">Products</h1>
        </div>
        <div className="">
          <Button variant="contained" onClick={() => handleOpenModal()}>
            Add Product
          </Button>
        </div>
      </div>

      <ProductAddEditModal
        open={openModal}
        onClose={handleCloseModal}
        onSave={handleSaveProduct}
        product={selectedProduct}
      />

      <div className="flex space-x-5 items-center border border-black dark:border-white p-5 mb-5">
        <div className="flex flex-col flex-1">
          <ProductFilter onFilterChange={setFilters} />
          <div className="flex items-center ml-4">
            <p className="text-4xl">Results:{products.docs.length}</p>
          </div>
        </div>
        <div className="flex justify-end space-x-5 p-10 flex-1">
          <Button variant="contained" onClick={handleSearch}>
            <FilterAltIcon />
            Filter
          </Button>
          <Button variant="outlined" onClick={handleClear}>
            <ClearIcon />
            Clear
          </Button>
        </div>
      </div>

      <div className="flex space-x-5">
        <div className="p-5 w-1/5 border border-black dark:border-white">
          <BasicSimpleTreeView
            categories={productCategories}
            onCategorySelect={handleCategorySelect}
          />
          {/* <CategoryTree
            categories={productCategories.docs}
            onCategoryUpdate={handleCategoryUpdate}
          /> */}
        </div>
        <div className=" w-5/6">
          {loading ? (
            <CircularProgress />
          ) : (
            <div className="ml-4 mr-4">
              <CustomTable
                collection={products}
                onEdit={handleOpenModal}
                onDelete={fetchProducts}
              />
            </div>
          )}
        </div>
      </div>

      <div className="container mb-8 mt-5 text-2xl">
        <PageRange
          collection="products"
          currentPage={products.page}
          limit={12}
          totalDocs={products.totalDocs}
        />
      </div>

      <div className="container">
        {products.totalPages > 1 && products.page && (
          <Pagination page={products.page} totalPages={products.totalPages} />
        )}
      </div>
    </>
  )
}

export default PageClient
