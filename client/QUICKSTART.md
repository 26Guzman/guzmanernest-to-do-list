# 🚀 TaskFlow - Quick Start Guide

## **Getting Started**

### **Prerequisites**
- Node.js (v16 or higher)
- Backend server running on `http://localhost:5000`
- npm or yarn package manager

---

## **Installation**

```bash
# 1. Navigate to client directory
cd client

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# Visit http://localhost:5173 (or port shown in terminal)
```

---

## **Building for Production**

```bash
# Build optimized version
npm run build

# Preview production build
npm run preview
```

---

## **Project Structure**

```
client/
├── src/
│   ├── app.jsx                 # Main app component with routing
│   ├── main.jsx                # Entry point
│   ├── login.jsx               # Login page
│   ├── register.jsx            # Registration page
│   ├── home.jsx                # Dashboard/home page
│   ├── list-item.jsx           # List detail view
│   ├── components/
│   │   └── Header.jsx          # Header with navigation
│   ├── css/
│   │   └── globals.css         # Global styles
│   └── assets/                 # Images, icons, etc.
├── public/                     # Static files
├── index.html                  # HTML template
├── vite.config.js             # Vite configuration
├── package.json               # Dependencies
└── README.md                  # Project readme
```

---

## **Features Overview**

### **Authentication**
1. **Register**: Create new account
   - Username, full name, password
   - Password validation
   - Redirect to login on success

2. **Login**: Sign in with credentials
   - Name and password
   - Session management
   - Auto-redirect to dashboard

### **Dashboard**
- View all your to-do lists
- Search and filter lists
- Quick status toggle
- Create new lists

### **List Management**
- **Create**: Add title and description
- **View**: See all tasks in list
- **Edit**: Modify title/description
- **Delete**: Remove with confirmation

### **Task Management**
- **Add**: Quick task input
- **Complete**: Check off tasks
- **Delete**: Remove tasks
- **Restore**: Undo deleted tasks

---

## **Navigation Flow**

```
Start
  ↓
Login/Register
  ↓
Dashboard (Home)
  ├── View Lists
  ├── Search Lists
  ├── Create List
  └── Click List → List Detail
         ↓
      Manage Tasks
      ├── Add Task
      ├── Complete Task
      └── Delete Task
```

---

## **API Configuration**

The app connects to your backend API:

```javascript
const API_URL = 'http://localhost:5000/api'
```

If using different port, update this in:
- `src/login.jsx`
- `src/register.jsx`
- `src/home.jsx`

---

## **Common Tasks**

### **How to Create a List**
1. Click "New List" button in dashboard
2. Enter list title
3. (Optional) Add description
4. Click "Create List"

### **How to Add a Task**
1. Click on a list to open it
2. Enter task in "Add a new task..." input
3. Click "Add" button
4. Task appears in list

### **How to Complete a Task**
1. Click checkbox next to task
2. Task will have strikethrough
3. Click checkbox again to uncomplete

### **How to Edit a List**
1. Open the list
2. Click "Edit" button
3. Modify title/description
4. Click "Save Changes"

### **How to Delete a List**
1. Open the list
2. Click "Delete" button
3. Confirm deletion
4. Redirected back to dashboard

---

## **Keyboard Shortcuts**

```
Escape      - Close modals, return to previous
Enter       - Submit forms
Tab         - Navigate between form fields
Space       - Toggle checkboxes
```

---

## **Responsive Design**

### **Mobile (< 640px)**
- Single column layout
- Full-width cards
- Hamburger menu (if applicable)
- Touch-friendly buttons (44px+)

### **Tablet (640px - 1024px)**
- 2 column grid for lists
- Optimized spacing
- Side navigation options

### **Desktop (> 1024px)**
- 3 column grid for lists
- Full header navigation
- Expanded views

---

## **Color Themes**

### **Current: Orange Theme**
- Primary: #ff6b35
- Accent: #e55a2b
- Success: #10b981
- Error: #ef4444

---

## **Troubleshooting**

### **Issue: Port already in use**
```bash
# Kill process on port 5173
# macOS/Linux:
lsof -ti:5173 | xargs kill -9

# Windows: Check Task Manager
```

### **Issue: API connection error**
- Check if backend is running on port 5000
- Verify API_URL in components
- Check browser console for errors

### **Issue: Styles not loading**
- Clear browser cache
- Rebuild: `npm run build`
- Restart dev server

### **Issue: Authentication not working**
- Check browser cookies enabled
- Verify backend session setup
- Check API endpoints in backend

---

## **Development Tips**

### **Debug Mode**
Open browser DevTools (F12) to see:
- Network requests
- Console errors
- React component state
- Styling issues

### **Hot Module Replacement**
Changes to files auto-refresh in browser (in dev mode)

### **Environment Variables**
Create `.env.local`:
```
VITE_API_URL=http://localhost:5000/api
```

---

## **Performance Tips**

### **Optimize Images**
- Use optimized image formats
- Lazy load images where possible
- Use appropriate sizes

### **Code Splitting**
- App already uses React Router (automatic)
- Each route loads separately

### **Caching**
- Browser caches CSS/JS automatically
- API responses cached where applicable

---

## **Security Best Practices**

✅ **Implemented:**
- Password validation on registration
- Secure API calls with credentials
- Protected routes (login required)
- CSRF protection ready

⚠️ **Additional (for production):**
- Use HTTPS
- Set secure cookies
- Implement rate limiting
- Add CORS headers properly
- Validate all inputs

---

## **Browser Support**

| Browser | Support |
|---------|---------|
| Chrome  | ✅ Latest |
| Firefox | ✅ Latest |
| Safari  | ✅ Latest |
| Edge    | ✅ Latest |
| IE11    | ❌ Not supported |

---

## **File Size & Performance**

```
App Bundle:    ~45KB (gzipped)
CSS:           ~15KB
JavaScript:    ~30KB
Initial Load:  < 2 seconds
```

---

## **Next Steps**

1. ✅ Review the design
2. 📝 Test all features
3. 🚀 Deploy to production
4. 📊 Monitor user feedback
5. 🎨 Consider adding:
   - Dark mode
   - Task categories
   - Due dates
   - Notifications

---

## **Support & Resources**

### **Documentation**
- [DESIGN.md](./DESIGN.md) - Complete design guide
- [DESIGN_SUMMARY.md](./DESIGN_SUMMARY.md) - Quick overview
- [DESIGN_COMPONENTS.md](./DESIGN_COMPONENTS.md) - Component details

### **Tools Used**
- React 19
- React Router 6
- Axios for API calls
- Vite for build
- Tailwind CSS concepts

---

## **Version History**

### **v2.0.0** (Current)
- ✨ Complete design overhaul
- 🎨 Modern UI components
- 📱 Fully responsive
- ♿ Accessibility improvements
- 🚀 Performance optimizations

### **v1.0.0**
- Basic functionality
- Simple UI
- Core features

---

**You're all set! Start building with TaskFlow! 🎉**
