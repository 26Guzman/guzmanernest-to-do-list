<?php
/**
 * TaskFlow Dashboard - Database Connection Configuration
 * 
 * This file handles all database connections for the application.
 * 
 * IMPORTANT: In production, move database credentials to environment variables
 * or a secure configuration file OUTSIDE the web root.
 * 
 * Example using environment variables (RECOMMENDED for production):
 * $host = getenv('DB_HOST');
 * $user = getenv('DB_USER');
 * $pass = getenv('DB_PASS');
 * $dbname = getenv('DB_NAME');
 */

// ============================================
// DEVELOPMENT CONFIGURATION (Local Testing)
// ============================================
if ($_SERVER['HTTP_HOST'] == 'localhost') {
    define('DB_HOST', 'localhost');
    define('DB_USER', 'root');
    define('DB_PASS', '');
    define('DB_NAME', 'taskflow_db');
}

// ============================================
// PRODUCTION CONFIGURATION (Live Server)
// ============================================
else {
    // Replace these with your actual production credentials
    define('DB_HOST', 'your_production_host');
    define('DB_USER', 'your_production_user');
    define('DB_PASS', 'your_production_password');
    define('DB_NAME', 'your_production_db');
}

// ============================================
// DATABASE CONNECTION
// ============================================

// Create connection with error suppression
$conn = @new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Check connection (improved error handling)
if ($conn->connect_error) {
    // Log error securely (don't show to users in production)
    error_log("Database Connection Error: " . $conn->connect_error);
    
    // User-friendly error message
    if ($_SERVER['HTTP_HOST'] == 'localhost') {
        die("Connection failed: " . $conn->connect_error . "<br>Please check db-connection.php");
    } else {
        die("Database connection error. Please contact administrator.");
    }
}

// Set connection charset to UTF-8
if (!$conn->set_charset("utf8mb4")) {
    error_log("Error loading character set utf8mb4: " . $conn->error);
    $conn->set_charset("utf8");
}

// Set timezone
date_default_timezone_set('UTC');

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Escape string for database query (safer than direct mysqli_escape)
 * 
 * @param string $string - The string to escape
 * @return string - Escaped string
 */
function escapeString($string) {
    global $conn;
    return $conn->real_escape_string($string);
}

/**
 * Validate and sanitize numeric input (ID)
 * 
 * @param mixed $id - The ID to validate
 * @return int - Sanitized integer ID
 */
function sanitizeId($id) {
    return intval($id);
}

/**
 * Validate and sanitize string input
 * 
 * @param string $string - The string to sanitize
 * @return string - Sanitized string
 */
function sanitizeString($string) {
    global $conn;
    $string = trim($string);
    $string = stripslashes($string);
    $string = htmlspecialchars($string);
    return $conn->real_escape_string($string);
}

/**
 * Check database connection status
 * 
 * @return bool - True if connected, False otherwise
 */
function isDatabaseConnected() {
    global $conn;
    return $conn && $conn->ping();
}

/**
 * Close database connection
 */
function closeConnection() {
    global $conn;
    if (isset($conn) && $conn) {
        $conn->close();
    }
}

/**
 * Handle database errors
 * 
 * @param string $message - Error message to log
 * @param bool $die - If true, terminates the script
 */
function handleDatabaseError($message, $die = false) {
    global $conn;
    $error = $message . " - " . $conn->error;
    error_log($error);
    
    if ($die) {
        if ($_SERVER['HTTP_HOST'] == 'localhost') {
            die($error);
        } else {
            die("Database error occurred.");
        }
    }
}

// ============================================
// PREPARED STATEMENT EXAMPLE (RECOMMENDED)
// ============================================

/**
 * Example of using prepared statements for better security
 * Use this instead of string concatenation for sensitive operations
 * 
 * Example:
 * $stmt = $conn->prepare("DELETE FROM tasks WHERE id = ?");
 * $stmt->bind_param("i", $task_id);
 * $stmt->execute();
 * $result = $stmt->get_result();
 */

// ============================================
// REGISTER SHUTDOWN FUNCTION
// ============================================

/**
 * Automatically close database connection when script ends
 */
register_shutdown_function('closeConnection');

?>
