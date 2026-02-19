<?php
include 'db-connection.php';

// Initialize variables
$pendingCount = 0;
$inProgressCount = 0;
$completedCount = 0;
$tasks = [];
$successMessage = '';
$errorMessage = '';

// Handle Delete operation
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['delete_id'])) {
    $deleteId = intval($_POST['delete_id']);
    $deleteQuery = "DELETE FROM tasks WHERE id = $deleteId";
    
    if ($conn->query($deleteQuery) === TRUE) {
        $successMessage = "Task deleted successfully!";
    } else {
        $errorMessage = "Error deleting task: " . $conn->error;
    }
}

// Fetch tasks from database
$query = "SELECT id, title, category, due_date, status FROM tasks ORDER BY id DESC";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $tasks[] = $row;
    }
}

// Count tasks by status
$pendingQuery = "SELECT COUNT(*) as count FROM tasks WHERE status = 'pending'";
$inProgressQuery = "SELECT COUNT(*) as count FROM tasks WHERE status = 'in progress'";
$completedQuery = "SELECT COUNT(*) as count FROM tasks WHERE status = 'completed'";

$pendingResult = $conn->query($pendingQuery);
$inProgressResult = $conn->query($inProgressQuery);
$completedResult = $conn->query($completedQuery);

if ($pendingResult->num_rows > 0) {
    $pendingCount = $pendingResult->fetch_assoc()['count'];
}
if ($inProgressResult->num_rows > 0) {
    $inProgressCount = $inProgressResult->fetch_assoc()['count'];
}
if ($completedResult->num_rows > 0) {
    $completedCount = $completedResult->fetch_assoc()['count'];
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
    <style>
        body {
            background-color: #030c15;
        }
        .navbar {
            background: blue;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .card {
            border: none;
            transition: transform 0.2s;
        }
        .card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .stat-card h3 {
            font-size: 2.5rem;
            margin: 10px 0;
        }
        .table-hover tbody tr:hover {
            background-color: #f5f5f5;
        }
        .badge {
            padding: 0.5rem 1rem;
            font-size: 0.85rem;
        }
        .btn-sm {
            padding: 0.4rem 0.8rem;
            font-size: 0.85rem;
        }
    </style>
</head>
<body>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid">
            <a class="navbar-brand fw-bold" href="#/">
                <i class="bi bi-graph-up"></i> Dashboard
            </a>
            <div class="d-flex align-items-center">
                <div class="dropdown">
                    <button class="btn btn-link dropdown-toggle text-dark text-decoration-none" type="button" data-bs-toggle="dropdown">
                        Welcome, Admin <i class="bi bi-chevron-down"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="#/">Profile</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item text-danger" href="#/">Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <div class="container-fluid py-4">
        <!-- Success/Error Messages -->
        <?php if (!empty($successMessage)): ?>
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <i class="bi bi-check-circle-fill me-2"></i>
            <?php echo $successMessage; ?>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
        <?php endif; ?>

        <?php if (!empty($errorMessage)): ?>
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <i class="bi bi-exclamation-circle-fill me-2"></i>
            <?php echo $errorMessage; ?>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
        <?php endif; ?>

        <!-- Stats Cards -->
        <div class="row mb-4">
            <div class="col-md-4">
                <div class="card shadow-sm border-0 text-center stat-card">
                    <div class="card-body">
                        <h6 class="text-muted">Pending</h6>
                        <h3 class="fw-bold text-warning"><?php echo $pendingCount; ?></h3>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card shadow-sm border-0 text-center stat-card">
                    <div class="card-body">
                        <h6 class="text-muted">In Progress</h6>
                        <h3 class="fw-bold text-primary"><?php echo $inProgressCount; ?></h3>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card shadow-sm border-0 text-center stat-card">
                    <div class="card-body">
                        <h6 class="text-muted">Completed</h6>
                        <h3 class="fw-bold text-success"><?php echo $completedCount; ?></h3>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tasks Table Card -->
        <div class="card shadow-sm border-0">
            <div class="card-header bg-white">
                <h5 class="mb-0"><i class="bi bi-list-task me-2"></i>Your Task Lists</h5>
            </div>
            <div class="card-body">
                <?php if (empty($tasks)): ?>
                <div class="text-center py-5">
                    <i class="bi bi-inbox" style="font-size: 3rem; color: #ccc;"></i>
                    <p class="text-muted mt-3">No tasks yet</p>
                </div>
                <?php else: ?>
                <div class="table-responsive">
                    <table class="table table-hover align-middle">
                        <thead class="table-light">
                            <tr>
                                <th>#</th>
                                <th>Task Name</th>
                                <th>Category</th>
                                <th>Due Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($tasks as $index => $task): ?>
                            <tr>
                                <td><?php echo $index + 1; ?></td>
                                <td><?php echo htmlspecialchars($task['title']); ?></td>
                                <td><?php echo htmlspecialchars($task['category'] ?? 'General'); ?></td>
                                <td><?php echo $task['due_date'] ? date('M d, Y', strtotime($task['due_date'])) : 'N/A'; ?></td>
                                <td>
                                    <?php
                                    $status = $task['status'];
                                    $badgeClass = '';
                                    
                                    if ($status == 'pending') {
                                        $badgeClass = 'bg-warning text-dark';
                                    } elseif ($status == 'in progress') {
                                        $badgeClass = 'bg-primary';
                                    } else {
                                        $badgeClass = 'bg-success';
                                    }
                                    
                                    $displayStatus = ucwords(str_replace('_', ' ', $status));
                                    ?>
                                    <span class="badge <?php echo $badgeClass; ?>">
                                        <?php echo $displayStatus; ?>
                                    </span>
                                </td>
                                <td>
                                    <a href="edit.php?id=<?php echo $task['id']; ?>" class="btn btn-sm btn-primary">
                                        <i class="bi bi-pencil"></i> Edit
                                    </a>
                                    <form method="POST" style="display:inline;">
                                        <input type="hidden" name="delete_id" value="<?php echo $task['id']; ?>">
                                        <button type="submit" class="btn btn-sm btn-danger" onclick="return confirm('Are you sure?');">
                                            <i class="bi bi-trash"></i> Delete
                                        </button>
                                    </form>
                                </td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
                <?php endif; ?>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>

<?php
$conn->close();
?>
