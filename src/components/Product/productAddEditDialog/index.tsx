import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Checkbox, MenuItem, Select, TextField } from '@mui/material'
import { ProductCategories } from '@/collections/ProductCategories'

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

interface ProductAddEditModalProps {}

interface Category {
  id: string
  title: string
  parent?: Category
  productCount: number
  createdAt: string
  updatedAt: string
}

const ProductAddEditModal: React.FC<ProductAddEditModalProps> = () => {
  const [open, setOpen] = React.useState(false)
  const [categories, setCategories] = React.useState<Category[]>([])
  const [product, setProduct] = React.useState({
    title: '',
    code: '',
    brand: '',
    price: 0,
    discount: 0,
    totalPrice: 0,
    active: false,
    category: '' as string | Category,
  })
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  React.useEffect(() => {
    if (open) {
      fetch('/api/categories')
        .then((res) => res.json())
        .then((data) => setCategories(data.docs))
        .catch((err) => console.error(err))
    }
  }, [open])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // const newValue = ['price', 'discount', 'totalPrice'np].includes(name)
    //   ? parseFloat(value) || 0
    //   : value

    const newProduct = { ...product, [name]: value } //last change
    setProduct(newProduct)

    // setProduct((prev) => ({ ...prev, [name]: newValue }))
  }

  const handleCategoryChange = (event: any) => {
    const selectedCategory = categories.find((cat) => cat.id === event.target.value)
    setProduct((prev) => ({ ...prev, category: selectedCategory || '' }))
    // setProduct((prev) => ({ ...prev, category: event.target.value }))
  }

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const formattedProduct = {
      ...product,
      price: Number(product.price) || 0,
      discount: Number(product.discount) || 0,
      totalPrice: Number(product.totalPrice) || 0,
      category: typeof product.category === 'object' ? product.category.id : product.category,
    }
    try {
      const response = await fetch('/api/products/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedProduct), //product
      })

      if (response.ok) {
        const newProduct = await response.json()
        console.log('Product created:', newProduct)
        handleClose()
        setProduct({
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
      <Button onClick={handleOpen}>Create Product</Button>
      <Modal
        open={open}
        onClose={handleClose}
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
            Create a product
          </Typography>

          <div className="flex flex-col gap-5 items-center">
            <div className="flex  gap-5">
              <TextField
                label="Code"
                name="code"
                variant="outlined"
                fullWidth
                value={product.code}
                onChange={handleInputChange}
                placeholder={`Enter Code...`}
              />
              <TextField
                label="Title"
                name="title"
                variant="outlined"
                fullWidth
                value={product.title}
                onChange={handleInputChange}
                placeholder={`Enter Title...`}
              />
              <TextField
                label="Brand"
                name="brand"
                variant="outlined"
                fullWidth
                value={product.brand}
                onChange={handleInputChange}
                placeholder={`Enter Brand...`}
              />
            </div>
            <div className="flex  gap-5">
              <TextField
                label="Price"
                name="price"
                variant="outlined"
                fullWidth
                value={product.price}
                onChange={handleInputChange}
                placeholder={`Enter Price...`}
              />
              <TextField
                label="Discount"
                name="discount"
                variant="outlined"
                fullWidth
                value={product.discount}
                onChange={handleInputChange}
                placeholder={`Enter Discount...`}
              />
              <TextField
                label="Total Price"
                name="totalPrice"
                variant="outlined"
                fullWidth
                value={product.totalPrice}
                onChange={handleInputChange}
                placeholder={`Enter Total Price...`}
              />
            </div>

            <div className="flex flex-col w-full">
              <Typography sx={{ color: 'black', mb: 1 }}>Category</Typography>
              <Select
                value={
                  typeof product.category === 'object' ? product.category.id : product.category
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
              <Typography sx={{ color: 'black', ml: 1 }}>Active</Typography>
              <Checkbox
                name="active"
                checked={product.active}
                onChange={(e) => setProduct((prev) => ({ ...prev, active: e.target.checked }))}
              />
            </div>
            <div className="flex">
              <Button onClick={handleSave}>Save</Button>
              <Button onClick={handleClose}>Cancel</Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default ProductAddEditModal
