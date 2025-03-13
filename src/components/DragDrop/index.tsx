import React, { useState, useEffect } from 'react'
import { Tree, TreeDragDropEvent, TreeSelectionEvent } from 'primereact/tree'
import { TreeNode } from 'primereact/treenode'

interface Category {
  id: string
  title: string
  parent: { id: string } | null
  children: Category[]
  productCount?: number
}

interface DragDropDemoProps {
  categories: { docs: Category[] }
  onCategorySelect: (categoryId: string) => void
}

const buildCategoryTree = (categories: Category[]): Category[] => {
  const categoryMap: Record<string, Category> = {}

  categories.forEach((category) => {
    categoryMap[category.id] = { ...category, children: [] }
  })

  const rootCategories: Category[] = []

  categories.forEach((category) => {
    if (category.parent && category.parent.id) {
      const parentCategory = categoryMap[category.parent.id]
      if (parentCategory) {
        parentCategory.children.push(categoryMap[category.id])
      }
    } else {
      rootCategories.push(categoryMap[category.id])
    }
  })

  return rootCategories
}

const convertToTreeNodes = (categories: Category[]): TreeNode[] => {
  return categories.map((category) => ({
    key: category.id,
    label: category.title,
    data: { id: category.id, productCount: category.productCount },
    children: category.children ? convertToTreeNodes(category.children) : [],
  }))
}

const DragDropDemo: React.FC<DragDropDemoProps> = ({ categories, onCategorySelect }) => {
  const [nodes, setNodes] = useState<TreeNode[]>([])
  const [selectedKey, setSelectedKey] = useState<string | null>(null)

  useEffect(() => {
    const categoryTree = buildCategoryTree(categories.docs)

    setNodes(convertToTreeNodes(categoryTree))
  }, [categories])

  const handleSelection = (e: TreeSelectionEvent) => {
    const selectedCategoryId = e.value as string
    console.log(selectedCategoryId)

    setSelectedKey(selectedCategoryId)

    if (selectedCategoryId) {
      onCategorySelect(selectedCategoryId)
    }
  }

  return (
    <div className="card flex justify-content-center ">
      <Tree
        value={nodes}
        dragdropScope="demo"
        selectionMode="single"
        selectionKeys={selectedKey ? { [selectedKey]: true } : {}}
        onSelectionChange={handleSelection}
        onDragDrop={(e: TreeDragDropEvent) => setNodes(e.value)}
        className="w-full md:w-30rem"
      />
    </div>
  )
}

export default DragDropDemo
