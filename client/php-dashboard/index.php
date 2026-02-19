<?php
include 'db-connection.php';

// Get statistics
$totalQuery = "SELECT COUNT(*) as count FROM tasks";
$pendingQuery = "SELECT COUNT(*) as count FROM tasks WHERE status = 'pending'";
$inProgressQuery = "SELECT COUNT(*) as count FROM tasks WHERE status = 'in progress'";
$completedQuery = "SELECT COUNT(*) as count FROM tasks WHERE status = 'completed'";

$totalResult = $conn->query($totalQuery);
$pendingResult = $conn->query($pendingQuery);
$inProgressResult = $conn->query($inProgressQuery);
$completedResult = $conn->query($completedQuery);

$totalCount = $totalResult->fetch_assoc()['count'];
$pendingCount = $pendingResult->fetch_assoc()['count'];
$inProgressCount = $inProgressResult->fetch_assoc()['count'];
$completedCount = $completedResult->fetch_assoc()['count'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TaskFlow Dashboard - Home</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
    <style>
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
        }
        .hero-card {
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            padding: 40px;
            margin-bottom: 30px;
        }
        .stat-box {
            text-align: center;
            padding: 20px;
            border-radius: 10px;
            margin: 10px 0;
            color: white;
            font-weight: bold;
        }
        .stat-total { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .stat-pending { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
        .stat-progress { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
        .stat-completed { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }
        .nav-btn {
            display: inline-block;
            margin: 10px;
            padding: 15px 30px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            transition: transform 0.3s;
        }
        .nav-btn:hover {
            transform: translateY(-5px);
        }
        .btn-dashboard { background: #667eea; color: white; }
        .btn-create { background: #43e97b; color: white; }
        .btn-info { background: #f5576c; color: white; }
        h1 { color: #333; margin-bottom: 10px; }
        .subtitle { color: #666; font-size: 1.1rem; }
    </style>
</head>
<body>
    <div class="container">
        <div class="hero-card">
            <div class="text-center mb-5">
                <h1><i class="bi bi-graph-up-arrow"></i> TaskFlow Dashboard</h1>
                <p class="subtitle">Professional Task Management System</p>
                <hr>
            </div>

            <!-- Statistics -->
            <div class="row mb-5">
                <div class="col-md-6 col-lg-3">
                    <div class="stat-box stat-total">
                        <i class="bi bi-list-task" style="font-size: 2rem;"></i>
                        <div style="font-size: 2rem; margin: 10px 0;"><?php echo $totalCount; ?></div>
                        <small>Total Tasks</small>
                    </div>
                </div>
                <div class="col-md-6 col-lg-3">
                    <div class="stat-box stat-pending">
                        <i class="bi bi-hourglass-split" style="font-size: 2rem;"></i>
                        <div style="font-size: 2rem; margin: 10px 0;"><?php echo $pendingCount; ?></div>
                        <small>Pending</small>
                    </div>
                </div>
                <div class="col-md-6 col-lg-3">
                    <div class="stat-box stat-progress">
                        <i class="bi bi-arrow-repeat" style="font-size: 2rem;"></i>
                        <div style="font-size: 2rem; margin: 10px 0;"><?php echo $inProgressCount; ?></div>
                        <small>In Progress</small>
                    </div>
                </div>
                <div class="col-md-6 col-lg-3">
                    <div class="stat-box stat-completed">
                        <i class="bi bi-check-circle" style="font-size: 2rem;"></i>
                        <div style="font-size: 2rem; margin: 10px 0;"><?php echo $completedCount; ?></div>
                        <small>Completed</small>
                    </div>
                </div>
            </div>

            <!-- Navigation Buttons -->
            <div class="text-center">
                <h4 style="color: #333; margin-bottom: 25px;">Quick Navigation</h4>
                
                <a href="dashboard.php" class="nav-btn btn-dashboard">
                    <i class="bi bi-graph-up"></i> View Dashboard
                </a>
                
                <a href="create.php" class="nav-btn btn-create">
                    <i class="bi bi-plus-square"></i> Create Task
                </a>
                
                <a href="README.md" class="nav-btn btn-info">
                    <i class="bi bi-info-circle"></i> Documentation
                </a>
            </div>

            <!-- Features -->
            <div class="mt-5 pt-4 border-top">
                <h5 style="color: #333;">✨ Features</h5>
                <ul style="color: #666;">
                    <li><strong>Dashboard</strong> - View all tasks with real-time statistics</li>
                    <li><strong>Create Tasks</strong> - Add new tasks with categories and due dates</li>
                    <li><strong>Edit Tasks</strong> - Update task details and status</li>
                    <li><strong>Delete Tasks</strong> - Remove completed or unnecessary tasks</li>
                    <li><strong>Status Tracking</strong> - Track tasks as Pending, In Progress, or Completed</li>
                    <li><strong>Responsive Design</strong> - Works on desktop, tablet, and mobile devices</li>
                    <li><strong>Bootstrap 5 UI</strong> - Modern and professional looking interface</li>
                </ul>
            </div>

            <!-- Info Box -->
            <div class="alert alert-info mt-4" role="alert">
                <strong><i class="bi bi-info-circle-fill"></i> Getting Started:</strong>
                <br>This is a PHP/MySQL/Bootstrap 5 implementation of TaskFlow.
                <br>👉 <a href="dashboard.php" style="color: #0066cc;"><strong>Start with the Dashboard</strong></a>
            </div>
        </div>

        <!-- Footer -->
        <div style="text-align: center; color: white; margin-top: 20px; margin-bottom: 20px;">
            <p><small>TaskFlow &copy; 2026 | Built with PHP, MySQL & Bootstrap 5</small></p>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>

<?php
$conn->close();
?>
