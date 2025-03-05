import React, { useState, useEffect } from 'react'
import { Tree, TreeDragDropEvent } from 'primereact/tree'
import { TreeNode } from 'primereact/treenode'
// import { NodeService } from './service/NodeService';

interface Category {
  id: string
  title: string
  parent: { id: string } | null
  children: Category[]
  productCount?: number
}

interface DragDropDemoProps {
  categories: { docs: Category[] }
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
    data: { productCount: category.productCount },
    children: category.children ? convertToTreeNodes(category.children) : [],
  }))
}

const DragDropDemo: React.FC<DragDropDemoProps> = ({ categories }) => {
  const [nodes, setNodes] = useState<TreeNode[]>([])

  console.log(categories)

  useEffect(() => {
    const categoryTree = buildCategoryTree(categories.docs)

    setNodes(convertToTreeNodes(categoryTree))
  }, [categories])

  return (
    <div className="card flex justify-content-center">
      <Tree
        value={nodes}
        dragdropScope="demo"
        onDragDrop={(e: TreeDragDropEvent) => setNodes(e.value)}
        className="w-full md:w-30rem"
      />
    </div>
  )
}

export default DragDropDemo
