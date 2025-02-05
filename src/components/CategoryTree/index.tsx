import * as React from 'react'
import Box from '@mui/material/Box'
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView'
import { TreeItem } from '@mui/x-tree-view/TreeItem'

interface Category {
  id: string
  title: string
  parent: { id: string } | null
  children: Category[]
  productCount?: number
}

interface BasicSimpleTreeViewProps {
  categories: { docs: Category[] }
}

const BasicSimpleTreeView: React.FC<BasicSimpleTreeViewProps> = ({ categories }) => {
  console.log('Check what comes from parent', categories.docs)

  // Convert flat list into hierarchical structure
  const buildTree = (categoriesList: Category[]) => {
    const categoryMap = new Map<string, Category>()

    // Initialize category map
    categoriesList.forEach((category) => {
      categoryMap.set(category.id, { ...category, children: [] })
    })

    // Build tree structure
    const rootCategories: Category[] = []
    categoriesList.forEach((category) => {
      if (category.parent?.id) {
        const parent = categoryMap.get(category.parent.id)
        if (parent) {
          parent.children?.push(categoryMap.get(category.id)!)
        }
      } else {
        rootCategories.push(categoryMap.get(category.id)!)
      }
    })

    return rootCategories
  }

  const renderTreeItems = (categories: Category[]) =>
    categories.map((category) => (
      <TreeItem
        key={category.id}
        itemId={category.id}
        label={`${category.title} (${category.productCount || 0})`}
      >
        {category.children && category.children.length > 0 && renderTreeItems(category.children)}
      </TreeItem>
    ))

  const treeData = buildTree(categories.docs)

  return (
    <Box sx={{ minHeight: 352, minWidth: 200, color: 'white' }}>
      <SimpleTreeView>{renderTreeItems(treeData)}</SimpleTreeView>
    </Box>
  )
}

export default BasicSimpleTreeView
