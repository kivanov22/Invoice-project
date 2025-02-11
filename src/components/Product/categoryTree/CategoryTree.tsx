'use client'
import { useState, useEffect } from 'react'
import { Tree } from 'primereact/tree'
import { TreeNode } from 'primereact/treenode'
import { TreeDragDropEvent } from 'primereact/tree'
import { Button } from 'primereact/button'
import AddEditCategoryModal from '../categoryModal/addEditCategoryModal'

interface Category {
  id: string
  title: string
  parent?: string | null
  children?: Category[]
  productCount?: number
}

interface Props {
  categories: Category[]
  onCategoryUpdate: (updatedCategories: Category[]) => void
}

const CategoryTree: React.FC<Props> = ({ categories, onCategoryUpdate }) => {
  const [treeData, setTreeData] = useState<TreeNode[]>([])
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  useEffect(() => {
    if (!Array.isArray(categories) || categories.length === 0) {
      console.error('Categories array is empty or invalid:', categories)
      return
    }

    const categoryMap = new Map<string, Category>()
    categories.forEach((category) => categoryMap.set(category.id, category))

    const buildTree = (parentId: string | null): TreeNode[] => {
      return categories
        .filter((category) => category.parent === parentId)
        .map((category) => {
          return {
            key: category.id,
            label: `${category.title} (${category.productCount || 0})`,
            data: category,
            children: buildTree(category.id),
          }
        })
    }

    setTreeData(buildTree(null))
  }, [categories])

  const handleDragDrop = (event: TreeDragDropEvent) => {
    const updatedTreeNodes = event.value as TreeNode[]

    const updateParentRelations = (nodes: TreeNode[], parentId: string | null = null): Category[] =>
      nodes.map((node) => ({
        ...node.data,
        parent: parentId,
        children: node.children ? updateParentRelations(node.children, node.key as string) : [],
      }))

    const updatedCategories = updateParentRelations(updatedTreeNodes)
    setTreeData(updatedTreeNodes)
    onCategoryUpdate(updatedCategories)
  }

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category)
    setModalVisible(true)
  }

  return (
    <div>
      <Button label="Add Category" icon="pi pi-plus" onClick={() => setModalVisible(true)} />
      <Tree
        className="border border-white"
        value={treeData}
        dragdropScope="categories"
        onDragDrop={handleDragDrop}
        selectionMode="single"
        onSelect={(e) => handleEditCategory(e.node.data)}
      />
      {modalVisible && (
        <AddEditCategoryModal
          parentCategories={categories}
          visible={modalVisible}
          category={selectedCategory}
          onClose={() => setModalVisible(false)}
        />
      )}
    </div>
  )
}

export default CategoryTree
