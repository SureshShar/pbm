## smart approch build on client nut push it to vps

## One by one TODO plan to upgrade application
- **1**: Add image upload functionaly base on user id for this look at addUp\development\app\pages\uploadAsset.vue
- **2**: Add more new conntent type. Created but not made working till now.  
- **3**: Add Delete icon button to delete new section item in super admin.
- **4**: Create a new orderfunctionality for admin to get order using store using 2 minute api hit or user self refresh

**User query endPoints**
- **1**: Send one query to database. Add Form on home page for page request 
- **2**: 
- **3**:  

# Super Admin - Vegetable Vendor
Master page has all the access
Superadmin pageid store all onbording request has and all the important thing stored here.
Id 1 is shree ganesh ji maharaj.
ID 4 is real me.

## Overview
The Super Admin page provides a comprehensive interface for managing cart items for a vegetable vendor. It includes category filtering, cart management, and item editing capabilities.

## Features

### Admin page
- **Login** or **Onboarding** with the random userPageId

### 🥬 Cart Item Management
- **Display Items**: Shows all cart items from `public/json/shop.json`
- **Category Filtering**: Filter items by category (pizza, curry, chapati, etc.)
- **Item Type Filtering**: Filter by vegetarian/non-vegetarian items
- **Search & Sort**: Easy navigation through items

### 🛒 Shopping Cart
- **Add to Cart**: Click "Add to Cart" on any item
- **Cart Summary**: Fixed bottom bar showing cart total and item count
- **Checkout**: Simple checkout process with total calculation
- **Clear Cart**: Remove all items from cart

### ✏️ Editing Capabilities
- **Toggle Editor**: Show/hide editing interface
- **Item Editing**: Edit item details using the universal editor
- **Delete Items**: Remove items from the catalog
- **Real-time Updates**: Changes reflect immediately


## Important sql query to work in a single cell like direct pushing into it
`
UPDATE your_table 
SET json_column_name = JSON_INSERT(
    json_column_name,
    '$.manoj', 'drupal developer',
    '$.is_allowed', FALSE,
    '$.last_updated', NOW()
) WHERE id = ?;
`

**Note:** 
-1 Formatted json of 31.4 kb become 1.8 mb,
-2 23 kb become 122 kb by Schema version-3
-3 23 kb become 100kb by old schema by version 2.5
-4 12 kb old format become 8 Kb
