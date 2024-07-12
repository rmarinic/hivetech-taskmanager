package com.hivetech.taskmanager.service;

import com.hivetech.taskmanager.model.Task;
import com.hivetech.taskmanager.model.TaskStatus;
import com.hivetech.taskmanager.model.User;
import com.hivetech.taskmanager.repository.TaskRepository;
import com.hivetech.taskmanager.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    public void createTask(Task task, String username) {
        User user = userRepository.findByUsername(username);
        task.setUser(user);
        taskRepository.save(task);
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public List<Task> findByUser(String username) {
        User user = userRepository.findByUsername(username);
        return taskRepository.findByUser(user);
    }

    public Task updateTask(Long id, Task taskDetails) {
        Task task = getTaskById(id).orElseThrow(() -> new EntityNotFoundException("Task not found with id " + id));
        task.setTitle(taskDetails.getTitle());
        task.setDescription(taskDetails.getDescription());
        task.setStatus(taskDetails.getStatus());
        task.setDueDate(taskDetails.getDueDate());
        return taskRepository.save(task);
    }

    public void delete(Long id) {
        Task task = getTaskById(id).orElseThrow(() -> new EntityNotFoundException("Task not found with id " + id));
        taskRepository.delete(task);
    }

    public Task updateTaskStatus(Long id, TaskStatus status) {
        Task task = getTaskById(id).orElseThrow(() -> new EntityNotFoundException("Task not found with id " + id));
        task.setStatus(status);
        return taskRepository.save(task);
    }

    public Task save(Task task) {
        return taskRepository.save(task);
    }
}
