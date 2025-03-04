import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Checkbox, MenuItem, Select, TextField } from '@mui/material'
import { ProductCategories } from '@/collections/ProductCategories'
import { useTranslation } from 'react-i18next'

const style = {
  display: 'flex',
  flexDirection: 'column',
  gap: 5,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: 700,
  width: 900,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

interface ProductAddEditModalProps {
  open: boolean
  onClose: () => void
  onSave: () => void
  product?: any | null
}

interface Category {
  id: string
  title: string
  parent?: Category
  productCount: number
  createdAt: string
  updatedAt: string
}

const ProductAddEditModal: React.FC<ProductAddEditModalProps> = ({
  open,
  onClose,
  onSave,
  product,
}) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [formData, setFormData] = useState({
    title: '',
    code: '',
    brand: '',
    price: 0,
    discount: 0,
    totalPrice: 0,
    active: false,
    category: '' as string | Category,
  })
  const { t } = useTranslation()

  useEffect(() => {
    if (open) {
      fetch('/api/categories')
        .then((res) => res.json())
        .then((data) => setCategories(data.docs))
        .catch((err) => console.error(err))
    }
  }, [open])

  useEffect(() => {
    if (product) {
      setFormData({
        code: product.code,
        title: product.title,
        brand: product.brand,
        price: product.price,
        discount: product.discount,
        totalPrice: product.totalPrice,
        active: product.active,
        category: product.category,
      })
    } else {
      setFormData({
        code: '',
        title: '',
        brand: '',
        price: 0,
        discount: 0,
        totalPrice: 0,
        active: false,
        category: '',
      })
    }
  }, [product])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    const newProduct = { ...product, [name]: value } //last change
    setFormData(newProduct)
  }

  const handleCategoryChange = (event: any) => {
    const selectedCategory = categories.find((cat) => cat.id === event.target.value)
    setFormData((prev) => ({ ...prev, category: selectedCategory || '' }))
  }

  const handleSubmit = async () => {
    const endPoint = product ? `/api/products/${product.id}` : '/api/products'
    const method = product ? 'PUT' : 'POST'

    const formattedProduct = {
      ...formData,
      price: Number(formData.price) || 0,
      discount: Number(formData.discount) || 0,
      totalPrice: Number(formData.totalPrice) || 0,
      category: typeof formData.category === 'object' ? formData.category.id : formData.category,
    }
    try {
      const response = await fetch(endPoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedProduct),
      })

      if (response.ok) {
        const newProduct = await response.json()
        console.log('Product created:', newProduct)
        onSave()
        setFormData({
          title: '',
          code: '',
          brand: '',
          price: 0,
          discount: 0,
          active: false,
          totalPrice: 0,
          category: '',
        })
      } else {
        console.error('Failed to create product', response)
      }
    } catch (error) {
      console.error('Error creating product:', error)
    }
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ color: 'black', mb: 5 }}
          >
            {product ? t('Update product') : t('Create product')}
          </Typography>

          <div className="flex flex-col gap-5 items-center">
            <div className="flex  gap-5">
              <TextField
                label={t('Code')}
                name="code"
                variant="outlined"
                fullWidth
                value={formData.code}
                onChange={handleInputChange}
                placeholder={`Enter Code...`}
              />
              <TextField
                label={t('Title')}
                name="title"
                variant="outlined"
                fullWidth
                value={formData.title}
                onChange={handleInputChange}
                placeholder={`Enter Title...`}
              />
              <TextField
                label={t('Brand')}
                name="brand"
                variant="outlined"
                fullWidth
                value={formData.brand}
                onChange={handleInputChange}
                placeholder={`Enter Brand...`}
              />
            </div>
            <div className="flex  gap-5">
              <TextField
                label={t('Price')}
                name="price"
                variant="outlined"
                fullWidth
                value={formData.price}
                onChange={handleInputChange}
                placeholder={`Enter Price...`}
              />
              <TextField
                label={t('Discount')}
                name="discount"
                variant="outlined"
                fullWidth
                value={formData.discount}
                onChange={handleInputChange}
                placeholder={`Enter Discount...`}
              />
              <TextField
                label={t('Total Price')}
                name="totalPrice"
                variant="outlined"
                fullWidth
                value={formData.totalPrice}
                onChange={handleInputChange}
                placeholder={`Enter Total Price...`}
              />
            </div>

            <div className="flex flex-col w-full">
              <Typography sx={{ color: 'black', mb: 1 }}>{t('Category')}</Typography>
              <Select
                value={
                  typeof formData.category === 'object' ? formData.category.id : formData.category
                }
                onChange={handleCategoryChange}
                fullWidth
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.title}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div className="flex flex-col">
              <Typography sx={{ color: 'black', ml: 1 }}>{t('Active')}</Typography>
              <Checkbox
                name="active"
                checked={formData.active}
                onChange={(e) => setFormData((prev) => ({ ...prev, active: e.target.checked }))}
              />
            </div>
            <div className="flex">
              <Button onClick={handleSubmit}>{product ? t('Update') : t('Create')}</Button>
              <Button onClick={onClose}>{t('Cancel')}</Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default ProductAddEditModal
