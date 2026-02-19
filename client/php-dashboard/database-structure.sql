-- Create the database
CREATE DATABASE IF NOT EXISTS taskflow_db;
USE taskflow_db;

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    due_date DATE,
    status ENUM('pending', 'in progress', 'completed') DEFAULT 'pending',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO tasks (title, category, due_date, status, description) VALUES
('Design Dashboard UI', 'Development', '2026-02-15', 'pending', 'Create a modern and responsive dashboard UI'),
('Connect Database', 'Backend', '2026-02-18', 'in progress', 'Set up database connection and queries'),
('Testing & Debugging', 'QA', '2026-02-20', 'completed', 'Test all features and fix bugs'),
('API Integration', 'Backend', '2026-02-22', 'pending', 'Integrate RESTful API endpoints'),
('User Authentication', 'Security', '2026-02-25', 'in progress', 'Implement login and registration');
