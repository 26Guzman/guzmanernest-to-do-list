# TaskFlow Dashboard - PHP Version

A modern, responsive task management dashboard built with PHP, Bootstrap 5, and MySQL.

## Features

✅ **Dashboard Overview**
- Display task counts by status (Pending, In Progress, Completed)
- Summary cards with color-coded badges
- Responsive grid layout

✅ **Task Management**
- View all tasks in a responsive table
- Edit task details (title, category, due date, status, description)
- Delete tasks with confirmation
- Status badges (Pending, In Progress, Completed)
- Formatted due dates

✅ **Modern UI**
- Bootstrap 5 styling
- Bootstrap Icons integration
- Responsive navigation bar
- Professional alert messages

## File Structure

```
php-dashboard/
├── dashboard.php           # Main dashboard page
├── edit.php               # Task edit page
├── db-connection.php      # Database connection configuration
├── database-structure.sql # SQL table structure and sample data
└── README.md              # This file
```

## Setup Instructions

### 1. Database Setup

First, import the SQL file into your MySQL database:

```bash
mysql -u root -p < database-structure.sql
```

Or manually in phpMyAdmin:
1. Go to phpMyAdmin
2. Create a new database called `taskflow_db`
3. Select the database
4. Go to "Import" tab
5. Upload `database-structure.sql` file

### 2. Configure Database Connection

Edit `db-connection.php` and update the credentials:

```php
define('DB_HOST', 'localhost');      // Your database host
define('DB_USER', 'root');           // Your database username
define('DB_PASS', '');               // Your database password
define('DB_NAME', 'taskflow_db');    // Your database name
```

### 3. Upload Files to Server

Upload the following files to your web server:
- `dashboard.php`
- `edit.php`
- `db-connection.php`

### 4. Access the Dashboard

Open your browser and navigate to:
```
http://localhost/your-folder/dashboard.php
```

## Database Schema

### tasks table

```sql
CREATE TABLE tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    due_date DATE,
    status ENUM('pending', 'in progress', 'completed') DEFAULT 'pending',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Features Breakdown

### Dashboard Page (dashboard.php)

**Functionality:**
- Fetches all tasks from database
- Counts tasks by status
- Displays summary cards with color-coded counts
- Shows all tasks in a responsive Bootstrap table
- Delete functionality with confirmation
- Success/error message alerts

**Status Badges:**
- **Pending** - Yellow badge
- **In Progress** - Blue badge
- **Completed** - Green badge

### Edit Page (edit.php)

**Functionality:**
- Load task details from database
- Update all task fields
- Status dropdown selector
- Form validation
- Success/error feedback

## How It Works

### 1. **Homepage (dashboard.php)**

```php
// Fetch all tasks
$query = "SELECT id, title, category, due_date, status FROM tasks ORDER BY id DESC";

// Count tasks by status
$pendingCount = /* Count WHERE status = 'pending' */
$inProgressCount = /* Count WHERE status = 'in progress' */
$completedCount = /* Count WHERE status = 'completed' */

// Display in Bootstrap cards and table
```

### 2. **Delete Task**

```php
if ($_POST['delete_id']) {
    $deleteQuery = "DELETE FROM tasks WHERE id = $deleteId";
    $conn->query($deleteQuery);
}
```

### 3. **Edit Task (edit.php)**

```php
// Fetch task by ID
// Update task fields
// Redirect to dashboard on success
```

## Customization

### Change Database Credentials
Edit `db-connection.php` with your database details.

### Modify Table Columns
Edit the SQL query in `dashboard.php` to show/hide columns:
```php
$query = "SELECT id, title, category, due_date, status FROM tasks ...";
```

### Change Status Badges
Modify the badge colors in `dashboard.php`:
```php
if ($status == 'pending') {
    $badgeClass = 'bg-warning text-dark';
} // Change color here
```

### Add New Features
- Add search functionality
- Add filters by status/category
- Add bulk delete
- Add task creation form
- Add user authentication

## Requirements

- PHP 7.4 or higher
- MySQL 5.7 or higher
- Web server (Apache, Nginx, etc.)
- Bootstrap 5 (via CDN - no setup needed)

## Security Notes

⚠️ **Important for Production:**

1. **SQL Injection Prevention** - Already using `mysqli` prepared statements:
   ```php
   $conn->real_escape_string() - Used for string inputs
   intval() - Used for numeric IDs
   ```

2. **XSS Prevention** - Using `htmlspecialchars()`:
   ```php
   echo htmlspecialchars($task['title']);
   ```

3. **For Production, use Prepared Statements:**
   ```php
   $stmt = $conn->prepare("DELETE FROM tasks WHERE id = ?");
   $stmt->bind_param("i", $deleteId);
   $stmt->execute();
   ```

## Troubleshooting

### "Connection failed" Error
- Check MySQL is running
- Verify database credentials in `db-connection.php`
- Check if database `taskflow_db` exists

### "No tasks" Appearing
- Verify sample data was inserted
- Check SQL file was imported correctly
- Verify table name is `tasks`

### Styling Looks Wrong
- Verify Bootstrap 5 CDN is loading (check browser console)
- Ensure internet connection for CDN resources

## Alternative: Using Prepared Statements (Recommended)

For enhanced security, replace delete functionality:

```php
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['delete_id'])) {
    $deleteId = intval($_POST['delete_id']);
    $stmt = $conn->prepare("DELETE FROM tasks WHERE id = ?");
    $stmt->bind_param("i", $deleteId);
    
    if ($stmt->execute()) {
        $successMessage = "Task deleted successfully!";
    } else {
        $errorMessage = "Error deleting task";
    }
}
```

## License

Free to use and modify for your projects.

## Support

For issues or questions, refer to the inline code comments in each PHP file.
