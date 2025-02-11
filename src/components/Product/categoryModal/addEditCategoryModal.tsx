'use client'
import { useState, useEffect } from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'

interface Category {
  id: string
  title: string
  parent?: string | null
}

interface Props {
  visible: boolean
  category?: Category | null
  onClose: () => void
  parentCategories: Category[]
}

const AddEditCategoryModal: React.FC<Props> = ({
  visible,
  category,
  onClose,
  parentCategories,
}) => {
  const [title, setTitle] = useState('')
  const [parent, setParent] = useState<string | null>(null)

  useEffect(() => {
    if (category) {
      setTitle(category.title)
      setParent(category.parent || null)
    } else {
      setTitle('')
      setParent(null)
    }
  }, [category])

  const handleSave = () => {
    // Implement API call for saving category here
    console.log('Saving category:', { title, parent })
    onClose()
  }

  return (
    <Dialog header={category ? 'Edit Category' : 'Add Category'} visible={visible} onHide={onClose}>
      <div className="p-fluid border border-white z-40">
        <div className="p-field">
          <label>Title</label>
          <InputText
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-black"
          />
        </div>
        <div className="p-field">
          <label>Parent Category</label>
          <Dropdown
            value={parent}
            options={parentCategories.map((cat) => ({ label: cat.title, value: cat.id }))} // Fetch parent category options from API
            onChange={(e) => setParent(e.value)}
            placeholder="Select Parent"
          />
        </div>
        <Button label="Save" icon="pi pi-check" onClick={handleSave} />
      </div>
    </Dialog>
  )
}

export default AddEditCategoryModal
